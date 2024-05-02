import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import HeadList from "./HeadList";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function App() {
    const username: string = 'bmsohwinc';
    return (
        <div style={{
            width: '100%',
            // backgroundColor: "cornflowerblue",
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
                        header='History'
                    >
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                        <Item>xs=4</Item>
                    </HeadList>
                </Grid>
                <Grid item xs={9} container spacing={2} height='100%'>
                    <Grid item xs={12}>
                        <div>
                            <h1>
                                {`@${username}`}
                            </h1>
                        </div>
                    </Grid>
                    <Grid item xs={6} height='calc(100% - 30px)'>
                        <HeadList
                            header='Following'
                        >
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                        </HeadList>
                    </Grid>
                    <Grid item xs={6} height='calc(100% - 30px)'>
                        <HeadList
                            header='Followers'
                        >
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                        </HeadList>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}