const app = require("express")();

app.get("/hola", (req, res) => {
  res.status(200).json({ name: "maria" });
});

app.listen(3000);