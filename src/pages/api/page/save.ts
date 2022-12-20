// Save new content to db
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import z from 'zod';

const saveData = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate content
  const bodySchema = z.object({
    content: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    locked: z.boolean(),
  });
  const body = bodySchema.parse(req.body);

  // Save content
  const prisma = new PrismaClient();
  try {
    const page = await prisma.markpad_Page.update({
      where: { slug: body.slug },
      data: {
        content: body.content,
        locked: body.locked,
      },
    });

    return res.status(200).json(page);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default saveData;
