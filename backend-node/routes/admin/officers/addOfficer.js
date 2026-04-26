const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../../../config/database");
const { validateUniqueIdentity } = require("../../../utils/identityUniqueness");

const router = express.Router();

// Middle Admin: ADD OFFICER
// POST /api/middle-admin/officers/add
router.post("/add", async (req, res) => {
  const {
    name,
    designation,
    department,
    zone,
    mobile,
    email,
    employeeId,
    role,
    password,
  } = req.body;

  const normalizedName = String(name || "").trim();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedMobile = String(mobile || "").replace(/\D/g, "");
  const normalizedPassword = String(password || "").trim();
  const normalizedEmployeeId = String(employeeId || "").trim();

  if (!normalizedName || !normalizedEmail || !normalizedMobile || !normalizedPassword) {
    return res.status(400).json({
      success: false,
      message: "Name, email, mobile and password are required",
    });
  }

  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(normalizedMobile)) {
    return res.status(400).json({
      success: false,
      message: "Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9",
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();

    const identityCheck = await validateUniqueIdentity(connection, {
      email: normalizedEmail,
      mobile: normalizedMobile,
    });
    if (!identityCheck.ok) {
      return res.status(400).json({ success: false, message: identityCheck.message });
    }

    const hashed = await bcrypt.hash(normalizedPassword, 10);

    const [result] = await connection.execute(
      `INSERT INTO officers
       (name, designation, department, zone, mobile, email, employee_id, role, password)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        normalizedName,
        designation || "",
        department || "",
        zone || "",
        normalizedMobile,
        normalizedEmail,
        normalizedEmployeeId,
        role || "",
        hashed,
      ]
    );

    return res.json({
      success: true,
      message: "Officer added",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Middle-admin add officer error:", err);

    const sqlError = String(err?.sqlMessage || "").toLowerCase();
    if (err.code === "ER_DUP_ENTRY") {
      if (sqlError.includes("employee_id")) {
        return res.status(400).json({
          success: false,
          message: "Employee ID already exists. Use another Employee ID.",
        });
      }

      if (sqlError.includes("email")) {
        return res.status(400).json({
          success: false,
          message: "Email already registered. Use another email.",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Email or mobile already registered. Use another value.",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Database error",
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
