import express from "express";
import productManager from "src/productManager.js";

const app = express();
app.use(express.urlencoded({extended : true}));

const productos = new productManager();
const readProducts = productos.readProducts();

console.log(await readProducts);

app.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit);
});

app.get("/products/:id", async (req,res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let productById = allProducts.find(product => product.id === id)
    res.send(productById)
})

const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`test local host' ${server.address().port}`);
})

server.on("error", (error) => console.log(error));

