import React, { useState, useEffect, memo } from 'react'
import { Wrapper, CustomInput, SearchBtn } from './styles'
import { BsSearch } from 'react-icons/bs';
import { getBooks } from 'lib/api/book';
import { SearchInputProp } from "types/bookType";

function SearchInput({ setBooks, setLoading }: SearchInputProp) {
  const [keyword, setKeyword] = useState('');

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      search(keyword);
    }
  }

  const search = (query: string) => {
    setBooks([]);
    setLoading(true);
    getBooks(query).then(res => {
      setBooks(res.data.items);
      setLoading(false);
    })
  }

  useEffect(() => {
    search(keyword);
  }, [])

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
        search(keyword);
      }}>
        <BsSearch className="searchIcon" />
      </SearchBtn>
    </Wrapper>
  )
}

export default memo(SearchInput);