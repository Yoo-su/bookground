import styled from 'styled-components';

export const Wrapper = styled.div`
display:flex;
align-items:center;
padding:1.5rem;
border-radius:3rem;
box-shadow:0 5px 10px rgba(0,0,0,0.3);
outline:none;
border:${props => props.theme.SEARCHBOX_BORDER_COLOR};
width:40%;
height:3rem;
transition:transform 0.1s linear;
background-color: ${props => props.theme.SEARCHBOX_BG_COLOR};

:focus{
    transform:scale(1.1);
}

@media all and (min-width:0px) and (max-width:1023px){
    width:65%;
    height:1.5rem;
    padding:1rem;
}
`;

export const CustomInput = styled.input`
    border:none;
    outline:none;
    max-width:70%;
    flex:1;
    font-size:1.5rem;
    font-family: 'Do Hyeon', sans-serif;
    color:${props => props.theme.TEXT_COLOR};
    background-color: ${props => props.theme.SEARCHBOX_BG_COLOR};

    ::placeholder{
        color:${props => props.theme.PLACEHOLDER_COLOR};
    }

    @media all and (min-width:0px) and (max-width:540px){
        font-size:16px;
        flex:0;
    }    
`;

export const SearchBtn = styled.button`
    width:3rem;    
    height:3rem;
    outline:none;
    border:none;
    padding:0.5rem;
    cursor:pointer;
    border-radius:50%;
    background:${props => props.theme.SEARCHBTN_BG_COLOR};
    margin-left:auto;
    
    :active{
        transform:scale(0.9);
        transition:transform 0.1s ease-in-out;
    }

    .searchIcon{
        width:1.5rem;
        height:1.5rem;
        color:white;
    }

    @media all and (min-width:0px) and (max-width:540px){
        width:2rem;
        height:2rem;

        .searchIcon{
            width:1rem;
            height:1rem;
        }
    }
`;