import React, { useState, useEffect, memo } from 'react'
import { Wrapper, CustomInput, SearchBtn } from './styles'
import { BsSearch } from 'react-icons/bs';
import { getBooks } from '@api/book';

interface propsType {
  setBooks: any,
  setLoading: any
}

function SearchInput({ setBooks, setLoading }: propsType) {
  const [keyword, setKeyword] = useState('');

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      search(keyword);
    }
  }

  const search = (query:string) => {
    if (query.length === 0) {
      return
    }
    localStorage.setItem('query',query);
    setBooks([]);
    setLoading(true);
    getBooks(query).then(res => {
      setBooks(res.data.items);
      setLoading(false);

      if (!res.data.success) alert('오류가 발생했습니다')
    })
  }

  useEffect(()=>{
    const query=localStorage.getItem('query')
    if (query){
      setKeyword(query);
      search(query);
    }
  },[])

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