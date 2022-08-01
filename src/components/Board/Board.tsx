import { useState, useEffect } from 'react';
import Comments from '@components/Comments';
import { BoardWrapper } from './styles';
import { FcVoicePresentation } from 'react-icons/fc';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SnackAlert from '@components/SnackAlert';
import { MdSend } from 'react-icons/md'
import { boardType } from '../../types/boardType';
import { newComment } from '@api/book';

export default function Board({ isbn, data, status }: boardType) {
    const [rate, setRate] = useState<number | null>(0);
    const [userInput, setUserInput] = useState('');
    const [comments, setComments] = useState<any[]>([]);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackMsg, setSnackMsg] =  useState('');
    
    const handleInputChange=(event:  React.ChangeEvent<HTMLInputElement>)=>{
        setUserInput(event.target.value)
    }

    //의견 등록
    const submitComment=()=>{
        if (userInput===''){
            setSnackMsg('내용을 입력해주세요')
            setShowSnackbar(true);
            return;
        }

        let tmp=new Date()
        const time = tmp.toLocaleDateString().length===10?tmp.toLocaleDateString().slice(0,7):tmp.toLocaleDateString().slice(0,8);
        const date=tmp.toLocaleDateString()+' '+time;
        newComment(isbn, data.user, rate, userInput,date).then(res=>{
            if (res.data.success){
                setSnackMsg(res.data.message);
                setShowSnackbar(true)
                setComments(current=>[...current,{
                    email:data.user.email,
                    name:data.user.name,
                    image:data.user.image,
                    rate:rate,
                    comment:userInput,
                    date:date
                }])
                setRate(0);
                setUserInput('');
            }
            else {
                setSnackMsg(res.data.message);
                setShowSnackbar(true);
                setRate(0);
                setUserInput('');
            }
        })
    }

    useEffect(()=>{

    })

    return (
        <BoardWrapper id="userBoard">
            <h2><FcVoicePresentation className='commentIcon' /> 의견 게시판</h2>

            <div className="inputWrapper">
                <div className="inputField">
                    <div className="rating">
                        <Avatar src={data?.user?.image} sx={{ width: 56, height: 56 }} />
                        <Rating precision={0.5} value={rate} readOnly={status==='unauthenticated'?true:false}
                            onChange={(event, newValue) => {
                                setRate(newValue);
                            }} />
                    </div>
                    <TextField
                        className="textField"
                        multiline
                        fullWidth
                        color="info"
                        label={status === 'authenticated' ? `${data.user.name}님의 의견을 남겨보세요 😄` : '로그인 후 의견을 남겨보세요!'}
                        disabled={status === 'unauthenticated' ? true : false}
                        minRows={4}
                        value={userInput} onChange={handleInputChange}
                    />
                </div>

                <div className="submitBtn">
                    <Button className="submitBtn" variant="contained" fullWidth
                        disabled={status === 'unauthenticated' ? true : false} onClick={submitComment} >
                        <MdSend size={24} />
                    </Button>
                </div>
            </div>

            <Comments isbn={isbn} comments={comments} setComments={setComments} user={data?.user} />
            <SnackAlert open={showSnackbar} setOpen={setShowSnackbar} message={snackMsg} />
        </BoardWrapper>
    );
}