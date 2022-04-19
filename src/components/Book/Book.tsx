import React,{useState} from 'react'
import {Wrapper} from './styles';

interface propsType{
    title:string,
    link:string,
    image:string,
    author:string,
    price:string,
    discount:string,
    publisher:string,
    pubdate:string,
    isbn:string,
    description:string
}

export default function Book({title,link,image,author,price,discount,publisher,pubdate,isbn,description}:propsType) {
  const [hovered, setHovered]=useState(false);

  const refinedImageUrl=image.substr(0,image.indexOf("?type"));
  const refinedTitle= title.replace(/(<([^>]+)>)/gi, "");
  const refinedAuthor= author.replace(/(<([^>]+)>)/gi, "");
  return (
    <Wrapper onMouseEnter={()=>{setHovered(true)}} onMouseLeave={()=>{setHovered(false)}} hovered={hovered}>
      <div className="bookCover">
        <img className='coverImg' src={refinedImageUrl} />
      </div>
      
      <div className="bookInfo">
        <b>제목: {refinedTitle}</b>
        <label>저자: {refinedAuthor}</label>
      </div>
    </Wrapper>
  )
}
