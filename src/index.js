const express = require("express");
const getRandomMeme = require("@blad3mak3r/reddit-memes").getRandomMeme;
var {buildSchema} = require("graphql");
const graphqlHTTP = require('express-graphql').graphqlHTTP;

//graphQL schema
var schema = buildSchema(`
    type Query{
        message:String
    }
`);

//root resolver
var root = {
    message:()=>'Hello World!'
};


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

app.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true
}));

app.listen(3000, () => {
  console.log("listing on port 3000");
});
