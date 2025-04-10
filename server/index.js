//import express
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends')

//db mongoose connection
mongoose.connect("mongodb://localhost:27017/MERN_02") // Removed deprecated options
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        // Handle the error appropriately (e.g., exit the application, retry the connection)
    });


app.get('/insert', async (req, res) => {
    try {
        const friend = new FriendModel({ name: "jhon", age: 98 });
        await friend.save();
        res.send("Inserted Data");
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data"); // Send an appropriate error response
    }
});


app.get('/read', async (req, res) => {
    try {
      const result = await FriendModel.find({});
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error"); // Or better: res.status(500).json({ error: "Failed to read data" });
    }
  });

app.listen(3001, () => {
    console.log("You are Connect !")
});


