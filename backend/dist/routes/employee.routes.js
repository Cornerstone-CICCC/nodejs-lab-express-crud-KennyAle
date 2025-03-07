"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const employeeRouter = (0, express_1.Router)();
const employees = [
    { id: '123', firstname: 'Kenny', lastname: 'Viver', age: 25, isMarried: true },
    { id: '1234', firstname: 'Kevin', lastname: 'Viver', age: 25, isMarried: true }
];
// GET /employees      # Get employee list
employeeRouter.get('/employees', (req, res) => {
    res.status(200).json(employees);
});
// GET /employees/search   # Search employees by firstname using query parameter
employeeRouter.get('/employees/search', (req, res) => {
    const { firstname } = req.query;
    const employeeFound = employees.filter(employee => employee.firstname.toLowerCase().includes(firstname.toLowerCase()));
    if (!employeeFound) {
        res.status(404).send('Employee not found');
        return;
    }
    res.status(200).json(employeeFound);
});
// GET /employees/:id    # Get one employee by ID
employeeRouter.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    const employeeFound = employees.find(employee => employee.id === id);
    if (!employeeFound) {
        res.status(404).send('Employee not found');
        return;
    }
    res.status(200).json(employeeFound);
});
// POST /employees     # Add employee
employeeRouter.post('/employees', (req, res) => {
    const newEmployee = {
        id: (0, uuid_1.v4)(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried
    };
    employees.push(newEmployee);
    res.status(200).json(newEmployee);
});
// PUT /employees/:id    # Update employee by ID
employeeRouter.put('/employees/:id', (req, res) => {
    var _a, _b, _c, _d;
    const { id } = req.params;
    const employeeFound = employees.findIndex(employee => employee.id === id);
    if (employeeFound === -1) {
        res.status(404).send('Employee not found');
        return;
    }
    const updateEmployee = Object.assign(Object.assign({}, employees[employeeFound]), { firstname: (_a = req.body.firstname) !== null && _a !== void 0 ? _a : employees[employeeFound].firstname, lastname: (_b = req.body.lastname) !== null && _b !== void 0 ? _b : employees[employeeFound].lastname, age: (_c = req.body.age) !== null && _c !== void 0 ? _c : employees[employeeFound].age, isMarried: (_d = req.body.isMarried) !== null && _d !== void 0 ? _d : employees[employeeFound].isMarried });
    employees[employeeFound] = updateEmployee;
    res.status(200).json(updateEmployee);
});
// DELETE /employees/:id   # Delete employee by ID
employeeRouter.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const employeeFound = employees.findIndex(employee => employee.id === id);
    if (employeeFound === -1) {
        res.status(404).send('Employee not found');
        return;
    }
    employees.splice(employeeFound, 1);
    res.status(200).send('Employee deleted successfully');
});
exports.default = employeeRouter;
//                         # (http://localhost:3500/employees/search?firstname=john)
