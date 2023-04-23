import { useState, MouseEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LoginUserChipProp } from 'types';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react';

export default function LoginUserChip({ profileImg, name }: LoginUserChipProp) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleChipClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Chip
                avatar={<Avatar alt="profile" src={profileImg} />}
                label={name}
                clickable
                onClick={handleChipClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { signOut(); }}><FiLogOut />&nbsp;Logout</MenuItem>
            </Menu>
        </>
    );
}