import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.VITE_APP_SCRIPT_URL;
const PASSWORD = "admin";

const experience = [
  { 
    id: "e1", 
    title: "Junior Software Engineer", 
    company: "Intimetec Visionsoft Pvt. Ltd. | Jaipur, India", 
    period: "JUL 2025 - Present", 
    description: "<ul><li>Maintained and incrementally modernized a legacy React + PHP B2B application (8 years old, ~150 active organisations), refactoring class components to hooks and extracting reusable logic into custom hooks across 6 modules.</li><li>Led production database migration from MySQL 5.7 → 8.3 (zero downtime, 23 GB data, 38 tables), reducing monthly cloud infrastructure spend 15%.</li><li>Profiled and optimized N+1 query patterns and unindexed lookups across multiple critical endpoints, cutting p95 response time from 5s to 500ms for users on high-latency internet connections.</li><li>Shipped end-to-end mobile licensing module for a US-based real-time alerting platform, enabling license based billing model and integrated single session reinforcement using firebase firestore.</li></ul>" 
  },
  { 
    id: "e2", 
    title: "Trainee", 
    company: "Intimetec Visionsoft Pvt. Ltd. | Jaipur, India", 
    period: "JAN 2025 - JUN 2025", 
    description: "<ul><li>Built a real-time Taxi Booking application integrated with OTP based authentication live ride tracking, driver-user interaction, and ride history persistence.</li><li>Developed a Book Rent Management system, enabling rental tracking, CRUD operations, and user-friendly UI for customers.</li></ul>" 
  },
  { 
    id: "e3", 
    title: "React intern", 
    company: "Bluegreenweb Pvt. Ltd. | Jaipur, India", 
    period: "AUG 2024 – OCT 2024", 
    description: "<ul><li>Built a responsive introductory website for a startup ensuring cross-device compatibility.</li><li>Integrated Google Apps Script API to automate Contact Us form submissions.</li><li>Worked on SEBI project associated with Bond Central, enhancing UI/UX for financial data presentation.</li></ul>" 
  }
];

async function sendData(action, sheetName, payload) {
  try {
    const response = await axios.post(API_URL, JSON.stringify({
      action,
      password: PASSWORD,
      sheetName,
      payload
    }), {
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    });
    console.log(`Success ${sheetName}:`, response.data.message);
  } catch (error) {
    console.error(`Error ${sheetName}:`, error.message);
  }
}

async function seedExperience() {
  if (!API_URL) {
    console.error("VITE_APP_SCRIPT_URL not found in .env");
    return;
  }
  console.log("Seeding Experience data...");

  for (const exp of experience) {
    await sendData("add", "Experience", exp);
  }

  console.log("Experience seeded!");
}

seedExperience();
