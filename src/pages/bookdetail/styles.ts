import styled, {keyframes} from 'styled-components';

const floating=keyframes`
    0%{
        transform:translateY(0px);
    }
    50%{
        transform:translateY(-10px);
    }
    100%{
        transform:translateY(0px);
    }
`

//책 상세페이지 최상위 Wrapper
export const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding:2rem 5rem;
    margin-top:8rem;
`;

//책 정보 Wrapper
export const BookWrapper=styled.div`
    display:flex;
    position:relative;
    align-items:center;
    padding:1rem 0.5rem;
    border-radius:1.5rem;
    justify-content:center;
    margin:0 2rem;

    .goBoardBtn{
        position:absolute;
        bottom:0;
        left:43%;
        animation:${floating} 3s infinite;
        z-index:80;
    }

    .imgBox{
        position:relative;

        .backPattern1{
            background-color:#CDCDCD;
            position:absolute;
            width:250px;
            height:250px;
            top:-40px;
            right:-40px;
            border-radius:0 15px 0 0;
            z-index:-10;
        }

        .backPattern2{
            background-color:#5F6D7A;
            position:absolute;
            width:100px;
            height:80px;
            bottom:-20px;
            left:-25px;
            border-radius:0 0 0 10px;
            z-index:-10;
        }
        img{
            width:312px;
            object-fit:cover;
            box-shadow:5px 5px 12px rgba(0,0,0,0.3);
        }
    }
    
    .infoBox{
        display:flex;
        flex-direction:column;
        align-items:start;
        max-width:60%;
        font-family: 'Nanum Myeongjo', serif;
        margin-left:8rem;

        .reputation{
            display:flex;
            flex-direction:column;
            .chips{
                display:flex;
                
                .thumbUp{
                    margin-right:0.5rem;
                }
            }

            .star{
                display:flex;
                align-items:center;
                margin:0.5rem 0;
                i{
                    color:rgba(0,0,0,0.3);
                    margin-left:0.2rem;
                }
            }
        }

        .title{
            font-size:28px;
        }
        .author{
            font-size:14px;
            margin-top:10px;
        }
        .desc{
            font-size:18px;
            
        }
    }
`

//게시판 Wrapper
export const BoardWrapper=styled.div`
    display:flex;
    flex-direction:column;
    margin-top:15rem;
    padding:0 5rem;
    font-family: 'Nanum Myeongjo', serif;

    h2 {
        display:flex;
        align-items:center;
        line-height:1rem;
        width:100%;
        border-bottom:1px solid rgba(0,0,0,0.3);

        .commentIcon{
            width:2rem;
            height:2rem;
        }
     } 
    
   .inputWrapper{
        display:flex;
        align-items:center;
        width:100%;

        .inputField{
            display:flex;
            align-items:center;
            width:80%;
            
            .rating{
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                margin-right:2rem;

                .MuiAvatar-root{
                    margin-bottom:1rem;
                }
            }

            .MuiOutlinedInput-input{
                font-family: 'Nanum Myeongjo', serif;
            }
        }

        .submitBtn{
            flex:1;
            margin:0 1rem;
            height:100px;
            font-family: 'Nanum Myeongjo', serif;
        }
   }
`;

export const CommentsList=styled.ul`
   list-style:none;
   padding-left:0;
`

interface commentProps{
    order:number
}
export const Comment=styled.li<commentProps>`
   display:flex;
   border-radius:1rem;
   margin-bottom:1rem;
   background-color:${props=>props.order===0?'rgba(0,0,0,0.1)': props.order===1?'rgba(85,170,255,0.1)':'rgba(175,128,79,0.1)'};
   .left{
        display:grid;
        justify-content: center;
        align-content: center;
        padding:2.5rem;
   
   }

   .right{
        display:flex;
        flex:1;
        flex-direction:column;
        padding:1rem 1.5rem;
        justify-content:center;
        border-left:1px solid rgba(0,0,0,0.1);
        .info{
            display:flex;
            align-items:center;

            b{
                margin-right:1rem;
            }

            label{
                color:rgba(0,0,0,0.4);
                margin-left:0.5rem;
            }
        }
        .text{
            display:flex;
            flex:1;
            

        }
   }
`;