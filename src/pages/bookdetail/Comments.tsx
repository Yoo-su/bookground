import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Pagination from '@components/common/Pagination';
import { CommentsList, Comment } from './styles';
import { getComments  } from '@api/book';

interface propsType{
    isbn:string
}

export default function Comments({isbn}:propsType){
    const [userComments, setUserComments] = useState<any[]>([]);

    //페이징 변수
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(()=>{
        getComments(isbn).then(res=>{
            if (!res.data.success) alert('오류 발생')
            setUserComments(res.data.comments);
        })
    },[]);
    return(
        <CommentsList>
            {userComments.slice(offset, offset + limit).map((comment,index)=>(
                <Comment key={comment._id} order={index%3}>
                    <div className="left">
                        <Avatar src={comment.profileImg} sx={{ width: 56, height: 56 }} />
                    </div>
                    
                    <div className="right">
                        <div className="info">
                            <b>{comment.name}</b>
                            <Rating defaultValue={comment.rate} readOnly precision={0.5} />
                            <label>{comment.date}</label>
                        </div>

                        <div className="text">
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                </Comment>
            ))}
            <Pagination 
                total={userComments.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </CommentsList>
    );
}