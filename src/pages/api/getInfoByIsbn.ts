import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'utils/mongodb';
import axios from 'axios';
import { BookType } from 'types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { isbn, curUser } = req.query;
    const baseUrl = `https://openapi.naver.com/v1/search/book_adv.xml?d_isbn=${isbn}`;

    try {
        const { db } = await connectToDatabase();
        const items = await axios.get(baseUrl, {
            headers: {
                'X-Naver-Client-Id': process.env.ID_KEY || '',
                'X-Naver-Client-Secret': process.env.SECRET_KEY || '',
                'Access-Control-Allow-Origin': '*'
            }
        })

        const bookRep = db.collection("bookRep");
        const docCnt = await bookRep.countDocuments();

        // '좋아요' 클릭된 수 조회
        let thumbUps = await bookRep.find({ isbn: isbn, thumb: true }).toArray();
        const thumbUpCnt = thumbUps.length;

        // '별로에요' 클릭된 수 조회
        let thumbDowns = await bookRep.find({ isbn: isbn, thumb: false }).toArray();
        const thumbDownCnt = thumbDowns.length;

        // 평균 별점 조회
        let agg: any = [];
        if (docCnt > 0) {
            agg = await bookRep
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
        }

        //유저가 좋아요 또는 별로에요를 눌렀는지 확인
        let userThumb = null;

        if (curUser) {
            const isEstimated = await bookRep.find({ isbn: isbn, email: curUser }).toArray();
            if (isEstimated.length > 0) {
                userThumb = isEstimated[0].thumb;
            }
        }

        res.status(200).json({
            item: items.data.toString(),
            upCnt: thumbUpCnt,
            downCnt: thumbDownCnt,
            avgRate: agg.length > 0 ? agg[0].avgRate : 0.0,
            userThumb: userThumb,
        })
    } catch (err) {
        throw err;
    }
}
