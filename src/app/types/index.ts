type nString = null | string;

interface BasicUserInfo {
    login: string,
    avatarUrl: string,
}

interface HistoryCard {
    login: string,
    avatarUrl: string,
    onClick?: (any) => any,
}

interface GHPage {
    afterPage: nString,
    hasNextPage: boolean,
}

interface CoderCard {
    login: string,
    name: nString,
    avatarUrl: string,
    followers: number,
}

interface UserDataState {
    login: string,
    name: nString,
    avatarUrl: string,
    totalFollowings: number,
    totalFollowers: number,
    followingsData: CoderCard[],
    followersData: CoderCard[],
    followingsPage: GHPage,
    followersPage: GHPage,
}
