export const millisecondsToMinutesSeconds = (duration_ms) => {
  let seconds = Math.floor(duration_ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  // Format the result as minutes:seconds
  let formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  return formattedDuration;
}

export const getLatestDateValue = (data) => {
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
  console.log(maxValue);
  return maxValue;
}