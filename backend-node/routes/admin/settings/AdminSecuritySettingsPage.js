const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const pool = require("../../../config/database");

const router = express.Router();

/* =========================================================
  POST: Change Password (ADMINS ONLY)
   URL: /api/middle-admin/settings/change-password
   ========================================================= */
router.post("/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  // ✅ Same validation as admin
  if (!userId || !currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const connection = await pool.getConnection();

    // 1️⃣ Get existing password hash (ADMINS TABLE)
    const [rows] = await connection.execute(
      "SELECT password FROM admins WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      connection.release();
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const storedHashedPassword = rows[0].password;

    // 2️⃣ Verify current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      storedHashedPassword
    );

    if (!isMatch) {
      connection.release();
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // 3️⃣ Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Update password
    await connection.execute(
      "UPDATE admins SET password = ? WHERE id = ?",
      [newHashedPassword, userId]
    );

    connection.release();

    res.json({ success: true });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR (ADMIN):", err);
    res
      .status(500)
      .json({ success: false, message: "Error changing password" });
  }
});

module.exports = router;
