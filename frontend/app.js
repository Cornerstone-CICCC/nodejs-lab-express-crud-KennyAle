const searchForm = document.querySelector('#search-employee')
const addForm = document.querySelector('#add-employee')
const editForm = document.querySelector('#edit-employee')
let currentId = null

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchQuery = document.querySelector('#search-query')
    searchEmployees(searchQuery.value)
})

addForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const firstname = document.querySelector('#add-first-name')
    const lastname = document.querySelector('#add-last-name')
    const age = document.querySelector('#add-age')
    const isMarried = document.querySelector('#add-married')
    addEmployee(firstname.value, lastname.value, age.value, isMarried.checked)
})

const getEmployees = async () => {
    const res = await fetch("http://localhost:3500/employees", {
        method: "GET"
    });

    if (!res.ok) {
        throw new Error(`Failed to add employee: ${response.statusText}`);
    }

    const data = await res.json();
    return data;
};

const searchEmployees = async (query) => {
    const res = await fetch(`http://localhost:3500/employees/search?firstname=${query}`, {
        method: "GET"
    });

    if (!res.ok) {
        throw new Error(`Failed to add employee: ${response.statusText}`);
    }

    const data = await res.json()
    createEmployeesList(data)
}

const getEmployeeInfo = async (id) => {
    const res = await fetch(`http://localhost:3500/employees/${id}`, {
        method: "GET"
    });

    if (!res.ok) {
        throw new Error(`Failed to add employee: ${response.statusText}`);
    }

    const data = await res.json();
    showEmployeeInfo(data)
    return data;
}

const addEmployee = async (firstname, lastname, age, isMarried) => {
    const res = await fetch("http://localhost:3500/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // When doing POST/PUT/PATCH, you need to set the Content-Type
        },
        body: JSON.stringify({ firstname, lastname, age, isMarried }),
    });

    if (!res.ok) {
        throw new Error(`Failed to get employees: ${response.statusText}`);
    }

    createEmployeesList()
};

const editEmployee = async (id, firstname, lastname, age, isMarried) => {
    const res = await fetch(`http://localhost:3500/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", // When doing POST/PUT/PATCH, you need to set the Content-Type
        },
        body: JSON.stringify({ firstname, lastname, age, isMarried }),
    });

    if (!res.ok) {
        throw new Error(`Failed to get employees: ${response.statusText}`);
    }

    createEmployeesList()
};

const deleteEmployee = async (id) => {
    const res = await fetch(`http://localhost:3500/employees/${id}`, {
        method: "DELETE"
    })
    if (!res.ok) {
        throw new Error(`Failed to get employees: ${response.statusText}`);
    }

    createEmployeesList()
}

async function createEmployeesList(data) {
    if (!data) {
        data = await getEmployees()
    }
    const list = document.querySelector('#employees-list')
    list.innerHTML = ''
    data.forEach(employee => {
        const li = document.createElement('li')
        li.innerHTML = `${employee.firstname} `
        const viewBtn = document.createElement('button')
        viewBtn.innerHTML = 'VIEW'
        const editBtn = document.createElement('button')
        editBtn.innerHTML = 'EDIT'
        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = 'DELETE'
        li.appendChild(viewBtn)
        li.appendChild(editBtn)
        li.appendChild(deleteBtn)
        list.appendChild(li)
        viewBtn.addEventListener('click', () => {
            getEmployeeInfo(employee.id)
        })
        editBtn.addEventListener('click', () => {
            fillForm(employee.id, employee.firstname, employee.lastname, employee.age, employee.isMarried)
        })
        deleteBtn.addEventListener('click', () => {
            deleteEmployee(employee.id)
        })
        editForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const editFirstName = document.querySelector('#edit-first-name')
            const editLastName = document.querySelector('#edit-last-name')
            const editAge = document.querySelector('#edit-age')
            const editIsMarried = document.querySelector('#edit-married')
            editEmployee(currentId, editFirstName.value, editLastName.value, editAge.value, editIsMarried.checked)
            console.log('Edit');
        })
    });
}

function fillForm(id, firstname, lastname, age, isMarried) {
    const editFirstName = document.querySelector('#edit-first-name')
    const editLastName = document.querySelector('#edit-last-name')
    const editAge = document.querySelector('#edit-age')
    const editIsMarried = document.querySelector('#edit-married')
    editFirstName.value = firstname
    editLastName.value = lastname
    editAge.value = age
    editIsMarried.value = isMarried
    editIsMarried.checked = isMarried
    currentId = id
}

function showEmployeeInfo(data) {
    const employeeTable = document.querySelector('#employee-info')
    employeeTable.innerHTML = ``
    employeeTable.innerHTML = `
        <li>First Name: ${data.firstname}</li>
        <li>Last Name: ${data.lastname}</li>
        <li>Age: ${data.age}</li>
        <li>Married: ${data.isMarried ? 'Yes' : 'No'}</li>
    `
}

createEmployeesList()