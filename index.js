const express = require('express');
const app = express();
app.use(express.json());

let employees = [
  { id: 1, name: 'John Doe', position: 'Software Engineer' },
  { id: 2, name: 'Jane Smith', position: 'Product Manager' },
  { id: 3, name: 'Sam Johnson', position: 'Designer' },
];

function getEmployees() {
  return employees;
}

function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

function addEmployee(employee) {
  employee.id = employees.length + 1;
  employees.push(employee);
  return employee;
}

app.get('/employees', (req, res) => {
  res.json(getEmployees());
});

app.get('/employees/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  res.json(getEmployeeById(id));
});

app.post('/employees/new', (req, res) => {
  let newEmployee = req.body;
  res.json(addEmployee(newEmployee));
});

module.exports = { getEmployees, getEmployeeById, addEmployee };
