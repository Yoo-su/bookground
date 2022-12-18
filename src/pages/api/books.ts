import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { BookType } from "types";

interface ReturnType {
    books: BookType[],
    total: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReturnType>
) {

    const { query, start } = req.query;
    const baseUrl = 'https://openapi.naver.com/v1/search/book.json';
    const header = {
        'X-Naver-Client-Id': process.env.ID_KEY || '',
        'X-Naver-Client-Secret': process.env.SECRET_KEY || '',
        'Access-Control-Allow-Origin': '*'
    }
    try {
        const getBooks = axios.get(baseUrl, {
            params: {
                query: query,
                display: 100,
                start: start,
            },
            headers: header
        })

        axios.all([getBooks]).then(axios.spread((...result) => {
            res.json({
                books: result[0].data.items,
                total: result[0].data.total,
            })
        }))

    } catch (err) {
        throw err;
    }
}
