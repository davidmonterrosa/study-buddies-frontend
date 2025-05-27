import { CommunityChats, ICommunityData, IUserCredentials, IUserNameId } from "../Interfaces/UserInterfaces";

const url = "https://study-buddys-backend.azurewebsites.net/";

let userData: IUserNameId;
// let displayName: IFirstAndLastName;


export const createAccount = async (user: IUserCredentials) => {
    console.log(user)
    const response = await fetch(`${url}User/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    });

    if(!response.ok) {
        const data = await response.json();
        console.log("Response is not ok");
        return data.success;
    }

    const data = await response.json();
    return data.success;
}

export const login = async (user: IUserCredentials) => {
    const response = await fetch(`${url}User/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    });

    if(!response.ok) {
        // const data = await response.json();
        console.log("Log in failed: Username or password doesn't match system");
        return null;
    }

    const data = await response.json();
    return data;
}

export const getLoggedInUserData = async (userName: string) => {
    const response = await fetch(`${url}User/getUserInfo/${userName}`);

    if(!response.ok) {
        const data = await response.json();
        const message = data.message;
        console.log(message);
        return null;
    }

    userData = await response.json();
    console.log(userData);
    return userData;

}

export const currentUser = () => {
    if(typeof window !== null) {
        const localStorageData = localStorage.getItem("User");
        if(localStorageData != null) {
            return localStorageData
        }
    }
    return "";
}

export const checkToken = () => {
    let result = false;
    if(typeof window !== null) {
        const localStorageData = localStorage.getItem("Token");
        if(localStorageData != null) {
            result = true;
        }
    }
    return result;
}


export const getUserById = async (userId: number) => {
    const response = await fetch(`${url}User/getUserById/${userId}`);
    if(!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = response.json();
    return data
}

export const getAllCommunities = async (token: string) => {
    const response = await fetch(`${url}Community/getAllCommunities`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });
    if(!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return [];
    }
    const data = await response.json();
    return data;
}

export const getMyCommunities = async (userId: number, token: string) => {
    const response = await fetch(`${url}Community/FilterUserIdFromCommunityAsync/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
        }
    });
    if(!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return [];
    }
    const data = await response.json();
    return data;
}

export const getCommunityById = async (communityId: number) => {
    const response = await fetch(`${url}Community/getCommunityById/${communityId}`);
    if(!response.ok) {
        const data = await response.json();
        const message = data.message;
        console.log(message);
        return null;
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export const createNewCommunity = async (community: ICommunityData, token: string) => {
    const response = await fetch(`${url}Community/addCommunity`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body:JSON.stringify(community)
    });

    if(!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = await response.json();
    return data.success;
}

export const upDateCommunity = async (community: ICommunityData, token: string) => {
    const response = await fetch(`${url}Community/updateCommunity`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body:JSON.stringify(community)
    });

    if(!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = await response.json();
    return data.success;
}

export const deleteCommunity = async (community: ICommunityData, token: string) => {
    console.log("This is what was passed to deleteCommunity: ", community);
    if(community === null) {
        console.error("Community Object is ", community)
        return false;
    }
    const response = await fetch (`${url}Community/DeleteCommunity/${community.id}/${community.communityIsDeleted}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    });

    if(!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = await response.json();
    console.log(data)
    return data;
}



export const getToken = () => {
    return localStorage.getItem("Token") ?? "";
}

export const sendCommunityMessage = async (communityId: number, chatContent: CommunityChats, token: string) => {
    const response = await fetch(`${url}Community/CreateCommunityChats/${communityId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token, 
        },
        body:JSON.stringify(chatContent)
    });

    if(!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = await response.json();
    console.log(data)
    return data.success;
}


// ----------------------------- Community Member Management -------------------------------
export const joinCommunity = async (userId: number, communityId: number, token: string) => {
    const addMemberResponse = await fetch(`${url}Community/addMemberToCommunity/${communityId}/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    });

    if(!addMemberResponse.ok) {
        const errorData = await addMemberResponse.json();
        const message = errorData.message;
        console.log(message);
        return false;
    }
        
    return { success: true };
}

export const removeMember = async (userId: number, communityId: number, token: string) => {
    const removeMemberResponse = await fetch(`${url}Community/removeMemberFromCommunity/${communityId}/${userId}`, {
        method: "Delete",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    });
    if(!removeMemberResponse.ok) {
        const errorData = await removeMemberResponse.json();
        const message = errorData.message;
        console.log(message);
        return false;
    }

    const data = removeMemberResponse.json();
    return data;
}

export const changeRole = async (communityId: number, userId: number, role: string, token: string) => {
    const changeRoleResponse = await fetch(`${url}Community/EditCommunityRole/${communityId}/${userId}/${role}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": "Bearer " + token
        },
    });

    if(!changeRoleResponse.ok) {
        const errorData = await changeRoleResponse.json();
        console.log(errorData)
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = await changeRoleResponse.json();
    console.log(data)
    return data;
}

export const requestJoin = async (userId: number, communityId: number, token: string) => {
    const addRequestToCommunity = await fetch(`${url}Community/addRequestToCommunity/${communityId}/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    });

    if(!addRequestToCommunity.ok) {
        const errorData = await addRequestToCommunity.json();
        console.log(errorData)
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = await addRequestToCommunity.json();
    return data;
}

// ----------------------------- Events/Sessions Management -------------------------------
// Add Sessions
export async function createCommunityEvent(eventData: any, token: string) {
    // Creates a new community event
    const response = await fetch(`${url}CommunityEvents/createEvent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
    });
    return response.json();
}

// Deletes a community event by community and event ID
export async function deleteCommunityEvent(communityId: number, eventId: number, token: string) {
    const response = await fetch(`${url}CommunityEvents/deleteEvent/${communityId}/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.json();
}

export const getEventsByCommunityId = async (communityId: number) => {
    const response = await fetch(`${url}CommunityEvents/getEventsByCommunityId/${communityId}`);
    const data = await response.json();
    return data.Events || data.events || data || [];
}