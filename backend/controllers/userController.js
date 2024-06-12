const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../config/dbConnection");
const dotenv = require("dotenv");
const { ACCOUNT_SID, AUTH_TOKEN } = process.env;
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const crypto = require('crypto');
const auth = require("../middleware/auth")

// Generate a secure random string for the secret key
const generateSecretKey = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

const secretKey = generateSecretKey(64); // Generate a 64-character (256-bit) secret key
console.log('Secret Key:', secretKey);



dotenv.config();

const account_sid = ACCOUNT_SID;
const auth_token = AUTH_TOKEN;





const register = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  db.query(
    `SELECT * FROM users WHERE LOWER(phone) = LOWER(${db.escape(
      req.body.phone.replace(/\+/, '')
    )})`,
    (err, result) => {
      if (err) {
        console.log("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
      }

      if (result && result.length) {
        return res.status(409).send({ msg: "This user is already in use" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log("error in hashing:", err);
            return res.status(500).send({ msg: "Error in hashing" });
          }

          let phone = req.body.phone.replace(/\+/, '');

          db.query(
            `INSERT INTO users (name, phone, password, username) VALUES ('${req.body.name}', ${db.escape(phone)}, ${db.escape(hash)}, '${req.body.username}')`,
            (err, result) => {
              if (err) {
                console.log("error in insertion", err);
                return res.status(500).send({ msg: "Error in insertion" });
              }

            
              return res.status(200).json({ msg: "User registered and wallet created successfully" });
            }
          );
        });
      }
    }
  );
   
};


const login = (req, res) => {
  const jwt_secret = JWT_SECRET;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let phone = req.body.phone.replace(/\+/, '');

  db.query(
    `SELECT * FROM users WHERE phone = ${db.escape(phone)};`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }

      if (!result.length) {
        return res.status(401).send({ msg: "Entered Mobile Number or Password is incorrect!" });
      }

     
        bcrypt.compare(req.body.password, result[0]["password"], (bErr, bResult) => {
          if (bErr) {
            return res.status(400).send({ msg: bErr });
          }

          if (bResult) {
            // Generate JWT token
            const token = jwt.sign({ id: result[0].id }, jwt_secret, { expiresIn: '1h' });

            return res.status(200).send({ 
              msg: 'Logged in successfully', 
              token 
            });
          } else {
            return res.status(401).send({ msg: "Entered Mobile Number or Password is incorrect!" });
          }
        });
     
    }
  );
};


const checkPass = (req, res) => {
  const { phone } = req.query;

  db.query(
    `SELECT * FROM users WHERE phone = ?`,
    [phone],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error");
        return;
      }

      if (results.length > 0) {
        res.send("You are registered!");
      } else {
        res.send("Your listed phone number is not registered");
      }
    }
  );
};




;

const updatePass = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log("error in hashing:", err);
      return res.status(400).send({
        msg: "Error in hashing",
      });
    }

    db.query(
      `UPDATE users SET password = ? WHERE phone = ?`,
      [hash, req.body.phone],
      (err, result) => {
        if (err) {
          console.error("Error updating password:", err);
          return res.status(500).send({
            msg: "Error updating password",
          });
        }
        return res.status(200).send({
          msg: "The password has been updated",
        });
      }
    );
  });
};

const logout = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(authToken, JWT_SECRET);

  db.query(
    "SELECT * FROM users WHERE id=?",
    [decode.id],
    function (error, result, fields) {
      if (error) throw error;
      res.clearCookie('token');
      return res.status(200).send({ msg: "Logged out successfully" });
    }
  )

};
const getUser = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(authToken, JWT_SECRET);
  console.log(decode)
  console.log([decode.walletId])
  console.log([decode.id])

  db.query(
    "SELECT * FROM users WHERE id=?",
    [decode.id], // Pass an array with the value for the placeholder
    function (error, result, fields) {
      if (error) throw error;

      return res.status(200).send({
        success: true,
        data: result[0],
        message: "Fetch Successfully",
      });
    }
  );

};

module.exports = {
  register,
  login,
  
  checkPass,
  
  updatePass,
  secretKey,
  logout,
  getUser
};
