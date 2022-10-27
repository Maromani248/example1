import express from "express";
import cors from "cors";
import bodyParser, { urlencoded } from "body-parser";
const app = express();

app.use(cors());
app.use(bodyParser.json(), urlencoded({ extended: true }));

const product: { name: string; brand: string; price: number; id: number }[] = [
  {
    name: "Galletitas",
    brand: "Terrabusi",
    price: 100,
    id: 1234
  },
];

//                   MÉTODOS:                   //

// GET
app.get("/product", (_req, res) => {
  res.status(200).json(product);
});

// POST
app.post("/product", (req, res) => {
  const { name, brand, price } = req.body;
  
  try {
    if (!name || !brand) throw new Error("che, pasame el name y marca");
    product.push({ name, brand, price, id: Math.floor(Math.random()*10000) });
    res.status(200).json(product.slice(-1));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

});

// PUT
app.put("/product", (req, res) => {
  const { name, brand, price, id } = req.body;
  const index = product.findIndex((product) => product.id === id);
  console.log(index);

  if (index === -1) {
    return res.status(400).json({ message: "No se encontró el producto" });
  }

  product[index] = { ...product[index], name, brand, price };
  res.status(200).json(product[index]);
});

// DELETE
app.delete("/product", (req, res) => {
  const { id } = req.body;
  const index = product.findIndex((product) => product.id === id);
  console.log(index);
  if (index === -1) {
    return res.status(400).json({ message: "No se encuentra el producto" });
  } else {
    product.splice(index, 1);
    res
      .status(200)
      .json({ message: "El producto se ha borrado correctamente" });
  }
});

app.listen(3000);
