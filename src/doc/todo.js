const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  User: { type: mongoose.SchemaTypes.ObjectId },
});

const Todo = mongoose.model("Todo", TodoSchema);

exports.Todo = Todo;
