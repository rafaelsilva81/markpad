// Save new content to db
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const lockPage = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get slug from url
  const slugSchema = z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
  });
  const slug = slugSchema.parse(req.query);

  // Lock page
  const prisma = new PrismaClient();
  try {
    const page = await prisma.markpad_Page.update({
      where: { slug: slug.slug },
      data: {
        locked: true,
      },
    });

    return res.status(200).json(page);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default lockPage;
