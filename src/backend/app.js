import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Calculate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
import { createClient } from "@supabase/supabase-js";
import express from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to serve static files from the "src" directory

app.use(express.static(path.join(__dirname, "../")));

// Access environment variables
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseURL, supabaseKey);

// Route to serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/add", async (request, response) => {
  const dataToInsert = req.body;

  try {
    // const { data, error } = await supabase
    //   .from("first-data")
    //   .insert([{ firstName: dataToInsert }]);

    if (error) throw error;

    response.status(200), json({ success: true, data });
  } catch (err) {
    response.status(400).json({ success: false, error: err.message });
  }
});

// Function to insert data into Supabase
const insertData = async () => {
  // console.log(`Inserting data: ${firstName}`);

  try {
    const { data, error } = await supabase
      .from("first-data")
      .insert([{ first_name: firstName, second_name: "Jones" }]); // Insert data into Supabase table

    if (error) throw error;

    console.log("Data inserted successfully:", data); // Log the inserted data
  } catch (err) {
    console.error("Error inserting data:", err.message); // Log errors
  }
};

// Call insertData function when the server starts
// insertData();

app.get("/data", async (req, res) => {
  console.log("GET request received");

  try {
    console.log("Querying Supabase...");

    // Update the column name to `first_name`
    const { data, error } = await supabase
      .from("first-data")
      .select("first_name"); // Updated column name

    console.log("Data from Supabase:", data);
    console.log("Supabase error:", error);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Select error:", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log("the server is running yay");
});
