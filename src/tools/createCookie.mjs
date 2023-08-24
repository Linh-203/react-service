export const setCookie = (cookieName, cookieValue, exday) => {
   const day = new Date();
   //convert number of days from day to ms
   day.setTime(day.getTime() + exday * 24 * 60 * 60 * 1000);
   let expire = 'expires=' + day.toUTCString();
   return { cookieName, cookieValue, expire };
};
