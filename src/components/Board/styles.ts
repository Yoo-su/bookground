import styled from 'styled-components';
import Box from "@mui/material/Box";

//게시판 Wrapper
export const BoardWrapper = styled(Box)`
    display:flex;
    flex-direction:column;
    margin-top:15rem;
    padding:0 5rem;
    font-family: 'Nanum Myeongjo', serif;

    @media all and (min-width:0px) and (max-width:1023px){
        margin-top:5rem;
        padding:0 1rem;
    }

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

        @media all and (min-width:0px) and (max-width:1023px){
            font-size:18px;
            
            .commentIcon{
                width:1.8rem;
                height:1.8rem;
            }
        }
     } 
    
   .inputWrapper{
        display:flex;
        align-items:center;
        width:100%;

        @media all and (min-width:0px) and (max-width:1023px){
            flex-direction:column;
        }
        
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

            @media all and (min-width:0px) and (max-width:1023px){
                width:100%;
                .rating{
                    margin-right:0.5rem;
    
                    .MuiAvatar-root{
                        width:2rem;
                        height:2rem;
                        margin-bottom:0.5rem;
                    }
        
                    .MuiRating-root{
                        font-size:1rem;
                    }
                }

                .textField{
                    *{
                        font-size:12px;
                    }
                }
            }
        }

        .submitBtn{
            flex:1;
            margin:0 1rem;
            height:100px;
            font-family: 'Nanum Myeongjo', serif;

            @media all and (min-width:0px) and (max-width:1023px){
                width:100%;
                flex:0;
                margin:3px 0 0 0;
                height:100%;
                
            }
        }
   }
`;

export const LoadingBox = styled(Box)`
    display:grid;
    justify-content: center;
    align-items: center;
`;

export const EmptyBox = styled(Box)`
    padding:5rem 0;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
