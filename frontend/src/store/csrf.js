const csrfFetch = async (url, options = {}) => {
  options.method ||= 'GET';
  options.headers ||= {};

  if (options.method.toUpperCase() !== 'GET') {
    if (!options.headers['Content-Type'] && !(options.body instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
    }
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
  }

   const res = await fetch(url, options);

   if (res.status >= 400) throw res;

   return res;
};

// export const storeCSRFToken = response => {
//    const csrfToken = response.headers.get("X-CSRF-Token");
//    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
// };

export default csrfFetch;