async function emailExistsInAnyTable(connection, email) {
  if (!email) return false;

  const normalizedEmail = String(email).trim().toLowerCase();
  if (!normalizedEmail) return false;

  const [superAdminRows] = await connection.execute(
    "SELECT id FROM super_admin WHERE LOWER(email) = ? LIMIT 1",
    [normalizedEmail]
  );
  if (superAdminRows.length > 0) return true;

  const [adminRows] = await connection.execute(
    "SELECT id FROM admins WHERE LOWER(email) = ? LIMIT 1",
    [normalizedEmail]
  );
  if (adminRows.length > 0) return true;

  const [officerRows] = await connection.execute(
    "SELECT id FROM officers WHERE LOWER(email) = ? LIMIT 1",
    [normalizedEmail]
  );

  return officerRows.length > 0;
}

async function mobileExistsInAnyTable(connection, mobile) {
  if (!mobile) return false;

  const normalizedMobile = String(mobile).trim();
  if (!normalizedMobile) return false;

  const [superAdminRows] = await connection.execute(
    "SELECT id FROM super_admin WHERE phone = ? LIMIT 1",
    [normalizedMobile]
  );
  if (superAdminRows.length > 0) return true;

  const [adminRows] = await connection.execute(
    "SELECT id FROM admins WHERE phone = ? LIMIT 1",
    [normalizedMobile]
  );
  if (adminRows.length > 0) return true;

  const [officerRows] = await connection.execute(
    "SELECT id FROM officers WHERE mobile = ? LIMIT 1",
    [normalizedMobile]
  );

  return officerRows.length > 0;
}

async function validateUniqueIdentity(connection, { email, mobile }) {
  const hasEmail = await emailExistsInAnyTable(connection, email);
  if (hasEmail) {
    return {
      ok: false,
      field: "email",
      message: "Email already registered. Use another email.",
    };
  }

  const hasMobile = await mobileExistsInAnyTable(connection, mobile);
  if (hasMobile) {
    return {
      ok: false,
      field: "mobile",
      message: "Mobile number already registered. Use another mobile number.",
    };
  }

  return { ok: true };
}

module.exports = {
  emailExistsInAnyTable,
  mobileExistsInAnyTable,
  validateUniqueIdentity,
};
