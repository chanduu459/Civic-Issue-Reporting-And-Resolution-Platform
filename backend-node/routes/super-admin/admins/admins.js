const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../../../config/database");
const { validateUniqueIdentity } = require("../../../utils/identityUniqueness");

const router = express.Router();

// POST /api/admin/middle-admins -> add new admin
router.post("/", async (req, res) => {
  const { username, email, password, mobile } = req.body;

  const normalizedUsername = String(username || "").trim();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPassword = String(password || "").trim();
  const normalizedMobile = String(mobile || "").trim();

  if (!normalizedUsername || !normalizedEmail || !normalizedPassword || !normalizedMobile) {
    return res.status(400).json({ success: false, message: "Username, email, mobile and password are required" });
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

    // Insert new admin
    const [result] = await connection.execute(
      "INSERT INTO admins (username, email, phone, password) VALUES (?, ?, ?, ?)",
      [normalizedUsername, normalizedEmail, normalizedMobile, hashed]
    );

    return res.json({
      success: true,
      message: "Admin created",
      id: result.insertId,
    });
  } catch (e) {
    console.error("DB error:", e);
    return res.status(400).json({
      success: false,
      message:
        e.code === "ER_DUP_ENTRY"
          ? "Email or mobile already registered. Use another value."
          : e.message || "Database error",
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
