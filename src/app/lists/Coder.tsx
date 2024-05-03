import { Grid, Stack } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { Item } from "./Item";
import { numberFormatter } from "../utils";


export default function Coder(props) {
    // login, name, avatar, followers
    return (
        <Item
            onClick={() => props.onClick({ login: props.login, avatarUrl: props.avatarUrl })}
            sx={{
                width: '96%',
                cursor: 'pointer',
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
                            <h3>
                                <a href={`https://github.com/${props.login}`} target="_blank">
                                    @{props.login}
                                </a>
                            </h3>
                            <p>{props.name ?? <div>&middot;</div>}</p>
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
                            <h3>
                                {numberFormatter.format(props.followings)}
                            </h3>
                            <p style={{marginTop: 2}}>Followings</p>
                        </div>
                        <div>
                            <h3>
                                {numberFormatter.format(props.followers)}
                            </h3>
                            <p style={{marginTop: 2}}>Followers</p>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        </Item>
    );
}