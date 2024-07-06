import { toast } from "react-toastify";

export const notify = (message, type) => {
  toast[type](message);
};

export const API_URL = "https://task-manager-server-pece.onrender.com";
// export const API_URL = "http://localhost:8000";
