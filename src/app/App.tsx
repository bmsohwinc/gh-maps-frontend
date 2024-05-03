import { Grid, IconButton, Snackbar } from "@mui/material";
import HeadList from "./HeadList";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';


import { Item } from "./lists/Item";
import Coder from "./lists/Coder";

import { dummyData } from "./const";
import { getInitialUserDataState, numberFormatter } from "./utils";
import { useState } from "react";
import { useImmer } from "use-immer";
import HistoryItem from "./lists/HistoryItem";



const BASE_URL = 'http://localhost:3001';
const FOLLOWINGS_BASE_URL = `${BASE_URL}/followings`;
const FOLLOWERS_BASE_URL = `${BASE_URL}/followers`;




export default function App() {

    const [inputUser, setInputUser] = useImmer<String>('');
    const [currentUserState, setCurrentUserState] = useImmer<UserDataState>(getInitialUserDataState());
    const [recentlyViewed, setRecentlyViewed] = useImmer<HistoryCard[]>([]);
    const [dataStore, setDataStore] = useImmer<Map<String, UserDataState>>(new Map<String, UserDataState>());
    const [uniqUsers, setUniqUsers] = useImmer<Set<String>>(new Set<String>());
    const [openToast, setOpenToast] = useState(false);

    const handleToastClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };

    function handleUserInputChange(e) {
        setInputUser(e.target.value.trim());
    }

    function handleCoderClick(clickedUser: HistoryCard) {
        console.log(`Clicked for ${clickedUser}`);
        if (clickedUser.login === currentUserState.login) {
            return;
        }

        // Save current user
        if (currentUserState.login !== '') {
            setRecentlyViewed((draft) => {
                draft.unshift({
                    login: currentUserState.login,
                    avatarUrl: currentUserState.avatarUrl,
                });
            });

            setDataStore((draft) => {
                draft.set(currentUserState.login, currentUserState);
            });
        }

        setInputUser(clickedUser.login);

        if (dataStore.has(clickedUser.login)) {
            setCurrentUserState((draft) => {
                return dataStore.get(clickedUser.login);
            });
        } else {
            fetch(`${FOLLOWINGS_BASE_URL}/?login=${clickedUser.login}&afterPage=null`)
                .then(res => {
                    const data = res.json();
                    if (!res.ok) {
                        throw new Error('User not found', { cause: data });
                    } else {
                        return data;
                    }
                })
                .then((jsonData) => {
                    const { data } = jsonData;
                    console.log(data);
                    setCurrentUserState((draft) => {
                        draft.login = clickedUser.login;
                        draft.avatarUrl = data.avatarUrl;
                        draft.name = data.name;
                        draft.totalFollowings = data.totalFollowings;
                        draft.followingsData = data.followingsData;
                        draft.followingsPage = data.followingsPage;
                    });

                    setUniqUsers((draft) => {
                        data.followingsData.forEach(item => draft.add(item.login));
                    });
                })
                .catch((err) => {
                    setInputUser(currentUserState.login);
                    console.log(err);
                    setOpenToast(true);
                });

            fetch(`${FOLLOWERS_BASE_URL}/?login=${clickedUser.login}&afterPage=null`)
                .then(res => {
                    const data = res.json();
                    if (!res.ok) {
                        throw new Error('User not found', { cause: data });
                    } else {
                        return data;
                    }
                })
                .then((jsonData) => {
                    const { data } = jsonData;
                    console.log(data);
                    setCurrentUserState((draft) => {
                        draft.totalFollowers = data.totalFollowers;
                        draft.followersData = data.followersData;
                        draft.followersPage = data.followersPage;
                    });

                    setUniqUsers((draft) => {
                        data.followersData.forEach(item => draft.add(item.login));
                    });
                })
                .catch((err) => {
                    setInputUser(currentUserState.login);
                    console.log(err);
                    setOpenToast(true);
                });
        }
    }

    function fetchData() {

        if (inputUser === '') {
            return;
        }

        if (inputUser !== currentUserState.login) {
            handleCoderClick({
                login: inputUser,
                avatarUrl: '',
            });
            return;
        }

        if (currentUserState.followingsPage.hasNextPage) {
            fetch(`${FOLLOWINGS_BASE_URL}/?login=${currentUserState.login}&afterPage=${currentUserState.followingsPage.afterPage}`)
                .then(res => {
                    const data = res.json();
                    if (!res.ok) {
                        throw new Error('User not found', { cause: data });
                    } else {
                        return data;
                    }
                })
                .then((jsonData) => {
                    const { data } = jsonData;
                    console.log(data);
                    setCurrentUserState((draft) => {
                        draft.totalFollowings = data.totalFollowings;
                        draft.followingsData.push(...data.followingsData);
                        draft.followingsPage = data.followingsPage;
                    });
                    setUniqUsers((draft) => {
                        data.followingsData.forEach(item => draft.add(item.login));
                    });
                });
        }

        if (currentUserState.followersPage.hasNextPage) {
            fetch(`${FOLLOWERS_BASE_URL}/?login=${currentUserState.login}&afterPage=${currentUserState.followersPage.afterPage}`)
                .then(res => {
                    const data = res.json();
                    if (!res.ok) {
                        throw new Error('User not found', { cause: data });
                    } else {
                        return data;
                    }
                })
                .then((jsonData) => {
                    const { data } = jsonData;
                    console.log(data);
                    setCurrentUserState((draft) => {
                        draft.totalFollowers = data.totalFollowers;
                        draft.followersData.push(...data.followersData);
                        draft.followersPage = data.followersPage;
                    });

                    setUniqUsers((draft) => {
                        data.followersData.forEach(item => draft.add(item.login));
                    });
                });
        }
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            {/* <AppBar
                position="static"
                color="info"
                sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    height: 64,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Search GitHub Connections of user @
                        <input
                            value={`${inputUser}`}
                            onChange={handleUserInputChange}
                            placeholder="Username..."
                            style={{
                                backgroundColor: 'transparent',
                                border: '0px',
                                outlineColor: 'transparent',
                            }}
                        />
                        <Button
                            color='success'
                            variant='contained'
                            onClick={fetchData}
                            disabled={inputUser === ''}
                        >
                            GO!
                        </Button>
                    </Typography>
                    <div>Hi!</div>
                </Toolbar>
                <Snackbar
                    open={openToast}
                    autoHideDuration={3000}
                    onClose={handleToastClose}
                    message="User doesn't exist!"
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                />
            </AppBar> */}
            {/* <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}> */}
            <Grid container spacing={2}>
                <Grid item xs={2} height='100%'>
                    <b style={{ fontSize: 25 }} >gh-navigator</b>
                </Grid>
                <Grid item xs={8} height='100%' sx={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Look up a GitHub user..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            value={inputUser}
                            onChange={handleUserInputChange}
                        />
                        <IconButton 
                            type="button" 
                            sx={{ p: '10px' }}
                            aria-label="search"
                            onClick={fetchData}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    {/* <input
                        value={`${inputUser}`}
                        onChange={handleUserInputChange}
                        placeholder="Search for a GitHub user"
                        style={{
                            fontSize: 25,
                            // backgroundColor: 'transparent',
                            border: '0px',
                            borderRadius: '5px',
                            padding: 4,
                            outlineColor: 'transparent',
                        }}
                    />
                    &nbsp;
                    <IconButton
                        onClick={fetchData}
                        size="medium"
                        disabled={inputUser === ''}
                        color="primary"
                        sx={{
                            marginTop: -1,
                        }}
                    >
                        <SearchIcon />
                    </IconButton> */}
                    {/* <Button
                        color='success'
                        size="small"
                        variant='contained'
                        sx={{
                            fontSize: 12,
                        }}
                        onClick={fetchData}
                        disabled={inputUser === ''}
                    >
                        GO
                    </Button> */}
                </Grid>
                <Grid item xs={2} height='100%' sx={{ textAlign: 'right', fontSize: 25 }}>
                    <a href="https://github.com/bmsohwinc/gh-maps-frontend" target="_blank">
                        <GitHubIcon />
                    </a>
                </Grid>
            </Grid>
            {/* </Typography> */}
            <Snackbar
                open={openToast}
                autoHideDuration={3000}
                onClose={handleToastClose}
                message="User doesn't exist!"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
            <Grid container spacing={2} height='calc(100% - 64px)' marginTop={2}>
                <Grid item xs={3} height='100%'>
                    <Grid item xs={9} container spacing={2} height='100%'>
                        <Grid item xs={12} height='77px'>
                            <Item
                                elevation={3}
                                sx={{
                                    height: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        // fontSize: 5
                                        textAlign: 'center'
                                    }}
                                >
                                    Total profiles browsed<br />
                                    <h1>{uniqUsers.size}</h1>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12} height='calc(100% - 40px)'>
                            <Item
                                elevation={3}
                                sx={{
                                    height: '100%',
                                }}
                            >
                                <HeadList
                                    header='History'
                                >
                                    {
                                        recentlyViewed.map((item, idx) => (
                                            <HistoryItem
                                                onClick={handleCoderClick}
                                                key={`${item.login}-${idx}`}
                                                {...item}
                                            />
                                        ))
                                    }
                                </HeadList>
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9} container spacing={2} height='100%'>
                    <Grid item xs={12}>
                        <Grid item xs={12} container spacing={2} height='100%'>
                            <Grid item xs={10}>
                                <span
                                    style={{
                                        fontSize: 50
                                    }}
                                >@</span>
                                <input
                                    value={`${inputUser}`}
                                    onChange={handleUserInputChange}
                                    placeholder="Username..."
                                    style={{
                                        fontSize: 50,
                                        backgroundColor: 'transparent',
                                        border: '0px',
                                        outlineColor: 'transparent',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    color='success'
                                    variant='contained'
                                    sx={{
                                        fontSize: 25,
                                    }}
                                    onClick={fetchData}
                                    disabled={inputUser === ''}
                                >
                                    GO
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} height='calc(100% - 40px)'>
                        <Item
                            elevation={3}
                            sx={{
                                height: '100%',
                            }}
                        >
                            <HeadList
                                header={`Following (${numberFormatter.format(currentUserState.followingsData.length)} / ${numberFormatter.format(currentUserState.totalFollowings)})`}
                            >
                                {
                                    currentUserState.followingsData.map((following, idx) => (
                                        <Coder
                                            onClick={handleCoderClick}
                                            key={`${following.login}-${idx}`}
                                            {...following}
                                        />
                                    ))
                                }
                            </HeadList>
                        </Item>
                    </Grid>
                    <Grid item xs={6} height='calc(100% - 40px)'>
                        <Item
                            elevation={3}
                            sx={{
                                height: '100%',
                            }}
                        >
                            <HeadList
                                header={`Followers (${numberFormatter.format(currentUserState.followersData.length)} / ${numberFormatter.format(currentUserState.totalFollowers)})`}
                            >
                                {
                                    currentUserState.followersData.map((follower, idx) => (
                                        <Coder
                                            onClick={handleCoderClick}
                                            key={`${follower.login}-${idx}`}
                                            {...follower}
                                        />
                                    ))
                                }
                            </HeadList>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
