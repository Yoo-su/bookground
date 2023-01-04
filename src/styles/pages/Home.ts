import styled from "styled-components";
import Box from "@mui/material/Box";

export const Wrapper = styled(Box)`
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding-top:10rem;
  min-height:100vh;
  background-color: ${props => props.theme.BG_COLOR};
`;

export const BookContainer = styled(Box)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    flex-wrap:wrap;
    margin-top:5rem;
    width:100%;

    .MuiDivider-root{
      color:${props => props.theme.TEXT_COLOR};
      border-color: ${props => props.theme.TEXT_COLOR};
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