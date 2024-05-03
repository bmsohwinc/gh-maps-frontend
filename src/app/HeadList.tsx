import { Typography } from "@mui/material";

export default function HeadList(props) {
    return (
        <div className="headlist">
            <div className="headlist-head">
                <Typography variant="h4">{props.header}</Typography>
            </div>
            <div className="headlist-children">
                {props.children}
            </div>
        </div>
    );
}