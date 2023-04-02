// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from "axios";

type Data = {

}   

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
    const { data } = await axios.get(`${process.env.REACT_APP_WOO_URL}/wp-json/wc/v3/products`, {
            auth: {
                username: process.env.REACT_APP_WOO_CK!,
                password: process.env.REACT_APP_WOO_CS!,
            },
        });
  res.status(200).json(data);
}



