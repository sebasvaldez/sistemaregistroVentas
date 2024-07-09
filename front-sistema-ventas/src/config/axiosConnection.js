import axios from "axios";

export const axiosConnection = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
    timeout: 12000,
    headers: {
        "Content-Type": "application/json",
        
    },
})


//Rutas de usuarios

export const loginRequest = async (user) => axiosConnection.post("/login", user);

export const registerRequest = async (user) => axiosConnection.post("/register", user);

export const verifyTokenRequest = async () => axiosConnection.get("/verify");

export const logoutRequest = async ()=> axiosConnection.post("/logout");

//Rutas de productos

export const getProductsRequest = async () => axiosConnection.get("/get-products");
