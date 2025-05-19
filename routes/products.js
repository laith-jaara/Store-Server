import express from 'express';

const productRoutes = express.Router();

let products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Phone", price: 800 }
];

// Get all products
// localhost:3001/api/products/
productRoutes.get('/', (req, res) => {
    res.json(products);
})

// Get product by ID
// localhost:3001/api/products/2
productRoutes.get('/:id', (req, res) => {
    const product = products.find((item) => item.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
})

// Add new product
// localhost:3001/api/products/
// POST
// body >> {"name":"Tablet","price":450}
productRoutes.post('/', (req, res) => {
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price
    }
    products.push(newProduct);
    res.json(products);
})

// Update product by ID
// PUT localhost:3001/api/products/1
// body >> {"name":"Updated Laptop","price":999}
productRoutes.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((item) => item.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
})

// Delete product by ID
// DELETE localhost:3001/api/products/1
productRoutes.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((item) => item.id === id);
    if (index !== -1) {
        const deleted = products.splice(index, 1);
        res.json({ message: "Product deleted", product: deleted[0] });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
})

export default productRoutes;