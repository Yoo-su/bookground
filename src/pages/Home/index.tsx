import { useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress"
import SearchInput from 'components/SearchInput';
import Book from 'components/Book';
import { useAppSelector, useAppDispatch } from 'store/hook';
import Fab from "@mui/material/Fab";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from "@mui/material/Divider";
import Paginator from 'components/Paginator';
import usePagination from 'hooks/usePagination';
import { get_newPage_books } from 'store/asyncThunks';
import { Wrapper, BookContainer, LoadingBox, FabBox } from "styles/pages/Home";
import { BookType } from 'types';

export default function Home() {
  const { loading, searchQuery, books, total } = useAppSelector(state => state.books);
  const dispatch = useAppDispatch();
  const bookContainerRef = useRef<HTMLDivElement>(null);

  const {
    currentPage, setCurrentPage, pageCount,
  } = usePagination(100, total);

  return (
    <Wrapper>
      <SearchInput />

      <BookContainer ref={bookContainerRef}>
        {total > 0 && (
          <Divider textAlign='left'>{total}개의 검색결과</Divider>
        )}
        {loading ?
          <LoadingBox>
            <CircularProgress size={150} />
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


      {books.length > 30 && (
        <FabBox>
          <Fab color="primary" onClick={() => {
            if (bookContainerRef) {
              window.scrollTo({ top: bookContainerRef?.current?.offsetTop, behavior: 'smooth' });
            }
          }}>
            <ArrowDropUpIcon />
          </Fab>

          <Fab color="primary" onClick={() => {
            if (bookContainerRef) {
              const offsetBottom = (bookContainerRef?.current?.offsetTop || 0) + (bookContainerRef?.current?.offsetHeight || 0);
              window.scrollTo({ top: offsetBottom, behavior: 'smooth' });
            }
          }}>
            <ArrowDropDownIcon />
          </Fab>
        </FabBox>
      )}
    </Wrapper>
  )
}
