import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'utils/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { isbn, email, name, image, rate, comment, date } = req.body;

    try {
        const { db } = await connectToDatabase();
        const bookRep = db.collection("bookRep");

        //유저의 기존 책 평가 정보가 있는지 확인
        const rep = await bookRep.find({ isbn: isbn, email: email }).toArray();

        if (rep.length === 0) {
            const result = await bookRep.insertOne({
                email: email,
                isbn: isbn,
                name: name,
                profileImg: image,
                thumb: null,
                rate: rate,
                comment: comment,
                date: date
            })
        }
        else {
            if (rep[0].rate !== -1) {
                res.json({
                    success: false,
                    message: '이미 등록된 의견이 존재합니다'
                })
                return;
            }
            else {
                const result = await bookRep.findOneAndUpdate({
                    isbn: isbn, email: email
                }, {
                    $set: { rate: rate, comment: comment, date: date }
                })
            }
        }

        const new_comment = await bookRep.findOne({ isbn: isbn, email: email });
        const newRate = await bookRep
            .aggregate([
                {
                    $match: {
                        "isbn": isbn,
                        "rate": {
                            $ne: -1
                        }
                    }
                },
                {
                    '$group': {
                        '_id': null,
                        'avgRate': {
                            '$avg': '$rate'
                        }
                    }
                }
            ]).toArray();
        res.json({
            newRate: newRate[0].avgRate,
            item: new_comment,
            success: true,
        })
    } catch (err) {
        throw err;
    }
}
