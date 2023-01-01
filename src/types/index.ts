import { EmailConfig } from "next-auth/providers";
import { SetStateAction, Dispatch } from "react";

export interface BookType {
    title: string,
    link: string,
    image: string,
    author: string,
    discount: string,
    publisher: string,
    pubdate: string,
    isbn: string,
    description: string
}

export interface Board_BookInfoProp {
    isbn: string;
    data: {
        user: {
            email: string;
            image: string;
            name: string;
        }
    };
    status: string;
}


export interface SnackAlertProp {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    message: string,
}

export interface LoginUserChipProp {
    profileImg: string,
    name: string,
}

export interface SearchInputProp {
    setBooks: Dispatch<SetStateAction<BookType[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface CommentType {
    comment: string;
    date: string;
    email: string;
    isbn: string;
    name: string;
    profileImg: string;
    rate: number;
    thumb: boolean | null;
    _id: string;
}

export interface UiSliceType {
    openSnack: boolean;
    snackMessage: string;
    snackType: "success" | "danger" | "info";
}

export interface SnackPayload {
    message: string;
    type: "success" | "danger" | "info";
}

export interface BookDetailType {
    avgRate: number;
    downCnt: number;
    upCnt: number;
    item: string;
    userThumb: boolean | null;
}

export interface GetBooksParam {
    query: string,
    start: number,
}

export interface GetBookParam {
    isbn: string;
    curUser: string | null | undefined;
}

export interface UpdateBookRepParam {
    isbn: string;
    curUser: {
        email: string,
        name: string,
        image: string,
    };
    thumb: boolean | null;
}

export interface CreateCommentType {
    isbn: string;
    email: string;
    name: string;
    image: string;
    rate: number;
    comment: string;
    date: string;
}

export interface DeleteCommentType {
    isbn: string;
    curUser: string;
}