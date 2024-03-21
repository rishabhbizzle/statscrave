export const millisecondsToMinutesSeconds = (duration_ms) => {
  let seconds = Math.floor(duration_ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  // Format the result as minutes:seconds
  let formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  return formattedDuration;
}

export const getLatestDateValue = (data) => {
  try {
    let maxDate = null;
    let maxValue = null;

    for (const dateStr in data) {
      // Parsing the date string in the format "DD-MM-YYYY"
      const parts = dateStr.split('-');
      const currentDate = new Date(`${parts[1]}-${parts[0]}-${parts[2]}`);
      const value = data[dateStr];

      if (!isNaN(currentDate.getTime()) && (maxDate === null || currentDate > maxDate)) {
        maxDate = currentDate;
        maxValue = value;
      }
    }
    return maxValue;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC' // Set the time zone as per your requirement
  };
  return date.toLocaleString('en-US', options);
}