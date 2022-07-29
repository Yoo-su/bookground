import React, {useEffect, useState} from 'react';
import { useSession } from 'next-auth/react';
import { Wrapper } from './styles';
import BookInfo from './BookInfo';
import Board from './Board';

export default function BookDetail() {
  
  //로그인 세션정보
  const {data, status} = useSession();
  const [isbn, setIsbn] = useState('');
  useEffect(()=>{
    setIsbn(location.href.split('=')[1]);
  },[status])

  return (
    <Wrapper>
      {isbn && <BookInfo isbn={isbn} data={data} status={status} />}
      
      {isbn && <Board isbn={isbn} data={data} status={status} />}
    </Wrapper>
  )
}

