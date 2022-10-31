import styled from 'styled-components';

export const CommentsList = styled.ul`
   list-style:none;
   padding-left:0;
   @media all and (min-width:0px) and (max-width:1023px){
        overflow:hidden;
    }
`

interface commentProps {
    order: number,
    master: boolean,
}
export const Comment = styled.li<commentProps>`
   display:flex;
   border-radius:1rem;
   margin-bottom:1rem;
   background-color:${props => props.order === 0 ? 'rgba(0,0,0,0.1)' : props.order === 1 ?
        'rgba(34,140,34,0.1)' : props.order === 2 ? 'rgba(175,128,79,0.1)' : props.order === 3 ? 'rgba(85,170,255,0.1)' : 'rgba(255,210,52,0.1)'};
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
            width:100%;

            b{
                margin-right:1rem;
            }

            label{
                color:rgba(0,0,0,0.4);
                margin-left:0.5rem;
            }

            .deleteIcon{
                display:${props => props.master === false && 'none'};
                margin-left:auto;
                cursor:pointer;
                color:rgba(0,0,0,0.6);
                transition:color 0.3s linear;

                :hover{
                    color:#000;
                }
            }
        }
        .text{
            display:flex;
            flex:1;
        }
   }

   @media all and (min-width:0px) and (max-width:1023px){
    .left{
        padding:1rem;
        .MuiAvatar-root{
            width:1.8rem;
            height:1.8rem;
        }
    }

    .right{
        padding:0.8rem 1rem;

        .info{
            b{
                font-size:12px;
                margin-right:0.2rem;
            }
            .MuiRating-root{
                font-size:0.8rem;
            }

            label{
                font-size:8px;
            }

            .deleteIcon{
                width:1rem;
                height:1rem;
            }
        }
        .text{
            font-size:14px;
        }
    }
   }
`;