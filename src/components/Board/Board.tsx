import { useState, useEffect, Fragment, memo, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { FcVoicePresentation } from 'react-icons/fc';
import { FaSadCry } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { MdSend } from 'react-icons/md'

import Comments from 'components/Comments';

import { BoardWrapper, LoadingBox, EmptyBox } from './styles';
import { get_comments, create_new_comment } from 'store/asyncThunks';
import { useAppDispatch, useAppSelector } from 'store/hook';
import useSnack from 'hooks/useSnack';

interface Prop {
    isbn: string;
}

const Board = ({ isbn }: Prop) => {
    const { data: session, status } = useSession();
    const { comments, commentsLoading } = useAppSelector(state => state.books);
    const dispatch = useAppDispatch();

    const [rate, setRate] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');

    const { activateSnack } = useSnack();

    // 의견 등록
    const createComment = () => {
        if (userInput === '') {
            activateSnack("메시지를 입력해주세요", "info");
            return;
        }

        const createTime = new Date().toLocaleString();
        session && dispatch(create_new_comment({ isbn, email: session.user.email, name: session.user.name, image: session.user.image, rate: rate, comment: userInput, date: createTime })).then(() => {
            activateSnack("댓글이 등록되었습니다", "success");
            setRate(0);
            setUserInput("");
        })
    }

    const checkRegistered = () => {
        if (session) {
            const result = comments.find(comment => comment.email === session.user.email);
            let check;
            result ? check = true : check = false;
            return check;
        }
    }

    const registered = useMemo(() => checkRegistered(), [comments]);

    useEffect(() => {
        dispatch(get_comments(isbn));
    }, [session]);

    return (
        <BoardWrapper id="userBoard">
            {commentsLoading ? (
                <LoadingBox>
                    <CircularProgress />
                </LoadingBox>
            ) : (
                <Fragment>
                    <h2><FcVoicePresentation className='commentIcon' /> 의견 게시판</h2>

                    <div className="inputWrapper">
                        <div className="inputField">
                            <div className="rating">
                                <Avatar src={session?.user?.image} sx={{ width: 56, height: 56 }} />
                                <Rating precision={0.5} value={rate} readOnly={(status === 'unauthenticated' || registered) ? true : false}
                                    onChange={(event, newValue) => {
                                        newValue && setRate(newValue);
                                    }} />
                            </div>
                            <TextField
                                className="textField"
                                multiline
                                fullWidth
                                color="info"
                                label={status === 'authenticated' ? registered ? "이미 의견을 등록하셨어요 :)" : `${session.user.name}님의 의견을 남겨보세요 😄` : '로그인 후 의견을 남겨보세요!'}
                                disabled={(status === 'unauthenticated' || registered) ? true : false}
                                minRows={4}
                                value={userInput} onChange={(e) => setUserInput(e.target.value)}
                            />
                        </div>

                        <div className="submitBtn">
                            <Button className="submitBtn" variant="contained" fullWidth
                                disabled={(status === 'unauthenticated' || registered) ? true : false} onClick={createComment} >
                                <MdSend size={24} />
                            </Button>
                        </div>
                    </div>

                    {comments.length > 0 ? (<Comments comments={comments} />) : (
                        <EmptyBox>
                            <FaSadCry size={100} />
                            <p>등록된 댓글이 없습니다</p>
                        </EmptyBox>
                    )}

                </Fragment>
            )}
        </BoardWrapper>
    );
}

export default memo(Board);