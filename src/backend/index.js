const express = require("express");
var mysql = require("mysql");
var cors = require('cors')
const bodyParser = require("body-parser"); 
const app = express();
app.use(cors({origin: true, credentials: true}))
app.use(bodyParser.json());
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "sigvitas",
});

app.post("/add-user", (req, res) => {
    connection.connect(function (err) {
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
    const userData = req.body.value; 
    console.log(req.body.value)
    
    const query = "INSERT INTO users (name, email, password, confirmpassword) VALUES ?";
    const values = [
      [
        userData.name,
        userData.email,
        userData.password,
        userData.confirmPassword
      ],
    ];
  
    
    connection.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error inserting user data into MySQL database: ", err);
        res.status(500).json({ error: "An error occurred while saving user data" });
        return;
      }
  
      console.log("User data inserted successfully");
      res.status(200).json({ success: true, message: "User data saved successfully" });
    });
  });

  
  app.post("/add-data", (req, res) => {
    connection.connect(function (err) {
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
    const userData = req.body.value; 
    console.log("Data",req.body.value)
    
    const query = "INSERT INTO data (Document_No, App_Serial_Number, Granted_Patent_Number, Priority_Date, File_Date, Agent, CPC_Class_First, Title, Assignee_Ultimate) VALUES ?";
    const values = [
      [
        userData["Document No"],
        userData["App Serial Number"],
        userData["Granted Patent Number"],
        userData["Priority Date"],
        userData["File Date"],
        userData["Agent"],
        userData["CPC Class (First)"],
        userData["Title"],
        userData["Assignee Ultimate"]
      ],
    ];

    
    connection.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error inserting user data into MySQL database: ", err);
        res.status(500).json({ error: "An error occurred while saving user data" });
        return;
      }
  
      console.log("User data inserted successfully");
      res.status(200).json({ success: true, message: "User data saved successfully" });
    });
  });



  app.post("/login", (req, res) => {
    const { email, password } = req.body.value; 

    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    
    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: "An error occurred while logging in" });
        }

        
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

      
        res.status(200).json({ success: true, message: "Login successful" });
    });
});

  app.get("/all-users", (req, res) => { 
    connection.connect(function (err) {
      if (err) {
        console.log(err.code);
        console.log(err.fatal);
      }
    });
    let UserData = connection.query(
      "SELECT * FROM data",
      function (err, rows, fields) {
        if (err) {
          console.log("An error occurred with the query");
          return;
        }
        console.log("All User Rows successfully executed");
        res.json(rows); 
      }
    );
    
  });


  app.post("/search", (req, res) => {
    console.log(req.body);
    const documentNo = req.body.DocumentNo;
    
  
    if (!documentNo) {
      return res.status(400).json({ error: "DocumentNo is required for search" });
    }
  
    const query = "SELECT * FROM data WHERE Document_No = ?";
    connection.query(query, [documentNo], (err, rows) => {
      if (err) {
        handleQueryError(res, err);
        return;
      }
  
      console.log(`Search completed for DocumentNo: ${documentNo}`);
      res.status(200).json(rows);
    });
  });
  

app.listen(3001)
