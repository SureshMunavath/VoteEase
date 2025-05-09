
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import VoterCard from './Voter/VoterCard'; // Adjust the import path accordingly

const Header = () => {
    const navigate = useNavigate();
    const { userInfo, isLoading, setUserInfo } = useContext(UserContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorElLogin, setAnchorElLogin] = useState(null);
    const [anchorElSignup, setAnchorElSignup] = useState(null);
    const [showVoterCard, setShowVoterCard] = useState(false); // State to toggle VoterCard visibility

    const handleLoginMenuClick = (event) => {
        setAnchorElLogin(event.currentTarget);
    };

    const handleLoginMenuClose = () => {
        setAnchorElLogin(null);
    };

    const handleSignupMenuClick = (event) => {
        setAnchorElSignup(event.currentTarget);
    };

    const handleSignupMenuClose = () => {
        setAnchorElSignup(null);
    };

    const handleLogout = () => {
        fetch('http://127.0.0.1:3000/logout', {
            credentials: 'include',
            method: 'POST',
        }).then(() => {
            setUserInfo(null);
            
          localStorage.removeItem("userInfo");

            navigate('/');
        });
    };

    const toggleVoterCard = () => {
        setShowVoterCard(!showVoterCard);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Render loading indicator if data is still being fetched
    }

    const name = userInfo?.user?.username;
    console.log(userInfo);
    //colour  //#4bab98 or 008080

    return (
        <>
       
            <AppBar position="sticky" sx={{ backgroundColor: '#008080' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        VoteEase!
                    </Typography>
                    {name? (
                        <>
                            <Typography variant="body1" sx={{ marginRight: 2 }}>
                                 Hello,{name}
                            </Typography>
                            {/* <IconButton edge="end" color="inherit" onClick={toggleVoterCard}>
                                <Avatar src="/path-to-user-avatar.jpg" />
                            </IconButton> */}
                            <IconButton edge="end" color="inherit" onClick={toggleVoterCard}>
                                    <Avatar
                                        src={
                                        userInfo.userType === 'admin'
                                            ? userInfo.user.adminImage
                                            : userInfo.user.voterImage
                                        }
                                        alt="User Avatar"
                                        sx={{ width: 40, height: 40 }}
                                    />
                            </IconButton>


                            <Tooltip title="Logout">
                                <IconButton edge="end" color="inherit" onClick={handleLogout}>
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={handleLoginMenuClick}>Login</Button>
                            <Menu
                                anchorEl={anchorElLogin}
                                open={Boolean(anchorElLogin)}
                                onClose={handleLoginMenuClose}
                            >
                                <MenuItem onClick={() => { navigate('/voterlogin'); handleLoginMenuClose(); }}>Login as Voter</MenuItem>
                                <MenuItem onClick={() => { navigate('/adminlogin'); handleLoginMenuClose(); }}>Login as Admin</MenuItem>
                            </Menu>
                            <Button color="inherit" onClick={handleSignupMenuClick}>Sign Up</Button>
                            <Menu
                                anchorEl={anchorElSignup}
                                open={Boolean(anchorElSignup)}
                                onClose={handleSignupMenuClose}
                            >
                                <MenuItem onClick={() => { navigate('/votersignup'); handleSignupMenuClose(); }}>Voter Sign Up </MenuItem>
                                {/* <MenuItem onClick={() => { navigate('/adminsignup'); handleSignupMenuClose(); }}>Sign Up as Admin</MenuItem> */}
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            {showVoterCard && userInfo && <VoterCard userInfo={userInfo} />}
        </>
    );
};

export default Header;
