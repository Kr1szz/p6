
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let inventory = [
  { id: 1, prodname: "prod1", qty: 12, price: 12 },
  { id: 2, prodname: "prod2", qty: 1, price: 13 }
];

app.get('/', (req, res) => {
  res.json(inventory);
});

app.post('/add', (req, res) => {
  inventory.push(req.body);
  res.json(inventory);
});

app.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  inventory = inventory.filter(item => item.id !== id);
  res.json(inventory);
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
