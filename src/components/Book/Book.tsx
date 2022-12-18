import { useState, memo } from 'react'
import { Wrapper } from './styles';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import Link from "next/link";
import { BookType } from "types"

function Book({ title, image, author, discount, publisher, pubdate, isbn, description }: BookType) {
  const [hovered, setHovered] = useState(false);

  return (
    <Wrapper onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} hovered={hovered}>
      <div className="bookCover">
        <img className='coverImg' src={image} alt={image} loading="lazy" />
      </div>
      <div className="bookInfo">
        <b>{title}</b>
        <label>저자: {author}</label>
      </div>

      <Link href={`bookdetail/${isbn}`} as={`bookdetail/${isbn}`}>
        <button className='toDetailBtn'>
          <HiOutlineDocumentSearch className='toDetailIcon' />
          <label>상세보기</label>
        </button>
      </Link>
    </Wrapper>
  )
}

export default memo(Book);