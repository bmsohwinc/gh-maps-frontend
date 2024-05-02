import { Grid } from "@mui/material";
import HeadList from "./HeadList";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { Item } from "./lists/Item";
import Coder from "./lists/Coder";

import { dummyData } from "./const";
import { getInitialUserDataState, processors } from "./utils";
import { useState } from "react";
import { useImmer } from "use-immer";
import HistoryItem from "./lists/HistoryItem";

const BASE_URL = 'http://localhost:3001';




export default function App() {

    const [inputUser, setInputUser] = useImmer<String>('');
    const [currentUserState, setCurrentUserState] = useImmer<UserDataState>(getInitialUserDataState());
    const [recentlyViewed, setRecentlyViewed] = useImmer<HistoryCard[]>([]);
    const [dataStore, setDataStore] = useImmer<Map<String, UserDataState>>(new Map<String, UserDataState>());
    const [uniqUsers, setUniqUsers] = useImmer<Set<String>>(new Set<String>());

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
            fetch(`${BASE_URL}/?login=${clickedUser.login}&afterPage=null`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const processedData = processors.processFollowings(data.user.following.nodes);
                    setCurrentUserState((draft) => {
                        draft.login = clickedUser.login;
                        draft.avatarUrl = data.user.avatarUrl;
                        draft.name = data.user.name;
                        draft.followingsData = processedData;
                        draft.followingsPage = {
                            afterPage: data.user.following.pageInfo.endCursor,
                            hasNextPage: data.user.following.pageInfo.hasNextPage,
                        };
                    });

                    setUniqUsers((draft) => {
                        processedData.forEach(item => draft.add(item.login));
                    });
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

        if (!currentUserState.followingsPage.hasNextPage) {
            return;
        }

        fetch(`${BASE_URL}/?login=${currentUserState.login}&afterPage=${currentUserState.followingsPage.afterPage}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const processedData = processors.processFollowings(data.user.following.nodes);
                setCurrentUserState((draft) => {
                    draft.followingsData.push(...processedData);
                    draft.followingsPage = {
                        afterPage: data.user.following.pageInfo.endCursor,
                        hasNextPage: data.user.following.pageInfo.hasNextPage,
                    };
                });
                setUniqUsers((draft) => {
                    processedData.forEach(item => draft.add(item.login));
                });
            });
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <AppBar
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
                        Git Hub Network Visualizer
                    </Typography>
                    <Button color="inherit">Star on GitHub</Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} height='calc(100% - 64px)' marginTop={2}>
                <Grid item xs={3} height='100%'>
                    <Grid item xs={9} container spacing={2} height='100%'>
                        <Grid item xs={12} height='77px'>
                            <div
                                style={{
                                    // fontSize: 5
                                    textAlign: 'center'
                                }}
                            >
                                Total profiles browsed<br/> 
                                <h1>{uniqUsers.size}</h1>
                            </div>
                        </Grid>
                        <Grid item xs={12} height='calc(100% - 40px)'>
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
                        <HeadList
                            header='Following'
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
                    </Grid>
                    <Grid item xs={6} height='calc(100% - 40px)'>
                        <HeadList
                            header='Followers'
                        >
                            {[...Array(10).keys()].map(key => (<Item key={key}>xs=4</Item>))}
                        </HeadList>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}