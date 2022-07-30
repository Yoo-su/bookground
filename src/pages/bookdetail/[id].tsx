import React, {useEffect, useState} from 'react';
import { useSession } from 'next-auth/react';
import { Wrapper } from './styles';
import BookInfo from '@components/BookInfo';
import Board from '@components/Board';

export default function BookDetail() {
  
  //로그인 세션정보
  const {data, status} = useSession();
  const [isbn, setIsbn] = useState('');
  useEffect(()=>{
    setIsbn(location.href.split('=')[1]);
  },[status])

  return (
    <Wrapper>
      {(isbn&&status!=='loading') &&  <BookInfo isbn={isbn} data={data} status={status} />}
      
      {(isbn&&status!=='loading') && <Board isbn={isbn} data={data} status={status} />}
    </Wrapper>
  )
}

