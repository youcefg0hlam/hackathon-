const URL = 'https://infobrains-bc.onrender.com'
// you can check docs here https://infobrains-bc.onrender.com/docs

const createShortURLHandler = async (url) => {
  try {
    // we will get the token from localstorage now
    const token = localStorage.getItem('token');

    // as you can see now we did add the token in the header
    // we always need to send token in header for any private APIs
    const response = await fetch(`${URL}/private/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': token
      },
      body: JSON.stringify({url})
    })

    // in order to access the response of the api we need to do this
    // here we are getting the json from the api response
    const result = await response.json();
    // if we can't create shortUrl it will return null
    // in most cases it will give you a new URL
    return result?.data?.shortUrl || null;
  } catch (err) {
    console.error(err)
  }
}

const getAllUrlsHandler = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${URL}/private/url`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth': token
      }
    })

    const result = await response.json();
    return result?.data || null;
  } catch (err) {
    console.error(err)
  }
}

const userEmail = localStorage.getItem('email');
const username = localStorage.getItem('name');

console.log(userEmail);
console.log(username);

// don't remove this code,
// copy it in each page you need to block user if he is not logged in
// Note: always put it at the end of your code this syntax called IIFEs
// it will always run first
(
  () => {
    // check if user is logged in otherwise we will return the use to login page
    const token = localStorage.getItem('token')
    if (!token) window.location.href = '../index.html'
  }
)()
