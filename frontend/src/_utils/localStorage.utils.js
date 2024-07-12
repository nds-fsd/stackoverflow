const getStorageObject = (key) => {
  const item = localStorage.getItem(key);
  if (item !== null) {
    return JSON.parse(item);
  }
  return null;
};

const setStorageObject = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

const deleteStorageObject = (key) => {
  localStorage.removeItem(key);
};

export const getUserToken = () => {
  const session = getStorageObject('user-session');
  if (session) {
    return session.token;
  }
  return null;
};

export const getUserSession = () => {
  const session = getStorageObject('user-session');
  if (session) {
    console.log('User session from within localStorage utils file:', session); // Logging session
    return session.user;
  }
  return null;
};

export const getUserIdFromToken = () => {
  const token = getUserToken();
  if (token) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    console.log('Decoded token:', decodedPayload); // Logging decoded token
    return decodedPayload.id; // Assuming the user ID is stored in the 'id' field
  }
  return null;
};

export const setUserSession = (sessionData) => {
  console.log('Storing session data:', sessionData); // Logging for debugging
  setStorageObject('user-session', sessionData);
};

export const removeSession = () => {
  deleteStorageObject('user-session');
};
