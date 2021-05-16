const express = require("express");
const getRandomMeme = require("@blad3mak3r/reddit-memes").getRandomMeme;
var { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql").graphqlHTTP;

//graphQL schema
var schema = buildSchema(`
    type Query{
        course(id:Int!):Course
        courses(topic:String):[Course]
    },
    type Course{
        id:Int
        title:String
        author:String
        description:String
        topic:String
        url:String
    }
`);

var coursesData = [
  {
    id: 1,
    title: "The Complete Node.js Developer Course",
    author: "Andrew Mead, Rob Percival",
    description:
      "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs/",
  },
  {
    id: 2,
    title: "Node.js, Express & MongoDB Dev to Deployment",
    author: "Brad Traversy",
    description:
      "Learn by example building & deploying real-world Node.js applications from absolute scratch",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/",
  },
  {
    id: 3,
    title: "JavaScript: Understanding The Weird Parts",
    author: "Anthony Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScript",
    url: "https://codingthesmartway.com/courses/understand-javascript/",
  },
];

var getCourse = function (args) {
  var id = args.id;
  return coursesData.filter((course) => {
    return course.id == id;
  })[0];
};

var getCourses = function (args) {
  if (args.topic) {
    var topic = args.topic;
    return coursesData.filter((course) => course.topic === topic);
  } else {
    return coursesData;
  }
};
//root resolver
var root = {
  course: getCourse,
  courses: getCourses,
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

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("listing on port 3000");
});
