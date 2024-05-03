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
import TopBar from "./bars/TopBar";
import StatsBar from "./bars/StatsBar";
import BottomBar from "./bars/BottomBar";
import FirsLoadBar from "./bars/FirstLoadBar";



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
    const [isFirstLoad, setIsFirstLoad] = useState(true);

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

        if (isFirstLoad) {
            setIsFirstLoad(false);
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
            <TopBar
                inputUser={inputUser}
                handleUserInputChange={handleUserInputChange}
                fetchData={fetchData}
                openToast={openToast}
                handleToastClose={handleToastClose}
            />

            {
                isFirstLoad ? (
                    <FirsLoadBar />
                ) : (
                    <>
                        <StatsBar
                            uniqUsers={uniqUsers}
                            login={currentUserState.login}
                            name={currentUserState.name}
                            avatarUrl={currentUserState.avatarUrl}
                            totalFollowings={currentUserState.totalFollowings}
                            totalFollowers={currentUserState.totalFollowers}
                            fetchData={fetchData}
                        />

                        <BottomBar
                            recentlyViewed={recentlyViewed}
                            followingsData={currentUserState.followingsData}
                            followersData={currentUserState.followersData}
                            totalFollowings={currentUserState.totalFollowings}
                            totalFollowers={currentUserState.totalFollowers}
                            handleCoderClick={handleCoderClick}
                        />
                    </>
                )
            }
        </div>
    );
}
