import axios from "axios";

const sendRequest = async (url, method, body, headers = {}) => {
  const response = await axios({
    method,
    url: base_url + url,
    data: body,
    headers,
  });
  console.log(response);
  return response.data;
};

const login = async (username, password) => {
  await sendRequest("/users/login/", "POST", {
    username,
    password,
  });
};

export default login;
