const formData = require("multer")().array();
const {
  createTodo,
  getAllTodo,
  getOneTodoInfo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");
const { validate } = require("../middleware/todo");
const { checkToken } = require("../middleware/checkToken");
const router = require("express").Router();

router.get("/", checkToken, getAllTodo);

router.get("/:id", checkToken, getOneTodoInfo);

router.post("/", formData, checkToken, validate, createTodo);

router.put("/:id", formData, checkToken, validate, updateTodo);

router.delete("/:id", formData, checkToken, validate, deleteTodo);

module.exports = router;
