import { Grid, Typography } from "@mui/material";

export default function HeadList(props) {
    return (
        <Grid item xs={12} container spacing={2} height='100%'>
            <Grid item xs={12}>
                <h1>{props.header}</h1>
            </Grid>
            <Grid item xs={12} height='calc(100% - 40px)' overflow='scroll'>
                {props.children}
            </Grid>
        </Grid>
    );
}