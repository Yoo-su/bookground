import styled from "styled-components";
import Box from "@mui/material/Box";

export const Wrapper = styled(Box)`
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:10rem;
  height:100%;
  
`;

export const BookContainer = styled(Box)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    flex-wrap:wrap;
    margin-top:5rem;
    width:100%;

    .resultCount{
      box-shadow:0 1px 1px rgba(0,0,0,0.2);
      
      b{
        margin-left:150px;
        font-family: 'IBM Plex Sans KR', sans-serif;

        @media all and (min-width:0px) and (max-width:1023px){
          margin-left:1.5rem;
        }
      }
    }
    
    .books{
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
      padding:0 50px;

      @media all and (min-width:0px) and (max-width:1023px){
        padding:0.5rem 0.1rem;
      }
    }
`;

export const LoadingBox = styled(Box)`
  display:grid;
  justify-content: center;
  margin:5rem 0;
`;

export const FabBox = styled(Box)`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    position:fixed;
    bottom:1.5rem;
    right:3rem;

    .MuiFab-root{
      margin:0.4rem 0;
      color:white;
      
      .MuiSvgIcon-root{
        font-size:2.5rem;
      }
    }

    @media all and (min-width:0px) and (max-width:540px){
      display:none;
    }
`;