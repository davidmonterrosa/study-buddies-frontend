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

export const formatPostTimeStamp = (timeStamp: string) => {
  const dateTimeObject = new Date(timeStamp);
  return  dateTimeObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}