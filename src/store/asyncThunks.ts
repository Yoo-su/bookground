import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBooks, getInfoByIsbn, updateBookRep, getComments, newComment, deleteComment } from "lib/api/book";
import { BookType, GetBookParam, GetBooksParam, UpdateBookRepParam, CommentType, CreateCommentType, DeleteCommentType } from "types";


interface GetBooksReturnType {
    books: BookType[],
    total: string,
}

export const get_books_by_query = createAsyncThunk<GetBooksReturnType, GetBooksParam>(
    "books/getByQuery",
    getBooks
);

export const get_newPage_books = createAsyncThunk<GetBooksReturnType, GetBooksParam>(
    "books/newPageBooks",
    getBooks
);



export const get_bookInfo_by_isbn = createAsyncThunk<any, GetBookParam>(
    "books/getByIsbn",
    getInfoByIsbn
);


interface UpdateBookRepReturnType {
    success: boolean;
}
export const update_book_reputation = createAsyncThunk<UpdateBookRepReturnType, UpdateBookRepParam>(
    "books/updateBookRep",
    updateBookRep
)


export const get_comments = createAsyncThunk<CommentType[], string>(
    "books/getComments",
    getComments
)

interface CreateCommentSuccess {
    newRate: number;
    item: CommentType;
    success: boolean;
}
export const create_new_comment = createAsyncThunk<CreateCommentSuccess, CreateCommentType>(
    "books/createComment",
    newComment
)

interface DeleteCommentSuccess {
    success: boolean;
}
export const delete_comment = createAsyncThunk<DeleteCommentSuccess, string>(
    "books/deleteComment",
    deleteComment
) 