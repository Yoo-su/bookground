import { Oval } from 'react-loader-spinner'
import SearchInput from 'components/SearchInput';
import Book from 'components/Book';
import { useAppSelector, useAppDispatch } from 'store/hook';
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Paginator from 'components/Paginator';
import usePagination from 'hooks/usePagination';
import { get_newPage_books } from 'store/asyncThunks';
import styled from 'styled-components';
import { BookType } from 'types';

const Wrapper = styled(Box)`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:10rem;
  
`;

const BookContainer = styled(Box)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    flex-wrap:wrap;
    margin-top:5rem;
    width:100%;

    .resultCount{
      box-shadow:0 1px 1px rgba(0,0,0,0.2);
      
      b{
        margin-left:150px;
        font-family: 'IBM Plex Sans KR', sans-serif;

        @media all and (min-width:0px) and (max-width:1023px){
          margin-left:1.5rem;
        }
      }
    }
    
    .books{
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
      padding:0 50px;

      @media all and (min-width:0px) and (max-width:1023px){
        padding:0.5rem 0.1rem;
      }
    }
`;

const LoadingBox = styled(Box)`
  display:grid;
  justify-content: center;
  margin:5rem 0;
`;

export default function Home() {
  const { loading, searchQuery, books, total } = useAppSelector(state => state.books);
  const dispatch = useAppDispatch();

  const {
    currentPage, setCurrentPage, pageCount,
  } = usePagination(100, total);

  return (
    <Wrapper>
      <SearchInput />

      <BookContainer>
        {total > 0 && (
          <Divider textAlign='left'>{total}개의 검색결과</Divider>
        )}
        {loading ?
          <LoadingBox>
            <Oval color="#00BFFF" secondaryColor='grey' height={120} width={120} strokeWidth={4} />
          </LoadingBox> :
          total > 0 ? <div className="books">
            {books.map((book: BookType) => (
              <Book {...book} key={book.isbn} />
            ))}
          </div> : <></>}


      </BookContainer>

      {total > 0 && (
        <Paginator pageCount={pageCount} onPageChange={(_, newPage) => {
          setCurrentPage(newPage);
          dispatch(get_newPage_books({ query: searchQuery, start: newPage * 100 }))
        }} currentPage={currentPage} />
      )}

    </Wrapper>
  )
}
