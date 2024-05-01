import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function App() {
    const username : string = 'bmsohwinc';
    return (
        <div style={{
            width: '100%',
            // backgroundColor: "cornflowerblue",
            height: '100%',
        }}>
            <Grid container spacing={2} height='100%'>
                <Grid item xs={3}>
                    <Item>History</Item>
                </Grid>
                <Grid item xs={9} container spacing={2} height='100%'>
                    <Grid item xs={12}>
                        <Item>{`@${username}`}</Item>
                    </Grid>
                    <Grid item xs={6} height='100%'>
                        <div style={{
                            overflowY: 'scroll',
                            height: '90%',
                        }}>
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
                        </div>
                    </Grid>
                    <Grid item xs={6} height='100%'>
                        <Item>xs=4</Item>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}