import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
    success: boolean,
    items: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { query } = req.query;
    const baseUrl = 'https://openapi.naver.com/v1/search/book.json';
    try {
        const items = await axios.get(baseUrl, {
            params: {
                query: query,
                display:100
            },
            headers: {
                'X-Naver-Client-Id': process.env.ID_KEY || '',
                'X-Naver-Client-Secret': process.env.SECRET_KEY || '',
                'Access-Control-Allow-Origin': '*'
            }
        })
        
        return res.status(200).json({
            success: true,
            items: items.data.items
        })

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            items: []
        })
    }
}
