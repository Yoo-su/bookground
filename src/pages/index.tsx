import { useState, useEffect, useCallback } from 'react';
import { Oval } from 'react-loader-spinner'
import SearchInput from '@components/SearchInput';
import Book from '@components/Book';
import Pagination from '@components/common/Pagination';
import styled from 'styled-components';
import bookType from '../types/booktype';

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:10rem;
`;

const BookContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    flex-wrap:wrap;
    margin-top:5rem;

    .resultCount{
      box-shadow:0 1px 1px rgba(0,0,0,0.2);
      
      b{
        margin-left:150px;
        font-family: 'IBM Plex Sans KR', sans-serif;

        @media all and (min-width:280px) and (max-width:540px){
          margin-left:1.5rem;
        }
      }
    }
    
    .books{
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
      padding:0 50px;

      @media all and (min-width:280px) and (max-width:540px){
        padding:0.5rem 0.1rem;
      }
    }
`;

export default function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //페이징 변수
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const setBooksFunc = useCallback((books: any) => {
    setBooks(books);
  }, []);

  return (
    <Wrapper>
      <SearchInput setBooks={setBooksFunc} setLoading={setIsLoading} />

      <BookContainer>
        {books.length > 0 && (
          <div className='resultCount'>
            <b>{books.length}개의 검색 결과</b>
          </div>
        )}
        {isLoading === true && <Oval color="#00BFFF" secondaryColor='grey' height={120} width={120} strokeWidth={4} />}

        <div className="books">
          {books.slice(offset, offset + limit).map((book: bookType) => (
            <Book {...book} key={book.isbn} />
          ))}
        </div>
        {books.length>0 && <Pagination 
                total={books.length}
                limit={limit}
                page={page}
                setPage={setPage}
          />}
      </BookContainer>

    </Wrapper>
  )
}
