import React, {useState,memo} from 'react'
import { Wrapper, CustomInput, SearchBtn } from './styles'
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';

interface propsType{
    setBooks:any
}

function SearchInput({setBooks}:propsType) {
    const [keyword, setKeyword]=useState('');

    return (
        <Wrapper>
            <CustomInput placeholder='검색어를 입력하세요. . .' onChange={(e)=>{
                setKeyword(e.target.value);
            }} />
            <SearchBtn onClick={()=>{
                 axios.get('/api/books', {
                        params:{
                          query:keyword,
                        }
                      }).then(res=>{
                        if (res.data.success===true){
                          setBooks(res.data.items);
                          console.log(res.data.items)
                        }
                        else{
                          alert('오류발생');
                        }
                      })
            }}>
                <BsSearch className="searchIcon" />
            </SearchBtn>
        </Wrapper>
    )
}

export default memo(SearchInput);