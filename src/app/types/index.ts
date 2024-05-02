type nString = null | String;

interface HistoryCard {
    login: String,
    avatarUrl: String,
}

interface GHPage {
    afterPage: nString,
    hasNextPage: Boolean,
}

interface CoderCard {
    login: String,
    name: nString,
    avatarUrl: String,
    followers: Number,
}

interface UserDataState {
    login: String,
    name: nString,
    avatarUrl: String,
    totalFollowings: Number,
    totalFollowers: Number,
    followingsData: CoderCard[],
    followersData: CoderCard[],
    followingsPage: GHPage,
    followersPage: GHPage,
}
