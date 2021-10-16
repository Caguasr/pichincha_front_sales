import axios from "axios";

const httpConfig = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

export default httpConfig;
