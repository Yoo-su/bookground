import React, { useState, useEffect, useCallback } from 'react'
import { FcReadingEbook } from 'react-icons/fc';
import { Wrapper, LoginBtn } from './styles';
import {FcGoogle} from 'react-icons/fc';

export default function Navbar() {
    const [isTop, setIsTop] = useState(true);

    const onScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= 100) {
            setIsTop(false)
        } else {
            setIsTop(true);
        }
    }, [isTop]);

    useEffect(() => {
        document.addEventListener("scroll", onScroll);

        return () => document.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    return (
        <Wrapper isTop={isTop}>
            <div className='navbar_left'>
                <div className='navbar_left_title'>
                    <FcReadingEbook className="logoIcon" />
                    <label>Book</label>
                    <label>Ground</label>
                </div>
            </div>

            <div className="navbar_right">
                <LoginBtn>
                    <FcGoogle className='loginIcon' />
                    <label>Login</label>
                </LoginBtn>
            </div>
        </Wrapper>
    )
}
