import axios from "axios";
export function signIn(values) {
  console.log("login");
  const { email, password } = values;
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/signin`, {
    email: email,
    password: password,
  });
}

export function signUp(values) {
  const user = values;
  console.log(values);
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, { user });
}
