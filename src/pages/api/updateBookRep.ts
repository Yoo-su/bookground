import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'utils/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { isbn, curUser, thumb } = req.body;

    try {
        const { db } = await connectToDatabase();
        const bookRep = db.collection("bookRep");

        //유저의 기존 책 평가 정보가 있는지 확인
        const rep = await bookRep.find({ isbn: isbn, email: curUser.email }).toArray();
        if (rep.length === 0) {
            const result = await bookRep.insertOne({
                email: curUser.email,
                isbn: isbn,
                name: curUser.name,
                profileImg: curUser.image,
                thumb: thumb,
                rate: -1,
            })
            console.log('bookRep collection에 새로운 데이터가 추가되었습니다. id: ', result.insertedId);
        }
        else {
            const result = await bookRep.findOneAndUpdate({
                isbn: isbn, email: curUser.email
            }, {
                $set: { thumb: thumb }
            })
        }

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
        })
    }
}
