import { useState, MouseEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import userChipType from '../../types/userChipType';
import {FiLogOut} from 'react-icons/fi';
import { signOut } from 'next-auth/react';

export default function LoginUserChip({ profileImg, name }: userChipType) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Chip
                avatar={<Avatar alt="profile" src={profileImg} />}
                label={name}
                clickable
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={()=>{signOut();}}><FiLogOut />&nbsp;Logout</MenuItem>
            </Menu>
        </>
    );
}