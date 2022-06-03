const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// parse application/json
app.use(bodyParser.json());

// create database connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "8889",
  password: "root",
  database: "restful_api_nodejs",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

// connect to db
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Conected!");
});

// GET all data
app.get("/api/products", (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      error: null,
      response: results,
    });
  });
});

// GET by ID
app.get("/api/products/:id", (req, res) => {
  let sql = "SELECT * FROM product WHERE product_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, response: results });
  });
});

// POST New Data
app.post("/api/products", (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
  };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, response: "Data Berhasil Di Input" });
  });
});

// PUT / EDIT DATA
app.put("/api/products/:id", (req, res) => {
  let sql =
    "UPDATE product SET product_name='" +
    req.body.product_name +
    "', product_price='" +
    req.body.product_price +
    "' WHERE product_id=" +
    req.params.id;

  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, response: req.body });
  });
});

// DELETE Data by ID
app.delete("/api/products/:id", (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, response: "Data Berhasil Di Hapus" });
  });
});

// RUNNING SERVER
app.listen(3307, () => {
  console.log("Server started on port 3307");
});
