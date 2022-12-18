import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { BookWrapper } from './styles';
import CircularProgress from "@mui/material/CircularProgress"
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Fab from '@mui/material/Fab';
import { BsHandThumbsUp, BsHandThumbsDown, BsArrowDownCircle } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { get_bookInfo_by_isbn, update_book_reputation } from 'store/asyncThunks';
import { setBookUpCnt, setBookDownCnt, setUserThumb } from 'store/slices/bookSlice';
import useSnack from 'hooks/useSnack';

interface Prop {
    isbn: string;
}

export default function BookInfo({ isbn }: Prop) {
    const { data: session, status } = useSession();
    const { loading, bookDetail, bookRate, userThumb, upCnt, downCnt } = useAppSelector(state => state.books);
    const dispatch = useAppDispatch();
    const { activateSnack } = useSnack();

    //good 버튼 클릭처리
    const handleUpClick = () => {
        if (session === null) {
            activateSnack("로그인 후 이용 가능합니다", "info");
            return;
        }

        if (userThumb === false) {
            dispatch(update_book_reputation({ isbn, curUser: session.user.email, thumb: true }));
            dispatch(setUserThumb(true));
            dispatch(setBookDownCnt(downCnt - 1));
            dispatch(setBookUpCnt(upCnt + 1));
        }
        else if (userThumb === true) {
            dispatch(update_book_reputation({ isbn, curUser: session.user.email, thumb: null }));
            dispatch(setUserThumb(null));
            dispatch(setBookUpCnt(upCnt - 1));
        }
        else if (userThumb === null) {
            dispatch(update_book_reputation({ isbn, curUser: session.user.email, thumb: true }));
            dispatch(setUserThumb(true));
            dispatch(setBookUpCnt(upCnt + 1));
        }

    }

    //bad 버튼 클릭 처리
    const handleDownClick = () => {
        if (session === null) {
            activateSnack("로그인 후 이용 가능합니다", "info");
            return;
        }

        //good 버튼이 눌려져 있던 상태면
        if (userThumb === true) {
            dispatch(update_book_reputation({ isbn, curUser: session.user.email, thumb: false }));
            dispatch(setUserThumb(false));
            dispatch(setBookDownCnt(downCnt + 1));
            dispatch(setBookUpCnt(upCnt - 1));
        }
        else if (userThumb === false) {
            dispatch(update_book_reputation({ isbn, curUser: session.user.email, thumb: null }));
            dispatch(setUserThumb(null));
            dispatch(setBookDownCnt(downCnt - 1));
        }
        else if (userThumb === null) {
            dispatch(update_book_reputation({ isbn, curUser: session.user.email, thumb: false }));
            dispatch(setUserThumb(false));
            dispatch(setBookDownCnt(downCnt + 1));
        }
    }

    //게시판으로 스크롤
    const scrollToBoard = () => {
        document.getElementById("userBoard")?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    useEffect(() => {
        dispatch(get_bookInfo_by_isbn({ isbn, curUser: session?.user.email }))
    }, [isbn, session]);

    return (
        <BookWrapper>
            {loading ?
                <CircularProgress size={150} /> :
                bookDetail &&
                <>
                    <div className="imgBox">
                        <div className="backPattern1"></div>
                        <div className="backPattern2"></div>
                        <img src={bookDetail.image[0]} alt={bookDetail.image[0]} />
                    </div>

                    <div className="infoBox">
                        <div className="reputation">
                            <div className="chips">
                                <Chip className="thumbUp" icon={<BsHandThumbsUp />} label={upCnt}
                                    color="primary" variant={userThumb === true ? 'filled' : 'outlined'} clickable onClick={handleUpClick} />
                                <Chip className="thumbDown" icon={<BsHandThumbsDown />} label={downCnt}
                                    color="primary" variant={userThumb === false ? 'filled' : 'outlined'} clickable onClick={handleDownClick} />
                            </div>
                            <div className="star">
                                <Rating
                                    precision={0.1}
                                    name="simple-controlled"
                                    value={bookRate}
                                    readOnly
                                />
                                <i>{bookRate}</i>
                            </div>
                        </div>
                        <b className="title">{bookDetail.title[0]}</b>

                        <div className="sideInfo">
                            <b className="author">{bookDetail.author[0]}</b>
                            <div className="pubInfo">
                                <b className="publisher">{bookDetail.publisher[0]}</b>
                                <b className="pubdate">{bookDetail.pubdate[0].slice(0, 4) + '.' + bookDetail.pubdate[0].slice(4, 6) + '.' + bookDetail.pubdate[0].slice(6, 8)}</b>
                            </div>
                        </div>

                        <p className="desc">- {bookDetail.description[0]}</p>
                    </div>
                    <Fab className="goBoardBtn" variant="extended" color="info" onClick={scrollToBoard}>
                        리뷰 확인하기
                        <BsArrowDownCircle className='downIcon' size={24} />
                    </Fab>
                </>
            }
        </BookWrapper>
    );
}