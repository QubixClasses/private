// Password for login
const PASSWORD = "qubix@2001";

// Get elements from the HTML
const loginContainer = document.getElementById('loginContainer');
const dashboardContainer = document.getElementById('dashboardContainer');
const loginForm = document.getElementById('loginForm');
const addStudentForm = document.getElementById('addStudentForm');
const studentTableBody = document.getElementById('studentTableBody');

// Store students in localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Login form submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const passwordInput = document.getElementById('password').value;

    if (passwordInput === PASSWORD) {
        alert('Login successful!');
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
        loadStudents();  // Load students after login
    } else {
        alert('Incorrect password. Try again.');
    }
});

// Add student form submission
addStudentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values from the form
    const studentName = document.getElementById('studentName').value;
    const studentClass = document.getElementById('studentClass').value;
    const installmentsPaid = document.getElementById('installmentsPaid').value;
    const totalFee = document.getElementById('totalFee').value;

    // Create a student object
    const newStudent = {
        id: Date.now(),  // unique ID for each student
        name: studentName,
        class: studentClass,
        installmentsPaid: installmentsPaid,
        totalFee: totalFee
    };

    // Add the new student to the students array
    students.push(newStudent);

    // Save to localStorage
    localStorage.setItem('students', JSON.stringify(students));

    // Clear form
    addStudentForm.reset();

    // Reload the student table
    loadStudents();
});

// Function to load students into the table
function loadStudents() {
    // Clear the table first
    studentTableBody.innerHTML = '';

    // Loop through students and add them to the table
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.installmentsPaid}</td>
            <td>${student.totalFee}</td>
            <td>
                <button onclick="editInstallments(${student.id})">Edit Installments</button>
                <button onclick="deleteStudent(${student.id})" class="delete-button">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Function to edit installments
function editInstallments(studentId) {
    const student = students.find(st => st.id === studentId);
    const newInstallments = prompt(`Edit installments for ${student.name}`, student.installmentsPaid);

    if (newInstallments !== null) {
        student.installmentsPaid = newInstallments;
        // Update localStorage
        localStorage.setItem('students', JSON.stringify(students));
        loadStudents();
    }
}

// Function to delete student
function deleteStudent(studentId) {
    // Confirm deletion
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    
    if (confirmDelete) {
        // Filter out the student with the matching id
        students = students.filter(student => student.id !== studentId);
        
        // Update localStorage
        localStorage.setItem('students', JSON.stringify(students));
        
        // Reload the student table
        loadStudents();
        
        alert("Student deleted successfully!");
    }
}

// Load students initially when the page is loaded
window.onload = loadStudents;