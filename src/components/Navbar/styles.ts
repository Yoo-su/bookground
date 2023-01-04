import styled from 'styled-components';

interface wrapperProps {
    isTop: boolean
}

export const Wrapper = styled.nav<wrapperProps>`
    display:flex;
    flex-direction:row;
    align-items:center;
    font-family: 'Open Sans Condensed', sans-serif;
    padding:1rem 0;
    box-shadow:0px 4px 5px rgba(0,0,0,0.3);
    position:fixed;
    width:100%;
    top:0; 
    z-index:90;
    background:${props => props.isTop === true ? props.theme.NAVBAR_BG_COLOR : props.theme.NAVBAR_SCROLL_BG_COLOR};
    height:${props => props.isTop === true ? '4.5rem' : '2.5rem'};
    transition:height 0.1s linear;
    
    .navbar_left{
        display:flex;
        margin-left:60px;

        .navbar_left_title{
            display:flex;
            align-items:center;

            label{
                cursor:pointer;
                font-size:2rem;
            }

            & :nth-child(2){
                color:${props => props.theme.LOGO1_COLOR};
            }

            & :nth-child(3){
                color:${props => props.theme.LOGO2_COLOR};
            }
        }

        .logoIcon{
            width:3rem;
            height:3rem;
        }
    }

    .navbar_right{
        margin-right:60px;
        flex:1;
        display:flex;
        align-items: center;
        justify-content:flex-end;

        .switchBox{
            margin-right:0.5rem;
        }

        .MuiChip-label{
            color:${props => props.theme.TEXT_COLOR};
        }        
    }

    @media all and (min-width:0px) and (max-width:1023px){
        padding:0.5rem 0;

        .navbar_left{
            margin-left:1rem;

            .navbar_left_title{
                label{
                    font-size:1.6rem;
                }
                .logoIcon{
                    width:2.5rem;
                    height:2.5rem;
                }
            }
        }
        .navbar_right{
            margin-right:1rem;
        }
    }
`;

export const LoginBtn = styled.button`
    display:flex;
    align-items:center;
    border-radius:2rem;
    background:white;
    border:none;
    outline:none;
    height:2rem;
    padding:1rem 0.8rem;
    box-shadow:1px 1px 2px rgba(0,0,0,0.3);
    
    :active{
        transform:scale(0.9);
        transition:transform 0.1s linear;
    }

    &,  *{
        cursor:pointer;
    }
  
    .loginIcon{
        width:1.2rem;
        height:1.2rem;
        margin-right:0.5rem;
    }
`;
