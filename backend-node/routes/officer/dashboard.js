const express = require("express");
const router = express.Router();
const pool = require("../../config/database");

// GET /api/officer/dashboard/summary
router.get("/summary", async (req, res) => {
  const { officer_id } = req.query;
  let connection;

  if (!officer_id) {
    return res.status(400).json({ message: "officer_id is required" });
  }

  try {
    connection = await pool.getConnection();

    const [allocatedIssuesRows] = await connection.execute(
      "SELECT COUNT(*) AS allocatedIssues FROM report_issues WHERE assigned_officer_id = ?",
      [officer_id]
    );

    const [newIssuesRows] = await connection.execute(
      `SELECT COUNT(*) AS newIssues
       FROM report_issues
       WHERE assigned_officer_id = ?
         AND UPPER(REPLACE(COALESCE(status, ''), ' ', '_')) = 'NEW'`,
      [officer_id]
    );

    const [inProgressIssuesRows] = await connection.execute(
      `SELECT COUNT(*) AS inProgressIssues
       FROM report_issues
       WHERE assigned_officer_id = ?
         AND UPPER(REPLACE(COALESCE(status, ''), ' ', '_')) = 'IN_PROGRESS'`,
      [officer_id]
    );

    const [solvedIssuesRows] = await connection.execute(
      `SELECT COUNT(*) AS solvedIssues
       FROM report_issues
       WHERE assigned_officer_id = ?
         AND UPPER(REPLACE(COALESCE(status, ''), ' ', '_')) = 'SOLVED'`,
      [officer_id]
    );

    const [recentIssuesRows] = await connection.execute(
      `SELECT id, issue_type, description, status, created_at
       FROM report_issues
       WHERE assigned_officer_id = ?
       ORDER BY created_at DESC
       LIMIT 5`,
      [officer_id]
    );

    return res.json({
      stats: {
        allocatedIssues: allocatedIssuesRows[0].allocatedIssues,
        newIssues: newIssuesRows[0].newIssues,
        inProgressIssues: inProgressIssuesRows[0].inProgressIssues,
        solvedIssues: solvedIssuesRows[0].solvedIssues,
      },
      recentIssues: recentIssuesRows,
    });
  } catch (error) {
    console.error("Officer Dashboard Summary Error:", error);
    return res.status(500).json({ message: "Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;
