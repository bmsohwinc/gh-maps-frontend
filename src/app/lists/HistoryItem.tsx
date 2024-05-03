import { Avatar, Grid } from "@mui/material";
import { Item } from "./Item";

export default function HistoryItem(props : HistoryCard) {
    return (
        <Item 
            onClick={() => props.onClick({
                login: props.login,
                avatarUrl: props.avatarUrl,
            })}
            style={{
                textAlign: 'left',
                cursor: 'pointer',
            }}
        >
            <Grid item xs={12} container spacing={2} height='100%'>
                <Grid item xs={2} height='100%'>
                    <Avatar alt={props.login} src={props.avatarUrl} sx={{width: 24, height: 24}} />
                </Grid>
                <Grid item xs={9} height='100%'>
                    @{props.login}
                </Grid>
            </Grid>
        </Item>
    );
}