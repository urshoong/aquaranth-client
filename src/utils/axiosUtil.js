import axios from "axios";
import { API_URL } from "@constants/common";

const request = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: false,
});

export default request;
