import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@utils/mongodb';

type Data = {
    success: boolean,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { isbn,email } = req.body;
    
    try {
        const { db } = await connectToDatabase();

        const bookRep = db.collection("bookRep");
        const result = await bookRep.findOneAndUpdate({
            isbn:isbn, email:email
        },{
            $set:{ rate:-1, comment:'' }
        })
        console.log('bookRep collection 업데이트 성공 여부: ',result.ok);

        res.status(200).json({
            success:true,
        })

    } catch (err) {
        console.log(err)
        res.status(200).json({
            success:false,
        })
    }
}
