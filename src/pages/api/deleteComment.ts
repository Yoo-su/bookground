import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'utils/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { _id } = req.body;

    try {
        const { db } = await connectToDatabase();

        const bookRep = db.collection("bookRep");
        const result = await bookRep.findOneAndUpdate({
            _id: new ObjectId(_id)
        }, {
            $set: { rate: -1, comment: '' }
        })

        res.json({
            success: true,
        })

    } catch (err) {
        throw err;
    }
}
