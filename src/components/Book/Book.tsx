import React,{useState,memo} from 'react'
import {Wrapper} from './styles';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { useRouter } from 'next/router'

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

function Book({title,link,image,author,publisher,pubdate,isbn,description}:propsType) {
  const [hovered, setHovered]=useState(false);
  
  const router=useRouter();

  return (
    <Wrapper onMouseEnter={()=>{setHovered(true)}} onMouseLeave={()=>{setHovered(false)}} hovered={hovered}>
      <div className="bookCover">
        <img className='coverImg' src={image} alt={image} loading="lazy" />
      </div>
      <div className="bookInfo">
        <b>{title}</b>
        <label>저자: {author}</label>
      </div>

      <button className='toDetailBtn' onClick={()=>{
        router.push({
          pathname: `/BookDetail/${isbn}`,
          query: { isbn },
        })
      }}>
        <HiOutlineDocumentSearch className='toDetailIcon'/>
        <label>상세보기</label>
        </button>
    </Wrapper>
  )
}

export default memo(Book);