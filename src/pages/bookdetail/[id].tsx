import React, {useEffect, useState} from 'react'
import axios from 'axios';
import xml2js from "xml2js";
import { Oval } from  'react-loader-spinner'
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Fab from '@mui/material/Fab';
import {BsHandThumbsUp, BsHandThumbsDown, BsArrowDownCircle} from 'react-icons/bs';
import { Wrapper, BookWrapper } from './styles';
import bookType from "../../types/booktype";

export default function BookDetail() {
  //const router=useRouter();
  //const {isbn}=router.query;

  //책 정보 변수
  const [title, setTitle]=useState('');
  const [desc,setDesc]=useState('');
  const [author, setAuthor]=useState('');
  const [publisher, setPublisher]=useState('');
  const [imgUrl,setImgUrl]=useState('');

  const [upCount,setUpCount]=useState(0);
  const [downCount, setDownCount] = useState(0);

  //로딩 변수
  const [bookLoading, setBookLoading] = useState(true);

  const [ratingValue, setRatingValue] = useState<number | null>(0);

  useEffect(()=>{
    const splited=window.location.href.split('/')
    const isbn=splited[splited.length-1].split('=')[1].replace('+',' ');
    axios.get('/api/searchBookByIsbn',{
      params:{
        isbn:isbn
      }
    }).then(res=>{
      const parser = new xml2js.Parser();
      parser.parseString(res.data.item, function (err, result) {

      const {item}=result.rss.channel[0];
      setTitle(item[0].title[0]);
      setDesc(item[0].description[0]);
      setAuthor(item[0].author[0]);
      setImgUrl(item[0].image[0].substr(0,item[0].image[0].indexOf("?type")))
      setBookLoading(false);
    });
    })
  },[]);

  return (
    <Wrapper>
      <BookWrapper>
        {bookLoading ? 
          <Oval color="#00BFFF" secondaryColor='grey' height={120} width={120} strokeWidth={4} />:
          <>
            <div className="imgBox">
              <div className="backPattern1"></div>
              <div className="backPattern2"></div>
              <img src={imgUrl} alt={imgUrl} loading="lazy" />
            </div>

            <div className="infoBox">
              <div className="reputation">
                <div className="chips">
                  <Chip className="thumbUp"  icon={<BsHandThumbsUp />} label={upCount} color="primary" variant="outlined" clickable  />
                  <Chip className="thumbDown" icon={<BsHandThumbsDown />} label={downCount} color="primary" variant="outlined" clickable  />
                </div>
                <div className="star">
                  <Rating
                    name="simple-controlled"
                    value={ratingValue}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}
                  />
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
      
    </Wrapper>
  )
}

