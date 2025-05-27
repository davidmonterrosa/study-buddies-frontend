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
    communityChats: CommunityChats[]
    communityMembers: CommunityMember[]
    communityRequests: number[]
    communityDifficulty: string
    communityDescription: string
}

export interface CommunityMember {
    id: number
    userId: number
    role: string
    firstName: string
    lastName: string
}

export interface CommunityChats {
    id: number
    userIdSender: number
    userSenderName: string
    message: string
    timestamp: string
    mediaUrl: string | null
    isDeleted: boolean
    isPinned: boolean
    isEdited: boolean
}

export interface DirectMessages {
    id: number 
    senderId: number 
    receiverId: number 
    message: string 
    attachmentUrl: string | null
    dateTime: string 
    isRead: boolean 
    recieverRead: boolean 
    isDeleted: boolean 
    deletedAt: string
    isEdited: boolean 
    editedAt: string | null
}



export interface IUserCredentials {
    username: string
    firstName: string
    lastName: string
    password: string
}

export interface IUserNameId {
    success: boolean
    user: {
        id: number
        username: string
        firstName: string
        lastName: string    
        ownedCommunitys: number[]
        joinedCommunitys: number[]
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