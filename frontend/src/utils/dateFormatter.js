export const formatUploadDate = date => {
   const then = new Date(date);
   const now = new Date();

   let timeText;
   let timeDiff;
   let timeElapsed = (now - then) / 1000;

   if (Math.round(timeElapsed / 31540000) >= 1) {
      timeDiff = Math.round(timeElapsed /= 31540000);
      timeText = timeDiff === 1 ? "year" : "years";
   } else if (Math.round(timeElapsed / 2628000) >= 1) {
      timeDiff = Math.round(timeElapsed /= 2628000);
      timeText = timeDiff === 1 ? "month" : "months";
   } else if (Math.round(timeElapsed / 86400) >= 1) {
      timeDiff = Math.round(timeElapsed /= 86400);
      timeText = timeDiff === 1 ? "day" : "days"
   } else if (Math.round(timeElapsed / 3600) >= 1) {
      timeDiff = Math.round(timeElapsed /= 3600);
      timeText = timeDiff === 1 ? "hour" : "hours"
   } else {
      timeDiff = Math.round(timeElapsed /= 60);
      timeText = timeDiff === 1 ? "minute" : "minutes"
   }

   return `${timeDiff} ${timeText} ago`;
}