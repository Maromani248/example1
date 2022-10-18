import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());

const product: { id: number; name: string; marca: string }[] = [
  {
    name: "mouse",
    marca: "telefe",
    id: 123456,
  },
];

// GET
app.get("/product", (req, res) => {
  res.status(200).json(product);
});

// POST
app.post("/product", (req, res) => {
  const { name, marca } = req.body;
  
  try {
    if (!name || !marca) throw new Error("che, pasame el name y marca");
    product.push({ id: new Date().getTime(), name, marca });
    res.status(200).json(product.slice(-1));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

});

// PUT
app.put("/product", (req, res) => {
  const { name, marca, id } = req.body;
  const index = product.findIndex((product) => product.id === id);
  console.log(index);

  if (index === -1) {
    return res.status(400).json({message: "no se encontro el producto"});
  }

  product[index] = { ...product[index], name, marca};
  res.status(200).json(product[index]);
});

// DELETE
app.delete("/product", (req, res) => {
  res.status(200).json({ name: "maria" });
});

app.listen(3000);
