import styled, {keyframes} from 'styled-components';

const floating=keyframes`
    0%{
        transform:translateY(0px);
    }
    50%{
        transform:translateY(-10px);
    }
    100%{
        transform:translateY(0px);
    }
`

export const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding:2rem 5rem;
    margin-top:8rem;
`;

export const BookWrapper=styled.div`
    display:flex;
    position:relative;
    align-items:center;
    width:100%;
    padding:1rem 0.5rem;
    border-radius:1.5rem;
    justify-content:center;

    .goBoardBtn{
        position:absolute;
        bottom:10px;
        left:45%;
        animation:${floating} 3s infinite;
    }

    .imgBox{
        position:relative;

        .backPattern1{
            background-color:#CDCDCD;
            position:absolute;
            width:250px;
            height:250px;
            top:-40px;
            right:-40px;
            z-index:-10;
        }

        .backPattern2{
            background-color:#5F6D7A;
            position:absolute;
            width:50px;
            height:50px;
            bottom:-20px;
            left:-25px;
            z-index:-10;
        }
        img{
            width:312px;
            object-fit:cover;
            box-shadow:5px 5px 12px rgba(0,0,0,0.3);
        }
    }
    
    .infoBox{
        display:flex;
        flex-direction:column;
        align-items:start;
        font-family: 'Nanum Myeongjo', serif;
        margin-left:5rem;

        .reputation{
            display:flex;
            flex-direction:column;
            .chips{
                display:flex;
                margin-bottom:0.2rem;
                
                .thumbUp{
                    margin-right:0.5rem;
                }
            }

            .star{

            }
        }

        .title{
            font-size:28px;
        }
        .author{
            font-size:14px;
            margin-top:5px;
        }
        .desc{
            font-size:18px;
        }
    }
`