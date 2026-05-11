import axios from 'axios';

// The Web App URL you get after deploying the Apps Script
export const API_URL = import.meta.env.VITE_APP_SCRIPT_URL || "";

export const fetchPortfolioData = async () => {
  if (!API_URL) {
    console.error("API_URL is not set!");
    return null;
  }
  try {
    const response = await axios.get(API_URL);
    if (response.data && response.data.status === 'success') {
      return response.data.data;
    }
    throw new Error(response.data?.message || "Failed to fetch data");
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const adminAction = async (action, password, sheetName, payload = {}) => {
  if (!API_URL) {
    throw new Error("API_URL is not set!");
  }
  try {
    const response = await axios.post(API_URL, JSON.stringify({
      action,
      password,
      sheetName,
      payload
    }), {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      }
    });

    if (response.data && response.data.status === 'success') {
      return response.data;
    }
    throw new Error(response.data?.message || `Action ${action} failed`);
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    throw error;
  }
};
