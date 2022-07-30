import React, { useState, useEffect, useCallback } from 'react'
import { FcReadingEbook } from 'react-icons/fc';
import { Wrapper, LoginBtn } from './styles';
import {FcGoogle} from 'react-icons/fc';
import LoginUserChip from './/LoginUserChip';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
    const [isTop, setIsTop] = useState(true);
    const { data, status } = useSession();

    const onScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= 100) {
            setIsTop(false)
        } else {
            setIsTop(true);
        }
    }, [isTop,status]);

    useEffect(() => {
        document.addEventListener("scroll", onScroll);

        return () => document.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    return (
        <Wrapper isTop={isTop}>
            <Link href={'/'} passHref>
            <div className='navbar_left'>
                <div className='navbar_left_title'>
                    <FcReadingEbook className="logoIcon" />
                    <label>Book</label>
                    <label>Ground</label>
                </div>
            </div>
            </Link>

            <div className="navbar_right">
                { status==='unauthenticated' && 
                    <LoginBtn onClick={()=>{signIn('google')}}>
                        <FcGoogle className='loginIcon' />
                        <label>Login</label>
                    </LoginBtn>
                }
                { status==='authenticated' && 
                    <LoginUserChip profileImg={data?.user?.image||''} name={data?.user?.name||''} />
                }
            </div>
        </Wrapper>
    )
}
