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


//책 정보 Wrapper
export const BookWrapper=styled.div`
    display:flex;
    position:relative;
    align-items:center;
    padding:1rem 0.5rem;
    border-radius:1.5rem;
    justify-content:center;
    margin:0 2rem;

    @media all and (min-width:0px) and (max-width:1023px){
        flex-direction:column;
        margin:2rem 1.5rem;

        .imgBox{
            margin:0 2rem;
        }
    }

    .goBoardBtn{
        position:absolute;
        bottom:-50px;
        
        animation:${floating} 3s infinite;
        z-index:80;

        .downIcon{
            margin-left:0.5rem;
        }

    }

    .imgBox{
        position:relative;

        .backPattern1{
            background-color:#CDCDCD;
            position:absolute;
            width:60%;
            height:60%;
            top:-10%;
            right:-11%;
            border-radius:0 15px 0 0;
            z-index:-10;
        }

        .backPattern2{
            background-color:#5F6D7A;
            position:absolute;
            width:80%;
            height:22%;
            bottom:-5%;
            left:-9%;
            border-radius:0 0 0 10px;
            z-index:-10;
        }
        img{
            width:100%;
            object-fit:cover;
            box-shadow:5px 5px 12px rgba(0,0,0,0.3);
        }
    }
    
    .infoBox{
        display:flex;
        flex-direction:column;
        align-items:start;
        max-width:60%;
        font-family: 'Nanum Myeongjo', serif;
        margin-left:8rem;

        .reputation{
            display:flex;
            flex-direction:column;
            .chips{
                display:flex;
                
                .thumbUp{
                    margin-right:0.5rem;
                }
            }

            .star{
                display:flex;
                align-items:center;
                margin:0.5rem 0;
                i{
                    color:rgba(0,0,0,0.3);
                    margin-left:0.2rem;
                }
            }
        }

        .title{
            font-size:28px;
        }
        .author{
            font-size:14px;
            margin-top:10px;
        }
        .desc{
            font-size:18px;
            
        }

        @media all and (min-width:0px) and (max-width:1023px){
            max-width:100%;
            margin:4rem 0 0 0;

            .title{
                font-size:20px;
            }
            .author{
                font-size:14px;
                margin-top:8px;
            }
            .desc{
                font-size:12px;
                letter-spacing:1px;
            }
        }
    }
`
