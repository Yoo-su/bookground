import styled from 'styled-components';

export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding:12rem 5rem 0 5rem;
    min-height:100vh;
    background-color: ${props => props.theme.BG_COLOR};

    @media all and (min-width:0px) and (max-width:1023px){
        padding:8rem 0 0 0;
        justify-content:center;
        overflow:hidden;
    }
`;
