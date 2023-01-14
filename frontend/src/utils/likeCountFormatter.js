export const formatLikeCount = (likeCount) => {
   let formattedCount;

   if (likeCount > 999) {
      formattedCount = `${Math.floor10((likeCount / 1000.0), -1)}k`;
   } else {
      formattedCount = likeCount;
   }

   return formattedCount;
}