const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../../config/database");

const otpStore = new Map();

function buildPhoneCandidates(phone) {
  const raw = String(phone || "").trim();
  const digits = raw.replace(/\D/g, "");
  const set = new Set();

  if (raw) set.add(raw);
  if (digits) {
    set.add(digits);
    if (digits.length === 10) {
      set.add(`+91${digits}`);
      set.add(`91${digits}`);
      set.add(`0${digits}`);
    }
    if (digits.length === 12 && digits.startsWith("91")) {
      set.add(digits.slice(2));
      set.add(`+${digits}`);
    }
  }

  return Array.from(set);
}

async function findMatchedName(connection, phone) {
  const phoneCandidates = buildPhoneCandidates(phone);
  if (phoneCandidates.length === 0) return null;

  // 1) Prefer previous citizen reports
  const placeholders = phoneCandidates.map(() => "?").join(", ");
  const [reportRows] = await connection.execute(
    `SELECT full_name
     FROM report_issues
     WHERE phone IN (${placeholders})
       AND full_name IS NOT NULL
       AND TRIM(full_name) <> ''
     ORDER BY created_at DESC, id DESC
     LIMIT 1`,
    phoneCandidates
  );

  if (reportRows.length > 0) {
    return reportRows[0].full_name;
  }

  // 2) Fallback: users table (if it exists in this database)
  const [usersTableRows] = await connection.execute(
    `SELECT COUNT(*) AS table_count
     FROM information_schema.tables
     WHERE table_schema = DATABASE() AND table_name = 'users'`
  );

  if (!usersTableRows[0] || Number(usersTableRows[0].table_count) === 0) {
    return null;
  }

  const [columnRows] = await connection.execute(
    `SELECT column_name
     FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = 'users'`
  );

  const columns = new Set(columnRows.map((row) => row.column_name));
  const phoneColumnCandidates = ["phone", "mobile", "mobile_number", "mobile_no", "phone_number"];
  const nameColumnCandidates = ["full_name", "name", "username", "user_name"];

  const phoneColumn = phoneColumnCandidates.find((col) => columns.has(col));
  const nameColumn = nameColumnCandidates.find((col) => columns.has(col));

  if (!phoneColumn || !nameColumn) {
    return null;
  }

  const hasIdColumn = columns.has("id");
  const [userRows] = await connection.execute(
    `SELECT \`${nameColumn}\` AS full_name
     FROM users
     WHERE \`${phoneColumn}\` IN (${placeholders})
       AND \`${nameColumn}\` IS NOT NULL
       AND TRIM(\`${nameColumn}\`) <> ''
     ${hasIdColumn ? "ORDER BY id DESC" : ""}
     LIMIT 1`,
    phoneCandidates
  );

  return userRows.length > 0 ? userRows[0].full_name : null;
}

router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, message: "Invalid phone" });
    }

    // Generate OTP (6 digits)
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    
    // Store OTP
    otpStore.set(phone, otp);

    // Print OTP in terminal only when no SMS provider configured (development)
    if (!process.env.FAST2SMS_KEY) {
      console.log(`✅ Dev OTP for ${phone}: ${otp}`);
    }

    // Send real SMS (if Fast2SMS key exists)
    if (process.env.FAST2SMS_KEY) {
      await axios.post("https://www.fast2sms.in/sms", {
        authorization: process.env.FAST2SMS_KEY,
        sender_id: "CIVICX",
        message: `Your OTP is ${otp}. Valid for 10 minutes.`,
        numbers: phone
      });
      // Optionally log that an SMS request was sent (without OTP)
      console.log(`📱 SMS request sent to ${phone}`);
    }

    res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore.get(phone) !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  otpStore.delete(phone);

  let connection;
  try {
    connection = await pool.getConnection();
    const matchedName = await findMatchedName(connection, phone);

    return res.json({
      success: true,
      message: "OTP verified",
      matchedName,
    });
  } catch (error) {
    console.error("Error while verifying OTP and looking up user:", error.message);
    return res.status(500).json({
      success: false,
      message: "OTP verified but failed to fetch user details",
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
