//import express
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends')

app.use(cors());
app.use(express.json())

//db mongoose connection
mongoose.connect("mongodb://localhost:27017/MERN_02") // Removed deprecated options
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    // Handle the error appropriately (e.g., exit the application, retry the connection)
  });


app.post('/addfriend', async (req, res) => {

  const name = req.body.name;
  const age = req.body.age;
  if (!name || !age) {
    return res.status(400).json({ message: "Missing fields!" });
  }

  try {
    const friend = new FriendModel({ name: name, age: age });
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

app.put('/update', async (req, res) => {

  const newAge = req.body.newAge;
  const id = req.body.id;
  try {
   await FriendModel.findById(id,(error,friendToUpdate)=>{
    friendToUpdate.age=Number(newAge);
    friendToUpdate.save();
   });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data"); // Send an appropriate error response
  }
});

app.listen(3001, () => {
  console.log("You are Connect !")
});


