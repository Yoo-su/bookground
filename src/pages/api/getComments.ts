import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@utils/mongodb';

type Data = {
    success: boolean,
    comments:Array<any>,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { isbn } = req.query;
    
    try {
        const { db } = await connectToDatabase();

        const bookRep = db.collection("bookRep");
        let comments = await bookRep.find({isbn:isbn,rate:{$ne:-1}}).toArray();

        res.status(200).json({
            success:true,
            comments:comments
        })

    } catch (err) {
        console.log(err)
        res.status(200).json({
            success:false,
            comments:[]
        })
    }
}
