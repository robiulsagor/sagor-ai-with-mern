import cors from "cors";
import express from "express";
import ImageKit from "imagekit";

const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.CLIENT_URL);

app.use(cors({ origin: "http://localhost:5173" }));

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMGKIT_URL_ENDPOINT,
  publicKey: process.env.IMGKIT_PUBLIC_KEY,
  privateKey: process.env.IMGKIT_PRIVATE_KEY,
});

// don't need this middleware because already defined cors

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/upload", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
