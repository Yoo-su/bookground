import styled from 'styled-components';

interface propsType{
    hovered:boolean
}

export const Wrapper=styled.div<propsType>`
    display:flex;
    position:relative;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:12rem;
    height:22rem;
    margin:1rem 2rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
    box-shadow:0 1px 5px rgba(0,0,0,0.3);
    border-radius:0.5rem;
    background:rgba(250,253,246,1);
    overflow:hidden;
    
    .bookCover, .bookInfo{
        opacity:${props=>props.hovered===true?'0.5':'1'};
        transition:opacity 0.2s linear;
    }

    .bookCover{
        width:100%;
        
        margin-top:1.5rem;
        overflow:hidden;

        .coverImg{
            width:100%;
            object-fit:cover;
        }
    }

    .bookInfo{
        display:flex;
        flex-direction:column;
        justify-content:start;
        align-items:center;
        padding:0 1rem;
        min-height:4.5rem;
        margin-top:0.2rem;

        b{
            font-size:12px;
        }

        label{
            font-size:8px;
        }
    }

    .toDetailBtn *{
        cursor:pointer;
    }

    .toDetailBtn{
        display:flex;
        position:absolute;
        top:25%;
        left:26.5%;
        visibility:${props=>props.hovered===true?'visible':'hidden'};
        align-items:center;
        justify-content:center;
        padding:0.2rem 0.3rem;
        border:none;
        border-radius:0.2rem;
        background:black;
        color:white;
        font-size:16px;
        font-family: 'IBM Plex Sans KR', sans-serif;

        .toDetailIcon{
            width:1.3rem;
            height:1.3rem;
            margin-right:0.2rem;
        }
    }

    @media all and (min-width:0px) and (max-width:1023px){
        width:10rem;
        height:15rem;
        margin:0.5rem 0.8rem;
        padding-top:0;
        .toDetailBtn{
            top:30%;
            left:21.5%;
        }
    }
`;