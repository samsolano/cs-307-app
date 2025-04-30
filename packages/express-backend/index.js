import userService from './services/user-service.js';
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
const port = 8000;

app.use(express.json());

app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    userService.findUserByJobAndName(job,name)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
    return;
  }

  if (name !== undefined) {
    
    userService.findUserByName(name)
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    } else {
    userService.getUsers()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
});
  
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd)
  .then(() => {
      res.status(201).send(userToAdd);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
  
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService.findUserById(id)
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.deleteUserById(id)
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    res.status(400).send(err);
  });

})

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


  // const findUserByName = (name) => {
  //   return users["users_list"].filter(
  //     (user) => user["name"] === name
  //   );
  // };


  // const deleteUser = (id) => {
  //   users.users_list = users.users_list.filter( (user) => user.id !== id)
  // };

  // app.delete("/users/:id", (req, res) => {
  //   const id = req.params.id;

  //   const result = findUserById(id);
  //   if (result === undefined) {
  //       res.status(404).send("User not found")
  //   }
  //   else {
  //       deleteUser(id);
  //       res.send("User " + id + " deleted");
  //   }
  // });


  // const findUserById = (id) =>
  //   users.users_list.find((user) => user.id === id);



  // const addUser = (user) => {
  //   users["users_list"].push(user);
  //   return user;
  // };






























// import express from "express";
// import cors from "cors";

// import userService from "./services/user-service.js";

// const app = express();
// const port = 8000;

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/users", (req, res) => {
//   const name = req.query["name"];
//   const job = req.query["job"];
//   userService
//     .getUsers(name, job)
//     .then((result) => {
//       res.send({ users_list: result });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send("An error ocurred in the server.");
//     });
// });

// app.get("/users/:id", (req, res) => {
//   const id = req.params["id"];
//   userService.findUserById(id).then((result) => {
//     if (result === undefined || result === null)
//       res.status(404).send("Resource not found.");
//     else res.send({ users_list: result });
//   });
// });

// app.post("/users", (req, res) => {
//   const user = req.body;
//   userService.addUser(user).then((savedUser) => {
//     if (savedUser) res.status(201).send(savedUser);
//     else res.status(500).end();
//   });
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });