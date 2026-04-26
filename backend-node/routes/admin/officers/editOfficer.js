const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../../../config/database");

const router = express.Router();

// Middle Admin: EDIT OFFICER
// PUT /api/middle-admin/officers/edit/:id
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;

  const {
    name,
    designation,
    department,
    zone,
    mobile,
    role,
    password,
  } = req.body;

  // ✅ only editable required fields
  if (!name || !mobile) {
    return res.json({
      success: false,
      message: "Name and Mobile are required.",
    });
  }

  // ✅ protect role
  const safeRole =
    role && typeof role === "string" && role.includes("@")
      ? ""
      : role || "";

  try {
    const connection = await pool.getConnection();

    const [existingRows] = await connection.execute(
      "SELECT department FROM officers WHERE id = ? LIMIT 1",
      [id]
    );

    if (existingRows.length === 0) {
      connection.release();
      return res.json({
        success: false,
        message: "Officer not found",
      });
    }

    const existingDepartment = existingRows[0].department || "";
    const nextDepartment = String(department || "").trim() || existingDepartment;

    let query =
      "UPDATE officers SET name=?, designation=?, department=?, zone=?, mobile=?, role=? WHERE id=?";

    let params = [
      name.trim(),
      designation || "",
      nextDepartment,
      zone || "",
      mobile.trim(),
      safeRole,
      id,
    ];

    if (password && password.trim().length >= 6) {
      const hashed = await bcrypt.hash(password.trim(), 10);

      query =
        "UPDATE officers SET name=?, designation=?, department=?, zone=?, mobile=?, role=?, password=? WHERE id=?";

      params = [
        name.trim(),
        designation || "",
        nextDepartment,
        zone || "",
        mobile.trim(),
        safeRole,
        hashed,
        id,
      ];
    }

    const [result] = await connection.execute(query, params);

    connection.release();

    if (result.affectedRows === 0) {
      return res.json({
        success: false,
        message: "Officer not found",
      });
    }

    return res.json({
      success: true,
      message: "Officer updated successfully",
    });

  } catch (e) {
    console.error("Middle-admin edit officer error:", e);
    return res.json({
      success: false,
      message: "Database error",
    });
  }
});

module.exports = router;