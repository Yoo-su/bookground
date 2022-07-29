import { useState, useEffect } from 'react';
import { BookWrapper } from './styles';
import { getInfoByIsbn, updateBookRep } from '@api/book';
import { Oval } from 'react-loader-spinner'
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Fab from '@mui/material/Fab';
import { BsHandThumbsUp, BsHandThumbsDown, BsArrowDownCircle } from 'react-icons/bs';
import xml2js from "xml2js";

export default function BookInfo({isbn, data, status}:any) {

    //책 정보 변수
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [bookIsbn, setBookIsbn]=useState('');

    const [upCount, setUpCount] = useState(0);
    const [downCount, setDownCount] = useState(0);
    const [ratingValue, setRatingValue] = useState<number | null>(0);

    //로딩 변수
    const [bookLoading, setBookLoading] = useState(true);

    //thumb 버튼 활성,비활성 체크 변수
    const [upBtnOn, setUpBtnOn] = useState(false);
    const [downBtnOn, setDownBtnOn] = useState(false);


    //엄지척 버튼 클릭처리
    const handleUpClick=()=>{
        if (status==='unauthenticated') return;

        //엄지다운 버튼이 눌려져 있던 상태면
        if (downBtnOn) {
            setDownCount(downCount-1);
            setDownBtnOn(false);
            setUpCount(upCount+1);
            setUpBtnOn(true);
            updateBookRep(bookIsbn, data.user,true).then(res=>console.log(res));
        }
        else if (upBtnOn) {
            setUpCount(upCount-1)
            setUpBtnOn(false)
            updateBookRep(bookIsbn, data.user,null).then(res=>console.log(res));
        }
        else {
            setUpCount(upCount+1);
            setUpBtnOn(true);
            updateBookRep(bookIsbn, data.user,true).then(res=>console.log(res));
        }
    }

    //엄지다운 버튼 클릭 처리
    const handleDownClick=()=>{
        if (status==='unauthenticated') return;

        //엄지척 버튼이 눌려져 있던 상태면
        if (upBtnOn) {
            setUpCount(upCount-1);
            setUpBtnOn(false);
            setDownCount(downCount+1);
            setDownBtnOn(true);
            updateBookRep(bookIsbn, data.user,false).then(res=>console.log(res));
        }
        else if (downBtnOn) {
            setDownCount(downCount-1)
            setDownBtnOn(false)
            updateBookRep(bookIsbn, data.user,null).then(res=>console.log(res));
        }
        else {
            setDownCount(downCount+1);
            setDownBtnOn(true);
            updateBookRep(bookIsbn, data.user,false).then(res=>console.log(res));
        }
    }


    useEffect(() => {
        //책 상세 정보 api 호출
        isbn!=='' && getInfoByIsbn(isbn, data?.user?.email).then(res => {
            if (res.data.success) {
                const parser = new xml2js.Parser();
                parser.parseString(res.data.item, function (err, result) {
                    const { item } = result.rss.channel[0];
                    setTitle(item[0].title[0]);
                    setDesc(item[0].description[0]);
                    setAuthor(item[0].author[0]);
                    setBookIsbn(item[0].isbn[0]);
                    setImgUrl(item[0].image[0])
                    setUpCount(res.data.upCnt);
                    setDownCount(res.data.downCnt);
                    setRatingValue(res.data.avgRate);
                    if (res.data.userThumb === true) setUpBtnOn(true);
                    else if (res.data.userThumb === false) setDownBtnOn(true);
                    setBookLoading(false);
                });
            }
        })
    }, [isbn]);

    return (
        <BookWrapper>
            {bookLoading ?
                <Oval color="#00BFFF" secondaryColor='grey' height={120} width={120} strokeWidth={4} /> :
                <>
                    <div className="imgBox">
                        <div className="backPattern1"></div>
                        <div className="backPattern2"></div>
                        <img src={imgUrl} alt={imgUrl} loading="lazy" />
                    </div>

                    <div className="infoBox">
                        <div className="reputation">
                            <div className="chips">
                                <Chip className="thumbUp" icon={<BsHandThumbsUp />} label={upCount}
                                    color="primary" variant={upBtnOn === true ? 'filled' : 'outlined'} clickable onClick={handleUpClick} />
                                <Chip className="thumbDown" icon={<BsHandThumbsDown />} label={downCount}
                                    color="primary" variant={downBtnOn === true ? 'filled' : 'outlined'} clickable onClick={handleDownClick} />
                            </div>
                            <div className="star">
                                <Rating
                                    name="simple-controlled"
                                    value={ratingValue}
                                    readOnly
                                />
                                <i>{ratingValue}</i>
                            </div>
                        </div>
                        <b className="title">{title}</b>
                        <b className="author">{author}</b>
                        <p className="desc">- {desc}</p>
                    </div>
                    <Fab className="goBoardBtn" variant="extended" color="info">
                        <BsArrowDownCircle />
                        게시판으로 가기
                    </Fab>
                </>
            }

        </BookWrapper>
    );
}