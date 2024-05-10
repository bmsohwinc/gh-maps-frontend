import { Avatar, Grid, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const DATA_LOAD_STATE = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};

const BASE_URL = 'https://gh-maps-backend.onrender.com/lists';

function UserListItem(props : HistoryCard) {
    return (
        <Paper style={{
            margin: 5,
            // height: '100px',
            padding: 5
        }}>
            <Grid item xs={12} container spacing={2} height='100%'>
                <Grid item xs={12} height='100%'>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={2}
                    >
                        <a href={`https://github.com/${props.login}`} target="_blank">
                            <Avatar alt={props.login} src={props.avatarUrl} sx={{ width: 48, height: 48 }} />
                        </a>
                        <div style={{
                            textAlign: 'left',
                        }}>
                            <h3>
                                <a href={`https://github.com/${props.login}`} target="_blank">
                                    @{props.login}
                                </a>
                            </h3>
                        </div>
                    </Stack>
                </Grid>
                
            </Grid>
        </Paper>
    );
}

export default function ListContent(props) {

    const [data, setData] = useState([]);
    const [dataLoadState, setDataLoadState] = useState(DATA_LOAD_STATE.LOADING);

    useEffect(() => {
        fetch(`${BASE_URL}/?userListId=${props.userListId}`)
                .then(res => {
                    const data = res.json();
                    if (!res.ok) {
                        setDataLoadState(DATA_LOAD_STATE.FAILURE);
                        throw new Error('List not found', { cause: data });
                    } else {
                        return data;
                    }
                })
                .then((jsonData) => {
                    const { data } = jsonData;
                    console.log(data);
                    setData(data);
                    console.log(data);
                    setDataLoadState(DATA_LOAD_STATE.SUCCESS);
                })
                .catch((err) => {
                    setDataLoadState(DATA_LOAD_STATE.FAILURE);
                    console.log(err);
                });
    }, []);

    if (dataLoadState === DATA_LOAD_STATE.LOADING) {
        return (
            <div style={{
                height: '100%',
                width: '100%',
            }}>
                Loading...
            </div>
        );
    }

    if (dataLoadState === DATA_LOAD_STATE.FAILURE) {
        return (
            <div style={{
                height: '100%',
                width: '100%',
            }}>
                Something went wrong 😞!
            </div>
        );
    }

    return (
        <div style={{
            height: '70vh',
            width: '50%',
            margin: 'auto',
            alignItems: 'top',
            overflowY: 'scroll',
        }}>
            {
                data.map((item) => (
                    <UserListItem key={item.login} {...item} />
                ))
            }
        </div>
    );
}