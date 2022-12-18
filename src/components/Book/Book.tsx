import React, { useState, memo } from 'react'
import { Wrapper } from './styles';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { useRouter } from 'next/router'
import { BookType } from "types"

function Book({ title, image, author, discount, publisher, pubdate, isbn, description }: BookType) {
  const [hovered, setHovered] = useState(false);

  const router = useRouter();

  return (
    <Wrapper onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} hovered={hovered}>
      <div className="bookCover">
        <img className='coverImg' src={image} alt={image} loading="lazy" />
      </div>
      <div className="bookInfo">
        <b>{title}</b>
        <label>저자: {author}</label>
      </div>

      <button className='toDetailBtn' onClick={() => {
        router.push({
          pathname: `/BookDetail/${isbn}`,
          query: { isbn },
        })
      }}>
        <HiOutlineDocumentSearch className='toDetailIcon' />
        <label>상세보기</label>
      </button>
    </Wrapper>
  )
}

export default memo(Book);