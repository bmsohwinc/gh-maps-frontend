import { Grid } from "@mui/material";

export default function FirsLoadBar(props) {
    return (
        <Grid item xs={12} height='calc(100% - 80px)' marginTop={4}>
            <div
                style={{
                    fontSize: 100,
                    textAlign: 'center',
                    color: 'gray'
                }}
            >
                Enter a GitHub username to start navigating
            </div>
        </Grid>
    );
}