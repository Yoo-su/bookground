import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import BookInfo from 'components/BookInfo';
import Board from 'components/Board';

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding:2rem 5rem;
    margin-top:9rem;

    @media all and (min-width:0px) and (max-width:1023px){
        padding:0;
        justify-content:center;
        overflow:hidden;
    }
`;

export default function BookDetail() {
  const [isbn, setIsbn] = useState('');
  useEffect(() => {
    setIsbn(location.href.split('=')[1]);
  }, [status])

  return (
    <Wrapper>
      {(isbn && status !== 'loading') && <BookInfo isbn={isbn} />}

      {(isbn && status !== 'loading') && <Board isbn={isbn} />}
    </Wrapper>
  )
}

