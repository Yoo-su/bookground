import styled from 'styled-components';

//책 상세페이지 최상위 Wrapper
export const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
    padding:2rem 5rem;
    margin-top:8rem;

    @media all and (min-width:280px) and (max-width:540px){
        padding:0;
        justify-content:center;
        overflow:hidden;
    }
`;


