import bcrypt from "bcryptjs";

async function hash() {
  const password = "admin123";

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);
}

hash();