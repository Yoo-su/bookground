import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'utils/mongodb';
import { CommentType } from 'types';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { isbn } = req.query;

    try {
        const { db } = await connectToDatabase();

        const bookRep = db.collection("bookRep");
        let comments = await bookRep.find({ isbn: isbn, rate: { $ne: -1 } }).toArray();
        res.json({
            comments: comments
        })

    } catch (err) {
        throw err;
    }
}
