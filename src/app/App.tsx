import { getInitialUserDataState } from "./utils";
import { useState } from "react";
import { useImmer } from "use-immer";
import TopBar from "./bars/TopBar";
import StatsBar from "./bars/StatsBar";
import BottomBar from "./bars/BottomBar";
import FirsLoadBar from "./bars/FirstLoadBar";

import { FOLLOWERS_BASE_URL, FOLLOWINGS_BASE_URL } from "./consts/const";

export default function App() {

    const [inputUser, setInputUser] = useImmer<string>('');
    const [currentUserState, setCurrentUserState] = useImmer<UserDataState>(getInitialUserDataState());
    const [recentlyViewed, setRecentlyViewed] = useImmer<HistoryCard[]>([]);
    const [dataStore, setDataStore] = useImmer<Map<string, UserDataState>>(new Map<string, UserDataState>());
    const [uniqUsers, setUniqUsers] = useImmer<Map<string, BasicUserInfo>>(new Map<string, BasicUserInfo>());
    const [openToast, setOpenToast] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const upsertUniqueUsers = (userData : CoderCard[]) => {
        setUniqUsers((draft) => {
            userData.forEach((item) => draft.set(item.login, {
                login: item.login,
                avatarUrl: item.avatarUrl,
            }));
        });
    }

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

                    upsertUniqueUsers(data.followingsData);
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

                    upsertUniqueUsers(data.followersData);
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

                    upsertUniqueUsers(data.followingsData);
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

                    upsertUniqueUsers(data.followersData);
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
