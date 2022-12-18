import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    get_books_by_query,
    get_newPage_books, get_bookInfo_by_isbn,
    update_book_reputation,
    get_comments,
    create_new_comment,
    delete_comment
} from "store/asyncThunks";
import { BookType, CommentType } from "types";
import xml2js from "xml2js";

interface Type {
    loading: boolean,
    commentsLoading: boolean,

    searchQuery: string,
    books: BookType[],
    total: number,
    bookDetail: any,
    bookRate: number | null,
    upCnt: number,
    downCnt: number,
    userThumb: boolean | null,

    comments: CommentType[],

    currentPage: number,
}
const initialState: Type = {
    loading: false,
    commentsLoading: false,

    searchQuery: "",
    books: [],
    total: 0,
    bookDetail: null,
    bookRate: null,
    upCnt: 0,
    downCnt: 0,
    userThumb: null,

    comments: [],
    currentPage: 1,
}

const slice = createSlice({
    name: "bookSlice",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setBookRate: (state, action: PayloadAction<number>) => {

        },
        setBookUpCnt: (state, action: PayloadAction<number>) => {
            state.upCnt = action.payload;
        },
        setBookDownCnt: (state, action: PayloadAction<number>) => {
            state.downCnt = action.payload;
        },
        setUserThumb: (state, action: PayloadAction<boolean | null>) => {
            state.userThumb = action.payload;
        },
        setComments: (state, action: PayloadAction<CommentType[]>) => {
            state.comments = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            //책 검색
            .addCase(
                get_books_by_query.pending, (state, action) => {
                    state.total = 0;
                    state.loading = true;
                })
            .addCase(
                get_books_by_query.fulfilled, (state, action) => {
                    const total = parseInt(action.payload.total);

                    state.books = action.payload.books;
                    state.total = total >= 1000 ? 1000 : total
                    state.loading = false;
                }
            )
            .addCase(
                get_books_by_query.rejected, (state, action) => {
                    state.loading = false;
                    state.books = [];
                }
            )

            //새 페이지 검색
            .addCase(
                get_newPage_books.pending, (state, action) => {
                    state.loading = true;
                })
            .addCase(
                get_newPage_books.fulfilled, (state, action) => {
                    const total = parseInt(action.payload.total);

                    state.books = action.payload.books;
                    state.total = total >= 1000 ? 1000 : total
                    state.loading = false;
                }
            )
            .addCase(
                get_newPage_books.rejected, (state, action) => {
                    state.loading = false;
                }
            )

            //책 상세정보
            .addCase(
                get_bookInfo_by_isbn.pending, (state, action) => {
                    state.loading = true;
                })
            .addCase(
                get_bookInfo_by_isbn.fulfilled, (state, action) => {
                    const parser = new xml2js.Parser();
                    parser.parseString(action.payload.item, (err, result) => {
                        const item = result.rss.channel[0].item[0];
                        state.bookDetail = item;
                        state.bookRate = action.payload.avgRate;
                        state.upCnt = action.payload.upCnt;
                        state.downCnt = action.payload.downCnt;
                        state.userThumb = action.payload.userThumb;
                        state.loading = false;
                    })
                }
            )
            .addCase(
                get_bookInfo_by_isbn.rejected, (state, action) => {
                    state.loading = false;
                }
            )

            //댓글 조회
            .addCase(
                get_comments.pending, (state, action) => {
                    state.commentsLoading = true;
                }
            )
            .addCase(
                get_comments.fulfilled, (state, action) => {
                    state.comments = action.payload;
                    state.commentsLoading = false;
                }
            )
            .addCase(
                get_comments.rejected, (state, action) => {
                    state.commentsLoading = false;
                    state.comments = [];
                }
            )

            //댓글 등록
            .addCase(
                create_new_comment.fulfilled, (state, action) => {
                    state.bookRate = action.payload.newRate;
                    state.comments = [action.payload.item, ...state.comments]
                }
            )
    }
})

export const { setSearchQuery, setCurrentPage, setBookUpCnt, setBookDownCnt, setUserThumb, setComments } = slice.actions;
export default slice.reducer;