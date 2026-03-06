import { PrismaClient } from '@prisma/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, businessName, details, selectedServices, subtotal, discount, total, folio } = req.body;

  try {
    // 1. Crear o actualizar el cliente
    const client = await prisma.client.upsert({
      where: { email },
      update: { fullName, businessName, phone: '' }, // Actualizamos info si ya existe
      create: {
        fullName,
        email,
        businessName,
      },
    });

    // 2. Guardar la cotización vinculada al cliente
    const quote = await prisma.quote.create({
      data: {
        clientId: client.id,
        selectedServices,
        subtotal,
        discount,
        total,
        status: 'pending',
        // Podemos guardar el folio en las notas o crear un campo si fuera necesario
      },
    });

    return res.status(200).json({ success: true, quoteId: quote.id, client: client.fullName });
  } catch (error) {
    console.error('Error saving quote:', error);
    return res.status(500).json({ error: 'Error saving to database' });
  } finally {
    await prisma.$disconnect();
  }
}
