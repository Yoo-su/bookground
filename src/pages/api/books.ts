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
    const header={
        'X-Naver-Client-Id': process.env.ID_KEY || '',
        'X-Naver-Client-Secret': process.env.SECRET_KEY || '',
        'Access-Control-Allow-Origin': '*'
    }
    try {
        const books1 = axios.get(baseUrl, {
            params: {
                query: query,
                display:100
            },
            headers: header
        })

        const books2 = axios.get(baseUrl,{
            params:{
                query: query,
                display: 100,
                start:100
            },
            headers: header
        })
        
        let items:any[]=[];
        axios.all([books1, books2]).then(axios.spread((...result)=>{
            items=items.concat(result[0].data.items).concat(result[1].data.items)
            
            res.status(200).json({
                success: true,
                items: items
            })
        }))

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            items: []
        })
    }
}
