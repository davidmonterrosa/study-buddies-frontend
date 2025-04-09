export interface ICommunityData {
    id: number
    communityOwnerID: number
    isCommunityOwner: boolean
    communityIsPublic: boolean
    communityIsDeleted: boolean
    communityOwnerName: string
    communityName: string
    communitySubject: string
    communityMemberCount: number
    communityMembers: CommunityMember[]
    communityRequests: number[]
    communityDifficulty: string
    communityDescription: string
}

export interface CommunityMember {
    id: number
    userId: number
    role: string
}


export interface IUserCredentials {
    username: string
    password: string
}

export interface IUserNameId {
    success: boolean
    user: {
        id: number
        username: string
        ownedCommunities: number[]
        joinedCommunities: number[]
        communityRequests: number[]
    }
}

// export interface IFirstAndLastName {
//     firstName: string
//     lastName: string
// }

export interface Itoken {
    token: string
}