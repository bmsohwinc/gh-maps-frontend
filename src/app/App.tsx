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

    const [currentUserState, setCurrentUserState] = useImmer<UserDataState>(getInitialUserDataState());
    const [recentlyViewed, setRecentlyViewed] = useImmer<HistoryCard[]>([]);

    function handleUserInputChange(e) {
        setCurrentUserState((draft) => {
            draft.login = e.target.value;
        });
    }

    function handleCoderClick(clickedUser: HistoryCard) {
        if (clickedUser.login === currentUserState.login) {
            return;
        }

        setRecentlyViewed((draft) => {
            draft.unshift(clickedUser);
        });
    }

    function fetchData() {
        fetch(`${BASE_URL}/?login=${currentUserState.login}&afterPage=${currentUserState.followingsPage.afterPage}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCurrentUserState((draft) => {
                draft.followingsData.push(...processors.processFollowings(data.user.following.nodes));
                draft.followingsPage = {
                    afterPage: data.user.following.pageInfo.endCursor,
                    hasNextPage: data.user.following.pageInfo.hasNextPage,
                };
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
                    <HeadList
                        header='Recently Viewed'
                    >
                        {
                            recentlyViewed.map((item, idx) => (
                                <HistoryItem key={`${item.login}-${idx}`} {...item} />
                            ))
                        }
                    </HeadList>
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
                                    value={`${currentUserState.login}`} 
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
                                    disabled={!currentUserState.followingsPage.hasNextPage || (currentUserState.login === '')}
                                >
                                    GO
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} height='calc(100% - 30px)'>
                        <HeadList
                            header='Following'
                        >
                            {
                                currentUserState.followingsData.map((following, idx) => (
                                    <Coder onClick={handleCoderClick} key={`${following.login}-${idx}`} {...following} />
                                ))
                            }
                        </HeadList>
                    </Grid>
                    <Grid item xs={6} height='calc(100% - 30px)'>
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