import styled from 'styled-components';
import BookInfo from 'components/BookInfo';
import Board from 'components/Board';
import { useRouter } from "next/router"

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
  const router = useRouter();
  const { id } = router.query;

  return (
    <Wrapper>
      {typeof id === "string" && <BookInfo isbn={id} />}

      {typeof id === "string" && <Board isbn={id} />}
    </Wrapper>
  )
}

