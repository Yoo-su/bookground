import { useState, memo } from 'react'
import { Wrapper, CustomInput, SearchBtn } from './styles'
import { BsSearch } from 'react-icons/bs';
import { useAppDispatch } from 'store/hook';
import { get_books_by_query } from 'store/asyncThunks';
import { setSearchQuery, setCurrentPage } from 'store/slices/bookSlice';
import useSnack from 'hooks/useSnack';

function SearchInput() {
  const dispatch = useAppDispatch();
  const { activateSnack } = useSnack();
  const [keyword, setKeyword] = useState('');

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      searchBooks(keyword);
    }
  }

  const searchBooks = (query: string) => {
    if (!query) {
      activateSnack("입력된 검색어가 없습니다", "info");
      return;
    }
    dispatch(setCurrentPage(1));
    dispatch(setSearchQuery(query));
    dispatch(get_books_by_query({ query, start: 1 }));
  }

  return (
    <Wrapper>
      <CustomInput placeholder='검색어를 입력하세요. . .'
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyPress={onKeyPress}
        value={keyword}
      />
      <SearchBtn onClick={() => {
        searchBooks(keyword);
      }}>
        <BsSearch className="searchIcon" />
      </SearchBtn>
    </Wrapper>
  )
}

export default memo(SearchInput);