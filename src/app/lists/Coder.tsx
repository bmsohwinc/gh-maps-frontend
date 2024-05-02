import { Grid } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { Item } from "./Item";
import { numberFormatter } from "../utils";


export default function Coder(props) {
    // login, name, avatar, followers
    return (
        <Item onClick={() => props.onClick({login: props.login, avatarUrl: props.avatarUrl})}>
            <Grid item xs={12} container spacing={2} height='100%'>
                <Grid item xs={8} height='100%'>
                    <Grid item xs={12} container spacing={2} height='100%'>
                        <Grid item xs={2} height='100%'>
                            <a
                                href={`https://github.com/${props.login}`} 
                                target="_blank"
                            >
                                <Avatar alt={props.login} src={props.avatarUrl} />
                            </a>
                        </Grid>
                        <Grid item xs={5} height='100%'>
                            <a
                                href={`https://github.com/${props.login}`} 
                                target="_blank"
                            >
                                <h3 style={{paddingTop: 7}}>@{props.login}</h3>
                            </a>
                        </Grid>
                        <Grid item xs={5} height='100%'>
                            <h3>{props.name}</h3>
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid item xs={4} height='100%'>
                    <h3>{numberFormatter.format(props.followers)} Followers</h3>
                </Grid>
            </Grid>
            {/* <a
                href={`https://github.com/${props.login}`} 
                target="_blank"
            >
                <Avatar alt={props.login} src={props.avatarUrl} />
            </a>
            <span>{props.login}</span>
            <span> &middot; {props.name}</span> */}
            
        </Item>
    );
}