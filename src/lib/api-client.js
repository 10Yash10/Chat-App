import axios from "axios";
import { HOST } from "../utils/constant.js";

// creating the instance of axios method so now we can call apiClient to do http method calls.
const apiClient = axios.create({
  baseURL: HOST,
});

export default apiClient;
