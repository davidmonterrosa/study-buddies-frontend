const url = "https://study-buddys-backend.azurewebsites.net/DirectMessages/";

export const getAllDirectMessages = async (userId: number, token: string) => {
    const response = await fetch(`${url}getAllUsersChats/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return [];
    }
    const data = await response.json();
    console.log(data);
    return data;
};

// You define payload builder outside
export const buildDirectMessagePayload = (
    senderId: number,
    receiverId: number,
    message: string,
    attachmentUrl: string = "none"
) => ({
    senderId,
    receiverId,
    message,
    attachmentUrl,
    dateTime: new Date().toISOString(),
    isRead: false,
    recieverRead: false,
    isDeleted: false,
    deletedAt: null,
    isEdited: false,
    editedAt: null
});

export const postDirectMessage = async (
    payload: ReturnType<typeof buildDirectMessagePayload>,
    token: string
) => {
    const response = await fetch(`${url}PostDirectMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error sending message:", errorData);
        throw new Error(errorData.message || "Failed to send message");
    }

    const data = await response.json();
    console.log("Message sent successfully:", data);
    return data;
};
