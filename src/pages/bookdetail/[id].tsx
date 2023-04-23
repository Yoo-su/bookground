import BookInfo from 'components/BookInfo';
import Board from 'components/Board';
import { Wrapper } from "styles/pages/bookDetail";
import { useRouter } from "next/router";

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

