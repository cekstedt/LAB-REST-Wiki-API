// Module imports.

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const ejs = require("ejs");

// Setting up imports for use.

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect(process.env.MONGO_DB);

// Global Variables.

const PORT = process.env.PORT;

const articleSchema = new mongoose.Schema({title: String, content: String});
const Article = mongoose.model("Article", articleSchema);

// Basic GET routes.

app.get("/", function(req, res) {
  res.send("Hello");
});

// "/articles" route commands.

app
  .route("/articles")
  .get(function(req, res) {
    Article.find(function(err, foundArticles) {
      if (err) {
        console.log(err);
      } else {
        res.send(foundArticles);
      }
    });
  })
  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully added a new article.");
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted all articles.");
      }
    });
  });

// "/articles/:articleName" route commands.

app
  .route("/articles/:articleTitle")
  .get(function(req, res) {
    Article.findOne(
      {
        title: req.params.articleTitle
      },
      function(err, foundArticle) {
        if (err) {
          console.log(err);
        } else if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("No article matching that title was found.");
        }
      }
    );
  })
  .put(function(req, res) {
    Article.replaceOne(
      {
        title: req.params.articleTitle
      },
      {
        title: req.body.title,
        content: req.body.content
      },
      function(err) {
        if (err) {
          console.log(err);
        } else {
          res.send("Successfully updated article.");
        }
      }
    );
  })
  .patch(function(req, res) {
    Article.updateOne(
      {
        title: req.params.articleTitle
      },
      {
        title: req.body.title,
        content: req.body.content
      },
      function(err) {
        if (err) {
          console.log(err);
        } else {
          res.send("Successfully updated article.");
        }
      }
    );
  })
  .delete(function(req, res) {
    Article.deleteOne(
      {
        title: req.params.articleTitle
      },
      function(err) {
        if (err) {
          console.log(err);
        } else {
          res.send("Successfully deleted article.");
        }
      }
    );
  });

// Server initialization.

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});
