import styled from 'styled-components';

export const Wrapper = styled.div`
display:flex;
align-items:center;
padding:1.5rem;
border-radius:3rem;
box-shadow:0 5px 10px rgba(0,0,0,0.3);
outline:none;
border:none;
width:40%;
height:3rem;
transition:transform 0.1s linear;

:focus{
    transform:scale(1.1);
}
`;

export const CustomInput = styled.input`
    border:none;
    outline:none;
    flex-grow:1;
    font-size:1.5rem;
    font-family: 'Do Hyeon', sans-serif;
`;

export const SearchBtn = styled.button`
    width:3rem;    
    height:3rem;
    outline:none;
    border:none;
    padding:0.5rem;
    cursor:pointer;
    border-radius:50%;
    background:linear-gradient(to bottom, #4d0f28, #e39ff6);
    
    :active{
        transform:scale(0.9);
        transition:transform 0.1s ease-in-out;
    }

    .searchIcon{
        width:1.5rem;
        height:1.5rem;
        color:white;
    }
`;