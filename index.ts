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
    id: 123456,
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
    product.push({ name, brand, price, id: new Date().getTime() });
    res.status(200).json(product.slice(-1));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

});

// PUT
app.put("/product", (req, res) => {
  const { name, brand, id } = req.body;
  const index = product.findIndex((product) => product.id === id);
  console.log(index);

  if (index === -1) {
    return res.status(400).json({message: "no se encontro el producto"});
  }

  product[index] = { ...product[index], name, brand};
  res.status(200).json(product[index]);
});

// DELETE
app.delete("/product", (_req, res) => {
  /* let productId = req.params.productId;

  product.findById(productId, (err, product) => {
    if(err res.status(400).send({message: `Error al borrar el producto: ${err}`}
    
    product.remove( err => {
      if(err) res.status(400).send({message: `Error al borrar el producto: ${err}`})
      res.status(200).send({message: 'El producto ha sido eliminado'});
    })   
  }) */
  res.status(200).json({name: "maria"});
});

app.listen(3000);
