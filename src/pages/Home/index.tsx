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
import { Wrapper, BookContainer, LoadingBox, FabBox } from "styles/pages/home";
import { BookType } from 'types';

export default function Home() {
  const { loading, searchQuery, books, total } = useAppSelector(state => state.books);
  const dispatch = useAppDispatch();
  const bookContainerRef = useRef<HTMLDivElement>(null);

  const {
    currentPage, setCurrentPage, pageCount,
  } = usePagination(100, total);

  // 새 페이지 클릭 처리
  const handleNewPageClick = (newPage: number) => {
    setCurrentPage(newPage);
    dispatch(get_newPage_books({ query: searchQuery, start: (newPage - 1) * 100 + 1 }))
  }

  // up 스크롤 버튼 클릭 처리
  const handleUpScrollBtnClick = () => {
    if (bookContainerRef) {
      window.scrollTo({ top: bookContainerRef?.current?.offsetTop, behavior: 'smooth' });
    }
  }

  // down 스크롤 버튼 클릭 처리
  const handleDownScrollBtnClick = () => {
    if (bookContainerRef) {
      const offsetBottom = (bookContainerRef?.current?.offsetTop || 0) + (bookContainerRef?.current?.offsetHeight || 0);
      window.scrollTo({ top: offsetBottom, behavior: 'smooth' });
    }
  }

  return (
    <Wrapper>
      <SearchInput />

      <BookContainer ref={bookContainerRef}>
        {total > 0 && (
          <Divider className="divider" textAlign='left'>{total}개의 검색결과</Divider>
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
        <Paginator
          pageCount={pageCount}
          onPageChange={(_, newPage) => {
            handleNewPageClick(newPage);
          }}
          currentPage={currentPage} />
      )}


      {books.length > 30 && (
        <FabBox>
          <Fab color="primary" onClick={handleUpScrollBtnClick}>
            <ArrowDropUpIcon />
          </Fab>

          <Fab color="primary" onClick={handleDownScrollBtnClick}>
            <ArrowDropDownIcon />
          </Fab>
        </FabBox>
      )}
    </Wrapper>
  )
}
