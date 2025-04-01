import { IUserCredentials, IUserNameId } from "../Interfaces/UserInterfaces";

const url = "https://studybuddies-g9bmedddeah6aqe7.westus-01.azurewebsites.net/";

// let userCredentials: IUserCredentials;

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