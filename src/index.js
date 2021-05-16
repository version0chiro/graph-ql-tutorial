const express = require("express");
const getRandomMeme = require("@blad3mak3r/reddit-memes").getRandomMeme;

const app = express();

let memes = {
  title: [],
  image: [],
};

app.get("/", async (req, res) => {
  getRandomMeme()
    .then((info) => {
      memes.title.push(info.title);
      memes.image.push(info.image);
    })
    .then(() => console.log(memes))
    .catch(console.error);
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("listing on port 3000");
});
