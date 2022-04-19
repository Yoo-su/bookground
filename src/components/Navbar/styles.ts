import styled from 'styled-components';

interface wrapperProps{
    isTop:boolean
}

export const Wrapper=styled.div<wrapperProps>`
    display:flex;
    flex-direction:row;
    align-items:center;
    font-family: 'Open Sans Condensed', sans-serif;
    padding:1rem 2rem;
    box-shadow:0px 4px 5px rgba(0,0,0,0.3);
    position:fixed;
    width:100%;
    top:0; 
    z-index:50;
    background:${props=>props.isTop===true?'rgba(255,255,255,1)':'rgba(255,255,255,0.7)'};
    height:${props=>props.isTop===true?'4.5rem':'2.5rem'};
    transition:height 0.1s linear;
    
    .navbar_left{
        display:flex;
        align-items:center;
        flex:9;
        
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

    .navbar_right{
        display:flex;
        align-items:center;
        flex:1;
    }
`;

export const LoginBtn=styled.button`
    display:flex;
    align-items:center;
    border-radius:2rem;
    background:white;
    border:none;
    outline:none;
    height:2rem;
    padding:1rem 0.8rem;
    box-shadow:1px 1px 2px rgba(0,0,0,0.3);
    cursor:pointer;

    .loginIcon{
        width:1.2rem;
        height:1.2rem;
        margin-right:0.5rem;
    }
`;