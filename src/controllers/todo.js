const JWT = require("jsonwebtoken");
const { Todo } = require("../doc/todo");
const mongoose = require("mongoose");

exports.getAllTodo = (req, res, next) => {
  const { userId } = JWT.verify(req.headers.token, "secretKey");
  const user = new mongoose.Types.ObjectId(userId);
  Todo.find({ User: user })
    .sort({ text: 1 })
    .then((todo) => {
      if (todo.length == 0)
        return res.status(200).send({ message: "Nothing To show .." });
      res.status(200).send({ allTodo: todo });
    })
    .catch(() => res.status(404).send({ message: "Nothing To show .." }));
};



exports.createTodo = (req, res) => {
  const text = req.body.text;
  const { userId } = JWT.verify(req.headers.token, "secretKey");
  const user = new mongoose.Types.ObjectId(userId);
  var todo = new Todo({
    text: text,
    User: user,
  });
  todo
    .save()
    .then((todo) =>
      res.status(201).send({ message: "add successful", todo: todo })
    )
    .catch((err) => {
      res.status(500).send("Not created ..");
      console.log(err);
    });
};

exports.updateTodo = (req, res) => {
  const text = req.body.text;
  Todo.findByIdAndUpdate(req.params.id, {
    text: text,
  })
    .then((todo) => {
      if (!todo) return res.status(200).send({ message: "_id is not exist" });
      res.status(200).send({ message: "update successful ", oldTodo: todo });
    })
    .catch(() => res.status(404).send({ message: "not found" }));
};

exports.deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((todo) => {
      if (!todo) return res.status(200).send({ message: "_id is not exist" });
      res.status(200).send({ removedTodo: todo });
    })
    .catch((err) => console.log(err));
};
