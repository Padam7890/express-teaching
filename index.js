//express lai bolako
const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = require("./controllers/userController/login.controller");
const loadRoutes = require("./router/router");

//aap vanne variable ma store gari rahko
const app = express();

app.use(cors());


//json ma aayeko file lai accept gar vaneko
app.use(
  express.json(),
  express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 100000,
    type: "application/json",
  })
);

loadRoutes(app)


// route banako
app.get("/", (req, res) => {
  res.json({
    message: "hey d",
  });
});

app.post("/register", async (req, res) => {
  try {
    // Get the data from the request body
    const { email, password, name } = req.body;

    // Check if email already exists
    const checkemail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (checkemail) {
      return res.status(400).json({
        error: "Email already exists",
        data: checkemail,
      });
    }
    //password hash is required
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // If email doesn't exist, create a new user
    const savedata = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    //datasave vaiskayo datbase

    //token genrate garne
    const accesToken = jwt.sign(
      {
        id: savedata.id,
      },
      process.env.JWT_SECERT_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      message: "User created successfully",
      data: savedata,
      accesToken: accesToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error: Cannot save data",
      error: error,
    });
  }
});

app.post("/login/ehy", login)

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      message: "users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Eroor Cant fetch data ",
      error: error,
    });
  }
});

app.get("/post", async (req, res) => {
  try {
    const getPost = await prisma.post.findMany({});
    return res.status(200).json({
      message: "Post fetched successfully",
      data: getPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Cant fetch post",
      eror: error,
    });
  }
});

app.post("/post", async (req, res) => {
  try {
    const { title, published, userId, content } = req.body;

    const datasave = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: published || false,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Post created successfully",
      data: datasave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error: Cannot save data",
      error: error,
    });
  }
});

app.put("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, content, published, userId } = req.body;

    const updatePost = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        content: content,
        published: published,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.status(200).json({
      message: "Post updated successfully",
      data: updatePost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error: Cannot save data",
      error: error,
    });
  }
});

app.delete("/post/:id", async function (req, res) {
  try {
    const { id } = req.params;

    ///validation for checking post .. todo task
    const deletePost = await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error: Cannot delete data",
      error: error,
    });
  }
});

//yo port ma sunirahko
app.listen(8080, () => console.log("Example app listening on port 8080!"));
