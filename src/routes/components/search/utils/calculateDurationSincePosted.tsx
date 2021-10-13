const calculateDurationSincePosted = (createdAt: string): string => {
  const diffInMilliseconds = Date.now() - Date.parse(createdAt);
  let seconds = Math.floor(diffInMilliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(days / 365);

  seconds %= 60;
  months %= 12;
  days %= 30;
  hours %= 24;
  minutes %= 60;

  if (years > 0) {
    return `${years} year(s)`;
  } else if (months > 0) {
    return `${months} month(s)`;
  } else if (days > 0) {
    return `${days} day(s)`;
  } else if (hours > 0) {
    return `${hours} hour(s)`;
  } else if (minutes > 0) {
    return `${minutes} minute(s)`;
  }
  return `${seconds} seconds`;
}

export default calculateDurationSincePosted;
