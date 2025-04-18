import { ICommunityData, IUserCredentials, IUserNameId } from "../Interfaces/UserInterfaces";

const url = "https://studybuddies-g9bmedddeah6aqe7.westus-01.azurewebsites.net/";

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
    return userData;
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
    console.log(data);
    return data;
}

export const getMyCommunities = async (userId: number, token: string) => {
    console.log(userId, token)
    console.log("Community Fetch line 100")
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
    console.log("getMyCommunities(left sidebar):", data);
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

// export const deleteCommunity = async (community: ICommunityData, token: string) => {
//     const response = await fetch (`${url}CommunityControllers/`)
// }

export const getToken = () => {
    return localStorage.getItem("Token") ?? "";
}

