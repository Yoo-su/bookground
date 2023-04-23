import { useState, memo } from 'react';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { AiOutlineDelete } from 'react-icons/ai'
import { useSession } from "next-auth/react";

import Pagination from 'components/common/Pagination';

import { CommentsList, Comment } from './styles';
import { CommentType } from 'types';
import useSnack from 'hooks/useSnack';
import { delete_comment } from 'store/asyncThunks';
import { setComments } from "store/slices/bookSlice"
import { useAppDispatch } from 'store/hook';

interface propsType {
    comments: CommentType[],
}
const Comments = ({ comments }: propsType) => {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();
    const { activateSnack } = useSnack();

    //페이징 변수
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const deleteComment = (_id: string) => {
        try {
            session && dispatch(delete_comment(_id)).then(() => {
                dispatch(setComments(comments.filter(comment => comment._id !== _id)));
                activateSnack("댓글이 삭제되었습니다", "success");
            });
        }
        catch (err) {
            activateSnack("오류발생", "danger");
        }
    }

    return (
        <CommentsList>
            {comments.slice(offset, offset + limit).map((comment, index) => (
                <Comment key={comment._id} order={index % 5} master={session ? comment.email === session.user.email : false}>
                    <div className="left">
                        <Avatar src={comment.profileImg} alt={comment.profileImg} sx={{ width: 56, height: 56 }} />

                    </div>

                    <div className="right">
                        <div className="info">
                            <b>{comment.name}</b>
                            <Rating defaultValue={comment.rate} readOnly precision={0.5} />
                            <label>{comment.date}</label>
                            <AiOutlineDelete className='deleteIcon' size={24} onClick={() => {
                                deleteComment(comment._id);
                            }} />
                        </div>

                        <div className="text">
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                </Comment>
            ))}
            {comments.length > 0 && <Pagination
                total={comments.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />}
        </CommentsList>
    );
}

export default memo(Comments);