import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useSettings } from 'src/hooks/useSettings';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { settings, saveSettings } = useSettings();

    const {
        mode,
        language,
    } = settings;
    const handleChange = (field, value) => {
        saveSettings({ ...settings, [field]: value });
      };
      const [name, setName] = React.useState(language)
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{textTransform:'capitalize'}}
            >
                <Image src={name == 'en' ? "/assets/icons/united.png" : "/assets/icons/saudi.png"} alt="En" width={30} height={30} />&nbsp;
                {name}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => (handleClose(), setName('en'), handleChange('language','en'))}>English</MenuItem>
                <MenuItem onClick={() => (handleClose(), setName('ar'), handleChange('language','ar'))}>Arabic</MenuItem>
            </Menu>
        </div>
    );
}
