import { PrismaClient } from '@prisma/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'studio-creativo-secret-key-change-me');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificación básica del token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    await jwtVerify(token, JWT_SECRET);
    
    // Obtener todas las cotizaciones con la info de sus clientes
    const quotes = await prisma.quote.findMany({
      include: {
        client: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json(quotes);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  } finally {
    await prisma.$disconnect();
  }
}
