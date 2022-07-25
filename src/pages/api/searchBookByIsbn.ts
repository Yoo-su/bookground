import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
    success: boolean,
    item: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { isbn } = req.query;
    const baseUrl = `https://openapi.naver.com/v1/search/book_adv.xml?d_isbn=${isbn}`;
    try {
        const items = await axios.get(baseUrl, {
            
            headers: {
                'X-Naver-Client-Id': process.env.ID_KEY || '',
                'X-Naver-Client-Secret': process.env.SECRET_KEY || '',
                'Access-Control-Allow-Origin': '*'
            }
        })

        res.status(200).json({
            success:true,
            item:items.data.toString()
        })
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            item: []
        })
    }
}
