import { IRequestData, IRequestEntry } from "../Interfaces/UserInterfaces";
import { getUserById } from "./DataServices";

export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-[#12D393]'; // Green for Beginner
      case 'Intermediate':
        return 'bg-[#F59E0B]'; // Yellow for Intermediate
      case 'Advanced':
        return 'bg-[#FF5C7F]'; // Red for Advanced
      default:
        return 'bg-[#818CF8] text-white'; // Default color if no difficulty
    }
};

export const getRoleStyling = (role: string) => {
  const roleValue = role.toLowerCase()
    switch (roleValue) {
      case 'owner':
        return 'bg-[#12D393]'; // Green for Beginner
      case 'teacher':
        return 'bg-[#F59E0B]'; // Yellow for Intermediate
      case 'ta':
        return 'bg-[#F59E0B]'; // Yellow for Intermediate
      default:
        return 'bg-[#818CF8] text-white'; // Default color if no difficulty
    }
};

export const capitalizeTitle = (textToUpperCase: string) => {
  if (textToUpperCase.toLowerCase() === 'ta') return 'TA';
  return `${textToUpperCase.toUpperCase().charAt(0)}${textToUpperCase.slice(1)}`;
}

export const formatPostTimeStamp = (timeStamp: string) => {
  const dateTimeObject = new Date(timeStamp);
  return dateTimeObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export const requestCounter = (requestArr: IRequestData[]) => {
  let totalRequests: number = 0;
  requestArr.map(requestItem => {
    totalRequests += requestItem.communityRequestCountNumber;
    console.log(totalRequests)
  })
  return totalRequests;
}

export const getCommunityRequestDetails = async (
  communities: IRequestData[]
): Promise<IRequestEntry[]> => {
  const requestDetails: IRequestEntry[] = [];

  // Flatten all requests with the community name
  for (const community of communities) {
    const { communityId, communityName, communityRequests } = community;

    for (const userId of communityRequests) {
      const userData = await getUserById(userId);

      if (userData && userData.success) {
        requestDetails.push({
          userId: userData.user.id, 
          firstName:  userData.user.firstName,
          lastName: userData.user.lastName,
          communityName: communityName,
          communityId: communityId,
        });
      }
    }
  }

  return requestDetails;
};