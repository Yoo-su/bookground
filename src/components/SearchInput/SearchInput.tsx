import React, { useState, memo } from 'react'
import { Wrapper, CustomInput, SearchBtn } from './styles'
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';

interface propsType {
  setBooks: any,
  setLoading: any
}

function SearchInput({ setBooks, setLoading }: propsType) {
  const [keyword, setKeyword] = useState('');

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      search();
    }
  }

  const search = () => {
    if (keyword.length === 0) {
      return
    }
    setBooks([]);
    setLoading(true);
    axios.get('/api/books', {
      params: {
        query: keyword,
      }
    }).then(res => {
      if (res.data.success === true) {
        setBooks(res.data.items);
        setLoading(false);
      }
      else {
        alert('오류발생');
      }
    })
  }

  return (
    <Wrapper>
      <CustomInput placeholder='검색어를 입력하세요. . .'
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyPress={onKeyPress}
      />
      <SearchBtn onClick={() => {
        search();
      }}>
        <BsSearch className="searchIcon" />
      </SearchBtn>
    </Wrapper>
  )
}

export default memo(SearchInput);