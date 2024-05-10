import { PinDrop } from '@mui/icons-material';
import { Grid, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { propagateServerField } from 'next/dist/server/lib/render-server';

export default function TopBar(props) {
    return (
        <Grid container spacing={2}>
                <Grid item xs={2} height='100%'>
                    <a href="/">
                        <Stack
                            direction="row"
                            alignItems="center"
                            // justifyContent='space-between'
                            gap={1}
                            width={'100%'}
                        >
                            <PinDrop fontSize="large" />
                            <b style={{ fontSize: 21 }} >gh-navigator</b>
                        </Stack>
                    </a>
                </Grid>
                <Grid item xs={8} height='100%' sx={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <h1>User List: {props.userListId}</h1>
                </Grid>
                <Grid item xs={2} height='100%' sx={{ textAlign: 'right', fontSize: 25 }}>
                    <a href="https://github.com/bmsohwinc/gh-maps-frontend" target="_blank">
                        <Stack
                            direction="row-reverse"
                            alignItems="center"
                            // justifyContent='space-between'
                            gap={1}
                            width={'100%'}
                        >
                            <GitHubIcon fontSize="large" />
                            <span style={{ fontSize: 16 }}>Check on </span>
                        </Stack>
                    </a>
                </Grid>
            </Grid>
    );
}