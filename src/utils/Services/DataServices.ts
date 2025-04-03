import { resolve } from "path";
import { ICommunityData, IUserCredentials, IUserNameId } from "../Interfaces/UserInterfaces";

const url = "https://studybuddies-g9bmedddeah6aqe7.westus-01.azurewebsites.net/";

let userData: IUserNameId;

export const createAccount = async (user: IUserCredentials) => {
    console.log(user)
    const response = await fetch(`${url}UserControllers/register`, {
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
    const response = await fetch(`${url}UserControllers/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    });

    if(!response.ok) {
        const data = await response.json();
        console.log("Log in failed: Username or password doesn't match system");
        return null;
    }

    const data = await response.json();
    return data;
}

export const getLoggedInUserData = async (userID: number) => {
    const response = await fetch(`${url}UserControllers/getUserInfo/${userID}`);

    if(!response.ok) {
        const data = await response.json();
        const message = data.message;
        console.log(message);
        return null;
    }

    userData = await response.json();
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

export const createNewCommunity = async (community: ICommunityData, token: string) => {
    const response = await fetch(`${url}CommunityControllers/addCommunity`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + token,
        },
        body:JSON.stringify(community)
    });

    if(!response.ok) {
        
    }
}