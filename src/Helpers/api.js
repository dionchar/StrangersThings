export function makeHeaders(token) {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    return headers;
  }
  
  // Function to handle fetch requests with headers
  export async function fetchWithHeaders(url, method = 'GET', body = null, token = null) {
    const headers = makeHeaders(token);
  
    const options = {
      method,
      headers,
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, options);
    const data = await response.json();
  
    return data;
  }