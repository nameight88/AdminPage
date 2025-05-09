// api/auth.js
import axios from './axiosInstance';

export const login = ({ userID, userPW }) =>
  axios.get('/login', { params: { userID, userPW } });

export const checkUserID = (userID) =>
  axios.get('/searchID', { params: { userID } }).then((res) => res.data);

export const getSiteInfo = (companyCode) =>
  axios.get('/getSiteInfo', { params: { companyCode } }).then((res) => res.data);

export const getSessionInfo = () =>
  axios.get('/getInfo', { params: {} }).then((res) => res.data);
