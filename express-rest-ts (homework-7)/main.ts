import express from 'express';
import bodyParser from 'body-parser';
import ProductController from './api/controllers/ProductController';
import EmployeeController from './api/controllers/EmployeeController';
import CustomerController from './api/controllers/CustomerController';
import OrderController from './api/controllers/OrderController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/products', ProductController.create);
app.get('/api/products', ProductController.getAll);
app.get('/api/products/:id', ProductController.get);
app.get('/api/products/:id/orders', ProductController.getOrders); // bad logic of func, just an example
app.patch('/api/products/:id', ProductController.update);
app.delete('/api/products/:id', ProductController.delete);

app.post('/api/employees', EmployeeController.create);
app.get('/api/employees', EmployeeController.getAll);
app.get('/api/employees/:id', EmployeeController.get);
app.patch('/api/employees/:id', EmployeeController.update);
app.delete('/api/employees/:id', EmployeeController.delete);

app.post('/api/customers', CustomerController.create);
app.get('/api/customers', CustomerController.getAll);
app.get('/api/customers/:id', CustomerController.get);
app.patch('/api/customers/:id', CustomerController.update);
app.delete('/api/customers/:id', CustomerController.delete);

app.post('/api/orders', OrderController.create);
app.get('/api/orders', OrderController.getAll);
app.get('/api/orders/:id', OrderController.get);
app.patch('/api/orders/:id', OrderController.update);
app.delete('/api/orders/:id', OrderController.delete);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
