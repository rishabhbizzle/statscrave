export const millisecondsToMinutesSeconds = (duration_ms) => {
    let seconds = Math.floor(duration_ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    // Format the result as minutes:seconds
    let formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    return formattedDuration;
  }