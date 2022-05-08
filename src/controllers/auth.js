const { User } = require("../doc/user");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(async (user) => {
      if (user)
        return res.status(400).send({ message: "email is already exist" });
      var newUser = new User({
        email: email,
        password: await bcrypt.hash(password, 10),
      });
      newUser
        .save()
        .then((newUser) => {
          const token = Jwt.sign(
            {
              email: newUser.email,
              userId: newUser._id,
            },
            "secretKey"
            // , { expiresIn: '1h' }
          );
          res.status(201).send({ token });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ error: err });
    });
};

exports.login = async (req, res) => {
  await User.findOne({ email: req.query.email })
    .then(async (user) => {
      if (!user) return res.status(400).send({ message: "Invalid email" });
      const validPassword = await bcrypt.compare(
        req.query.password,
        user.password
      );
      if (!validPassword)
        return res.status(400).send({ message: "Invalid password." });

      const token = Jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        "secretKey"
        // , { expiresIn: '1h' }
      );
      res.status(200).send({ token: token });
    })
    .catch();
};
