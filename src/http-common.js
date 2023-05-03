import axios from "axios";

export default axios.create({
  baseURL: process.env['baseURL'],
  headers: {
    "Content-type": "application/json"
  }
});