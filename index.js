//First is to import the needed modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//Connecting to exppres app
//Creating a variable for localhost port
//Creating a variable to hold the APL URL
const app = express();
const port = 3000;
const API_URL = "https://date.nager.at/api/v3/publicholidays";

//Declaring the public folder for static files
//using thhe bodyparse middleware to receive the content of the ejs files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Connecting the ejs index file to the homepage
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

//receiving the content of ejs file form and using it to connect and query the API
//Using try and catch object to get response from the api 
app.post("/holiday", async (req, res) => {
  const holidayYear = req.body.year;
  const holidayCountry = req.body.countries;
  try {
    const result = await axios.get(API_URL  + "/"+ holidayYear +"/"+ holidayCountry);
    res.render("index.ejs", { contents: result.data });
  } catch (error) {
    console.log(error.response.data)
    const errorMessage = "No Available Holiday";
    res.render("index.ejs", { error: errorMessage });
  }
});


//Listening to the port on the localhost
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
