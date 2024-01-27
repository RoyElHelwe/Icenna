import * as React from 'react';
import { useSettings } from 'src/hooks/useSettings';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



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

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        direction: language == 'ar' ? 'rtl' : 'ltr',
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    content: `${language == 'ar' ? "'En'" : "'Ar'"}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
            width: 32,
            height: 32,
            '&::before': {
                content: "'En'",
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2,
        },
    }));
    const handleChange = (field, value) => {
        saveSettings({ ...settings, [field]: value });
    };
    const [name, setName] = React.useState(language)
    const [dark, setDark] = React.useState(false);
    return (
        <div>
            {/* <Button
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
            </Menu> */}

            <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange={
                    () => {
                        if (name == 'en') {
                            setName('ar')
                            handleChange('language', 'ar')
                        } else {
                            setName('en')
                            handleChange('language', 'en')
                        }
                    }
                } />}
            />

        </div>
    );
}
