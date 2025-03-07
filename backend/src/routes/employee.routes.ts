import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from 'uuid'
import { Employee } from "../types/employee";

const employeeRouter = Router()

const employees: Employee[] = [
    { id: '123', firstname: 'Kenny', lastname: 'Viver', age: 25, isMarried: true },
    { id: '1234', firstname: 'Kevin', lastname: 'Viver', age: 25, isMarried: true }
]

// GET /employees      # Get employee list
employeeRouter.get('/employees', (req: Request, res: Response) => {
    res.status(200).json(employees)
})

// GET /employees/search   # Search employees by firstname using query parameter
employeeRouter.get('/employees/search', (req: Request<{}, {}, {}, { firstname: string }>, res: Response) => {
    const { firstname } = req.query
    const employeeFound = employees.filter(employee => employee.firstname.toLowerCase().includes(firstname.toLowerCase()))
    if (!employeeFound) {
        res.status(404).send('Employee not found')
        return
    }
    res.status(200).json(employeeFound)
})

// GET /employees/:id    # Get one employee by ID
employeeRouter.get('/employees/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const employeeFound = employees.find(employee => employee.id === id)
    if (!employeeFound) {
        res.status(404).send('Employee not found')
        return
    }
    res.status(200).json(employeeFound)
})

// POST /employees     # Add employee
employeeRouter.post('/employees', (req: Request<{}, {}, Omit<Employee, 'id'>>, res: Response) => {
    const newEmployee: Employee = {
        id: uuidv4(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried
    }
    employees.push(newEmployee)
    res.status(200).json(newEmployee)
})

// PUT /employees/:id    # Update employee by ID
employeeRouter.put('/employees/:id', (req: Request<{ id: string }, {}, Partial<Employee>>, res: Response) => {
    const { id } = req.params
    const employeeFound = employees.findIndex(employee => employee.id === id)
    if (employeeFound === -1) {
        res.status(404).send('Employee not found')
        return
    }
    const updateEmployee: Employee = {
        ...employees[employeeFound],
        firstname: req.body.firstname ?? employees[employeeFound].firstname,
        lastname: req.body.lastname ?? employees[employeeFound].lastname,
        age: req.body.age ?? employees[employeeFound].age,
        isMarried: req.body.isMarried ?? employees[employeeFound].isMarried
    }
    employees[employeeFound] = updateEmployee
    res.status(200).json(updateEmployee)
})

// DELETE /employees/:id   # Delete employee by ID
employeeRouter.delete('/employees/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const employeeFound = employees.findIndex(employee => employee.id === id)
    if (employeeFound === -1) {
        res.status(404).send('Employee not found')
        return
    }
    employees.splice(employeeFound, 1)
    res.status(200).send('Employee deleted successfully')
})

export default employeeRouter
//                         # (http://localhost:3500/employees/search?firstname=john)