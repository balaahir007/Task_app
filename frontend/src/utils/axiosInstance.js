import axios from "axios";

const BASEURL="http://localhost:8000/api"; // Replace with your actual base URL
const axionInstance = axios.create({
    baseURL : BASEURL,
    withCredentials : true,
})
export default axionInstance;