// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { decode } from 'clarity-decode';
import { db } from '../../db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  try {
    const decoded = decode(req.body);
    const data = await db.none('INSERT INTO clarities(id, data, "createdAt", "updatedAt") VALUES(gen_random_uuid(), ${data}, ${createdAt}, ${updatedAt})', {
      data: JSON.stringify(decoded),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    res.status(200).json(data)
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }

}
