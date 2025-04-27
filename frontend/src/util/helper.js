import axios from "axios";
import { Config } from "./config";
import { setServerSatus } from "../store/server.store";
import { getAcccessToken } from "../store/profile.store";
import dayjs from "dayjs";

export const request = (url = "", method = "get", data = {}) => {
  // Get access token
  const access_token = getAcccessToken();

  // Set up headers
  const headers = { "Content-Type": "application/json" };
  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }

  // Add authorization header
  if (access_token) {
    headers["Authorization"] = `Bearer ${access_token}`;
  }

  // Build query string for GET requests
  let finalUrl = Config.base_url + url;
  if (method.toLowerCase() === "get" && Object.keys(data).length > 0) {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        params.append(key, value);
      }
    });
    const queryString = params.toString();
    if (queryString) {
      finalUrl += `?${queryString}`;
    }
  }

  return axios({
    url: finalUrl,
    method: method.toLowerCase(),
    data: method.toLowerCase() !== "get" ? data : undefined,
    headers
  })
  .then((res) => {
    setServerSatus(200);
    return res.data;
  })
  .catch((err) => {
    const response = err.response;
    if (response) {
      const status = response.status;
      setServerSatus(status);

      // Handle specific error cases
      if (status === 401) {
        return {
          error: true,
          message: "Please log in to continue",
          status: 401
        };
      }

      return {
        error: true,
        message: response.data?.message || "Request failed",
        status
      };
    } else if (err.code === "ERR_NETWORK") {
      setServerSatus("error");
      return {
        error: true,
        message: "Network error. Please check your connection.",
        status: "network_error"
      };
    }
    
    console.error("Request error:", err);
    return {
      error: true,
      message: "An unexpected error occurred",
      status: "unknown"
    };
  });
};

export const formatDateClient = (date, format = "DD/MM/YYYY") => {
  if (date) return dayjs(date).format(format);
  return null;
};

export const formatDateServer = (date, format = "YYYY-MM-DD") => {
  if (date) return dayjs(date).format(format);
  return null;
};
