import { Grid, Stack, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { Item } from "./Item";
import { numberFormatter } from "../utils";


export default function Coder(props) {
    // login, name, avatar, followers
    return (
        <Item
            onClick={() => props.onClick({ login: props.login, avatarUrl: props.avatarUrl })}
            sx={{
                width: '97%',
            }}
        >
            <Grid item xs={12} container spacing={2} height='100%'>
                <Grid item xs={7} height='100%'>
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
                            <Typography variant="h6">
                                <a href={`https://github.com/${props.login}`} target="_blank">
                                    @{props.login}
                                </a>
                            </Typography>
                            {props.name ?? <div>&middot;</div>}
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={5} height='100%'>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={2}
                    >
                        <div>
                            <Typography variant="h6">
                                {numberFormatter.format(props.followings)}
                            </Typography>
                            Followings
                        </div>
                        <div>
                            <Typography variant="h6">
                                {numberFormatter.format(props.followers)}
                            </Typography>
                            Followers
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        </Item>
    );
}