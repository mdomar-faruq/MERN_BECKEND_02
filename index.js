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

  app.get('/', async (req, res) => {
      res.send('Start Node Server');
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
    res.send(friend);
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
  try {
    const newAge = req.body.newAge;
    const id = req.body.id;
    if (!newAge || !id) {
      res.status(400).send("Invalid data");
      return;
    }
    const friend = await FriendModel.findById(id);
    if (!friend) {
      res.status(404).send("Friend not found");
      return;
    }
    friend.age = Number(newAge);
    await friend.save();
    res.send(friend); // Properly send the updated object
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    // Delete the document
    const deletedFriend = await FriendModel.findByIdAndDelete(id);
    if (!deletedFriend) {
      return res.status(404).send("Item not found"); // Handle case where the ID doesn't exist
    }

    res.send("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(3001, () => {
  console.log("You are Connect !")
});


