import { Grid } from "@mui/material";
import { Item } from "../lists/Item";
import HeadList from "../HeadList";
import HistoryItem from "../lists/HistoryItem";
import { numberFormatter } from "../utils";
import Coder from "../lists/Coder";

export default function BottomBar(props) {
    const {
        recentlyViewed,
        totalFollowings,
        followingsData,
        totalFollowers,
        followersData,
        handleCoderClick,
    } = props;

    return (
        <Grid item container spacing={2} height='calc(100% - 125px)'>
            <Grid item xs={3} height='100%'>
                <Item
                    elevation={3}
                    sx={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <HeadList header='History'>
                        {
                            recentlyViewed.map((item, idx) => (
                                <HistoryItem
                                    onClick={handleCoderClick}
                                    key={`${item.login}-${idx}`}
                                    {...item}
                                />
                            ))
                        }
                    </HeadList>
                </Item>
            </Grid>
            <Grid item xs={4.5} height='100%'>
                <Item
                    elevation={3}
                    sx={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <HeadList
                        header={`Following (${numberFormatter.format(followingsData.length)} / ${numberFormatter.format(totalFollowings)})`}
                    >
                        {
                            followingsData.map((following, idx) => (
                                <Coder
                                    onClick={handleCoderClick}
                                    key={`${following.login}-${idx}`}
                                    {...following}
                                />
                            ))
                        }
                    </HeadList>
                </Item>
            </Grid>
            <Grid item xs={4.5} height='100%'>
                <Item
                    elevation={3}
                    sx={{
                        height: '100%',
                        wdith: '100%',
                    }}
                >
                    <HeadList
                        header={`Followers (${numberFormatter.format(followersData.length)} / ${numberFormatter.format(totalFollowers)})`}
                    >
                        {
                            followersData.map((follower, idx) => (
                                <Coder
                                    onClick={handleCoderClick}
                                    key={`${follower.login}-${idx}`}
                                    {...follower}
                                />
                            ))
                        }
                    </HeadList>
                </Item>
            </Grid>
        </Grid>
    );
}