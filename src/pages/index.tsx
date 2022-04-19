import {useState, useEffect, useCallback} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Oval } from  'react-loader-spinner'
import SearchInput from '@components/SearchInput';
import Book from '@components/Book';
import styled from 'styled-components';
import bookType from '../types/booktype';


const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`;

const BookContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    flex-wrap:wrap;
    margin-top:5rem;

    .resultCount{
      box-shadow:0 1px 1px rgba(0,0,0,0.2);
      
      b{
        margin-left:5rem;
        font-family: 'IBM Plex Sans KR', sans-serif;
      }
    }
    
    .books{
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
    }
`;

export default function Home() {
  const [books, setBooks]=useState([]);
  const [isLoading, setIsLoading]=useState(false);

  const setBooksFunc=useCallback((books:any)=>{
    setBooks(books);
  },[]);
  
  return (
    <Wrapper>
      <SearchInput setBooks={setBooksFunc} setLoading={setIsLoading}/>
      
      <BookContainer>
      {books.length>0 && (
        <div className='resultCount'>
          <b>{books.length}개의 검색 결과</b>
        </div>
      )}
      {isLoading===true && <Oval color="#00BFFF" secondaryColor='grey' height={120} width={120} strokeWidth={4} />}

      <div className="books">
      {books.map((book:bookType)=>(
        <Book {...book} key={book.isbn}/>
      ))}
      </div>
      
      </BookContainer>

    </Wrapper>
  )
}
