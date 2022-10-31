import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { AiOutlineDelete } from 'react-icons/ai'
import SnackAlert from '../SnackAlert';
import Pagination from 'components/common/Pagination';
import { CommentsList, Comment } from './styles';
import { getComments, deleteComment } from 'lib/api/book';

interface propsType {
    isbn: string,
    comments: any[],
    setComments: any,
    user: any
}

export default function Comments({ isbn, comments, setComments, user }: propsType) {

    //페이징 변수
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');

    const deleteComm = () => {
        deleteComment(isbn, user.email).then(res => {
            if (res.data.success) {
                setComments(comments.filter(comment => comment.email !== user.email));
                setSnackMsg('댓글이 삭제되었습니다')
                setShowSnackbar(true);
            }
            else {
                setSnackMsg('댓글 삭제중 오류가 발생했습니다');
                setShowSnackbar(true);
            }
        })
    }

    useEffect(() => {
        getComments(isbn).then(res => {
            if (!res.data.success) alert('오류 발생')
            setComments(res.data.comments);
        })
    }, [comments]);
    return (
        <CommentsList>
            {comments.slice(offset, offset + limit).map((comment, index) => (
                <Comment key={comment._id} order={index % 5} master={user ? comment.email === user.email : false}>
                    <div className="left">
                        <Avatar src={comment.profileImg} sx={{ width: 56, height: 56 }} />

                    </div>

                    <div className="right">
                        <div className="info">
                            <b>{comment.name}</b>
                            <Rating defaultValue={comment.rate} readOnly precision={0.5} />
                            <label>{comment.date}</label>
                            <AiOutlineDelete className='deleteIcon' size={24} onClick={deleteComm} />
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
            <SnackAlert open={showSnackbar} setOpen={setShowSnackbar} message={snackMsg} />
        </CommentsList>
    );
}