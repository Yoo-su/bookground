import React, { useState, useEffect, useCallback } from 'react'
import { FcReadingEbook } from 'react-icons/fc';
import { Wrapper } from './styles';

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
        <Wrapper>
            <div className='navbar_left'>
                <div className='navbar_left_title'>
                    <FcReadingEbook className="logoIcon" />
                    <label>Book</label>
                    <label>Ground</label>
                </div>
            </div>

            <div className="navbar_right">

            </div>
        </Wrapper>
    )
}
