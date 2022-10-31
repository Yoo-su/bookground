import { SetStateAction, Dispatch } from "react";

export interface BookType {
    title: string,
    link: string,
    image: string,
    author: string,
    price: string,
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
    email: string;
    name: string;
    image: string;
    rate: number | null;
    comment: string;
    date: string;
}