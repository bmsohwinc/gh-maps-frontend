import { Grid, IconButton, Snackbar } from "@mui/material";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';

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
                </Grid>
                <Grid item xs={2} height='100%' sx={{ textAlign: 'right', fontSize: 25 }}>
                    <a href="https://github.com/bmsohwinc/gh-maps-frontend" target="_blank">
                        <GitHubIcon fontSize="large" />
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