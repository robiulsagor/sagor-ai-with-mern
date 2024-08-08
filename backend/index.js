import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import cors from "cors";
import express from "express";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import chat from "./models/chat.js";
import userChats from "./models/userChats.js";

const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.CLIENT_URL);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMGKIT_URL_ENDPOINT,
  publicKey: process.env.IMGKIT_PUBLIC_KEY,
  privateKey: process.env.IMGKIT_PRIVATE_KEY,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/upload", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", ClerkExpressRequireAuth({}), async (req, res) => {
  const { text } = req.body;
  const userId = req?.auth?.userId;

  try {
    const newChat = new chat({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text }],
        },
      ],
    });

    const savedChat = await newChat.save();

    const chatsOfUser = await userChats.find({
      userId: userId,
    });

    if (!chatsOfUser.length) {
      const newChatsOfUser = new userChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newChatsOfUser.save();
    } else {
      await userChats.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            chats: { _id: savedChat._id, title: text.substring(0, 40) },
          },
        }
      );

      res.status(201).send(savedChat._id);
    }
  } catch (error) {
    res.status(500).send("Error creating chat!");
  }
});

app.get("/api/userchats", ClerkExpressRequireAuth({}), async (req, res) => {
  const userId = req?.auth?.userId;

  try {
    const chats = await userChats.find({ userId });

    res.send(chats[0].chats);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong fetching user chats!");
  }
});

app.get("/api/test", ClerkExpressRequireAuth({}), (req, res) => {
  const userId = req?.auth?.userId;
  console.log(userId);
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
