import styled from 'styled-components';

interface wrapperProps{
    isTop:boolean
}

export const Wrapper=styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    font-family: 'Noto Sans KR', sans-serif;
    padding:1rem 2rem;
    box-shadow:0px 4px 5px rgba(0,0,0,0.3);
    position:fixed;
    width:100%;
    top:0; 
    z-index:1;
    
    & .navbar_left{
        display:flex;
        align-items:center;
        
        & .navbar_left_title{
            display:flex;
            align-items:center;

            & label{
                font-size:2rem;
            }

            & :nth-child(2){
                color:#495e35;
            }

            & :nth-child(3){
                color:#4b371c;
            }
        }

        & .logoIcon{
            width:3rem;
            height:3rem;
        }

        
    }
`;