import { Avatar, Button, Divider, Grid, IconButton, Stack } from "@mui/material";
import { Item } from "../lists/Item";
import ShareIcon from '@mui/icons-material/Share';
import { numberFormatter } from "../utils";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { LISTS_URL } from "../consts/const";
import { useRouter } from "next/navigation";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";


export default function StatsBar(props) {
    const { uniqUsers } = props;
    const router = useRouter();

    const [showLoading, setShowLoading] = useState(false);

    function sendProfiles() {
        setShowLoading(true);

        if (uniqUsers.size === 0) {
            setShowLoading(false);
            return;
        }

        const data = {
            data: Array.from(uniqUsers.values())
        };

        fetch(LISTS_URL, {
            method: "POST",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                router.push(`/list/${data.userListId}`);
            })
            .catch((err) => console.error(err));
    }

    return (
        <Grid item container spacing={2} marginTop={0}>
            <Grid item xs={2.5} height='100%'>
                {showLoading && (<CircularProgress color="success" />)}
                <Item
                    elevation={3}
                    sx={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            textAlign: 'center',
                        }}
                    >
                        Total profiles fetched<br />
                        <h1>{uniqUsers.size}</h1>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <p>Save these profiles!</p>
                            <IconButton size="small" onClick={sendProfiles}>
                                <ShareIcon color='primary' fontSize="small" />
                            </IconButton>
                        </Stack>
                    </div>

                </Item>
            </Grid>

            <Grid item xs={7} height='100%'>
                <Item
                    elevation={3}
                    sx={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={7.5} height='100%'>
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={2}
                            >
                                <a href={`https://github.com/${props.login}`} target="_blank">
                                    <Avatar alt={props.login} src={props.avatarUrl} sx={{ width: 90, height: 90 }} />
                                </a>
                                <div style={{
                                    textAlign: 'left',
                                }}>
                                    <h1>
                                        <a href={`https://github.com/${props.login}`} target="_blank">
                                            @{props.login}
                                        </a>
                                    </h1>
                                    <p>{props.name}</p>
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={4.5} height='100%' >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent='space-between'
                                gap={1}
                                width={'100%'}
                            >
                                <Divider sx={{ height: 72, m: 0.5 }} orientation="vertical" />
                                <div style={{
                                    // width: 80
                                    minWidth: 80,
                                }}>
                                    <h1>{numberFormatter.format(props.totalFollowings)}</h1>
                                    <p>Total</p>
                                    <p>Followings</p>
                                </div>
                                <div style={{
                                    // width: 80
                                    minWidth: 80,
                                }}>
                                    <h1>{numberFormatter.format(props.totalFollowers)}</h1>
                                    <p>Total</p>
                                    <p>Followers</p>
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>

                </Item>
            </Grid>

            <Grid item xs={2.5} height='100%' sx={{ textAlign: 'right' }}>
                <Button
                    onClick={props.fetchData}
                    size="large"
                    style={{
                        textTransform: 'none'
                    }}
                    sx={{
                        height: 100,
                        marginTop: 1,
                    }}
                >
                    Load more Connections
                    <RotateRightIcon fontSize="large" />
                </Button>
            </Grid>
        </Grid >
    );
}