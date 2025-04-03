export interface ICommunityData {
    id: number
    communityOwnerId: number
    communityIsCommunityOwner: boolean
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

interface CommunityMember {
    id: number
    userId: number
    role: string
}


export interface IUserCredentials {
    username: string
    password: string
}

export interface IUserNameId {
    id: number
    username: string
}

export interface Itoken {
    token: string
}