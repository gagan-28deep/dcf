import axios from "axios";
var URL = process.env.REACT_APP_API_KEY;
var auth_token = localStorage.getItem("auth_token");
const http = axios.create({
  baseURL: URL,
  timeout: 7000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${auth_token}`,
  },
});

export default async function HTTPrequest(data) {
  var value = {};
  if (data["method"].toUpperCase() === "GET") {
    await http
      .get(`${URL}${data.path}`, {})
      .then(function (response) {
        value = { ...response };
      })
      .catch(function (error) {
        value = { ...error };
      });
  }
  if (data["method"].toUpperCase() === "POST") {
    await http
      .post(`${URL}${data.path}`, {
        ...data.body,
      })
      .then(function (response) {
        value = { ...response };
      })
      .catch(function (error) {
        value = { ...error };
      });
  }
  if (data["method"].toUpperCase() === "PUT") {
    await http
      .put(`${URL}${data.path}`, {
        ...data.body,
      })
      .then(function (response) {
        value = { ...response };
      })
      .catch(function (error) {
        value = { ...error };
      });
  }
  if (data["method"].toUpperCase() === "DELETE") {
    await http
      .delete(`${URL}${data.path}`)
      .then(function (response) {
        value = { ...response };
      })
      .catch(function (error) {
        value = { ...error };
      });
  }
  return value;
}
