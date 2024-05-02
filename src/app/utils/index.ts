export function getInitialUserDataState() : UserDataState {
    return {
        login: '',
        name: null,
        avatarUrl: '',
        totalFollowings: 0,
        totalFollowers: 0,
        followersData: [],
        followingsData: [],
        followingsPage: {
            afterPage: '',
            hasNextPage: true,
        },
        followersPage: {
            afterPage: '',
            hasNextPage: true,
        }
    };
}

function processUserFollowings(data) {
    return data.map(following => ({
        login: following.login,
        name: following.name,
        avatarUrl: following.avatarUrl,
        followers: following.followers.totalCount,
    }));
}

function processUserFollowers(data) {
    return data.map(follower => ({
        login: follower.login,
        name: follower.name,
        avatarUrl: follower.avatarUrl,
        followers: follower.followers.totalCount,
    }));
}

export const processors = {
    processFollowings: processUserFollowings,
    processFollowers: processUserFollowers,
}
