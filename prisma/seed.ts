import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'contacto@studiocreativodigital.com';
  const password = 'AdminStudio2026!'; // Contraseña temporal
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: 'Admin Studio',
    },
  });

  console.log('--- Database Seeded ---');
  console.log('Admin User Created:', admin.email);
  console.log('Temporary Password:', password);
  console.log('-----------------------');
  console.log('IMPORTANT: Change your password after the first login.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
