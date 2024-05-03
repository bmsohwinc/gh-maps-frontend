import { Grid, IconButton, Snackbar, Stack } from "@mui/material";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import { PinDrop } from "@mui/icons-material";

export default function TopBar(props) {
    const {
        inputUser,
        handleUserInputChange,
        fetchData,
        openToast,
        handleToastClose
    } = props;

    return (
        <>
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
                            <span style={{ fontSize: 16 }}>Fork on </span>
                        </Stack>

                    </a>
                </Grid>
            </Grid>
            <Snackbar
                open={openToast}
                autoHideDuration={3000}
                onClose={handleToastClose}
                message="User doesn't exist!"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </>
    );
}