import styled from 'styled-components';

interface propsType{
    hovered:boolean
}

export const Wrapper=styled.div<propsType>`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:12rem;
    height:22rem;
    margin:1rem 1.5rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
    cursor:pointer;
    box-shadow:0 2px 2px rgba(0,0,0,0.3);
    border-radius:0.5rem;
    background:rgba(250,253,246);
    overflow:hidden;
    opacity:${props=>props.hovered===true?'0.8':'1'};
    transition:opacity 0.2s linear;
    

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
`;