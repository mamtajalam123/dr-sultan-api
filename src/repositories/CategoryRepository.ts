// ==========================================
// CHECK CATEGORY EXISTS
// ==========================================
async findCategoryByName(
  name: string
) {
  const sql = `
    SELECT *
    FROM categories
    WHERE
      LOWER(name)=LOWER(?)
      AND type='service'
    LIMIT 1
  `;

  const [rows]: any =
    await pool.execute(sql, [name]);

  return rows[0] || null;
}