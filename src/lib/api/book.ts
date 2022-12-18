import axios from 'axios';
import { CreateCommentType, DeleteCommentType, GetBookParam, UpdateBookRepParam } from "types";

//검색어로 책 검색
interface GetBooksParams {
  query: string,
  start: number,
}
export const getBooks = async ({ query, start }: GetBooksParams) => {
  try {
    const result = await axios.get('/api/books', {
      params: {
        query,
        start,
      }
    });

    return result.data;
  } catch (err) {
    throw err;
  }
}


//isbn값으로 책 관련 정보 조회
export const getInfoByIsbn = async ({ isbn, curUser = null }: GetBookParam) => {
  try {
    const result = await axios.get('/api/getInfoByIsbn', {
      params: {
        isbn: isbn,
        curUser: curUser
      }
    });

    return result.data;
  } catch (err) {
    throw err;
  }
}

//사용자 책 평가 정보 업데이트
export const updateBookRep = async ({ isbn, curUser, thumb }: UpdateBookRepParam) => {
  try {
    const result = await axios.put('/api/updateBookRep',
      {
        isbn: isbn,
        curUser: curUser,
        thumb: thumb,
      }
    )

    return result.data;
  } catch (err) {
    throw err
  }
}


//사용자 의견 등록
export const newComment = async ({ isbn, email, name, image, rate, comment, date }: CreateCommentType) => {
  try {
    const result = await axios.post('/api/newComment', {
      isbn: isbn,
      email: email,
      name: name,
      image: image,
      rate: rate,
      comment: comment,
      date: date,
    })
    return result.data;
  } catch (err) {
    throw err;
  }
}


//책 관련 사용자들의 의견 조회
export const getComments = async (isbn: string) => {
  try {
    const result = await axios.get('/api/getComments', {
      params: {
        isbn: isbn
      }
    })

    return result.data.comments;
  } catch (err) {
    throw err;
  }
}


//사용자 댓글 삭제
export const deleteComment = async (_id: string) => {
  try {
    const result = await axios.post('/api/deleteComment', {
      _id: _id
    });

    return result.data;
  } catch (err) {
    throw err;
  }
}