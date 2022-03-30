// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { decode } from 'clarity-decode';
import { Data, waitSync } from '../../db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await waitSync;
    console.log(req.body.length)
    const decoded = decode(req.body);
    const data = await Data.create({ data: JSON.stringify(decoded) });

    res.status(200).json(data)
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }

}
