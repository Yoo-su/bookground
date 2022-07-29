import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@utils/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { isbn, curUser, rate, comment ,date } =  req.body;

    try{
        const { db } = await connectToDatabase();
        const bookRep = db.collection("bookRep");

        //유저의 기존 책 평가 정보가 있는지 확인
        const rep = await bookRep.find({isbn:isbn,email:curUser.email}).toArray();
        if (rep.length===0){
            const result = await bookRep.insertOne({
                email:curUser.email,
                isbn:isbn,
                name:curUser.name,
                profileImg:curUser.image,
                thumb:null,
                rate:rate,
                comment:comment,
                date:date
            })
            console.log('bookRep collection에 새로운 데이터가 추가되었습니다. id: ',result.insertedId);
        }
        else {
            if (rep[0].rate!==-1){
                res.status(200).json({
                    success:false,
                    message:'이미 등록된 의견이 존재합니다'
                })
                return;
            }
            else {
                const result = await bookRep.findOneAndUpdate({
                    isbn:isbn, email:curUser.email
                },{
                    $set:{ rate:rate, comment:comment, date:date }
                })
                console.log('bookRep collection 업데이트 성공 여부: ',result.ok);
            }
        }
        res.status(200).json({
            success:true,
            message:'의견 등록이 완료되었습니다'
        })
    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:'의견 등록중 오류가 발생했습니다'
        })
    }
}
