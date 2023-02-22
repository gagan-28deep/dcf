import Cookies from 'js-cookie';

export const setUserCookie = (user) => {
  Cookies.set('DoctorFrontToken', JSON.stringify(user), { expires: 1, sameSite: 'strict', secure: false });
};

export const getUser = async () => {
  const user = await Cookies.get('DoctorFrontToken');
  if (user) {
    const userData = JSON.parse(user);
    return userData;
  }
  return null;
};

export const getUserToken = async () => {
  const user = await Cookies.get('DoctorFrontToken');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

export const removeUserData = async () => {
  await Cookies.remove('DoctorFrontToken');
};