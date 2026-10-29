const students=[{name: "John Doe", course: "Computer Science", marks: 85},
    {name: "Jane Smith", course: "Electronics", marks: 90},
    {name: "nivedithan@mulearn",course: "Computer Science",marks: 95}
]

const studentList = document.getElementById("student-list");
const searchInput = document.getElementById("search-input");
const courseFilter = document.getElementById("course-filter");
const marksFilter = document.getElementById("marks-filter");
const sortBy = document.getElementById("sort-by");
const totalStudents = document.getElementById("total-students");
const averageMarks = document.getElementById("average-marks");
const topper = document.getElementById("topper");

console.log(studentList);
function displayStudents(studentArray) {

    studentArray.forEach(function(student) {
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        row.appendChild(nameCell);
        let courseCell = document.createElement("td");
        courseCell.textContent = student.course;
        row.appendChild(courseCell);
        let marksCell = document.createElement("td");
        marksCell.textContent = student.marks;
        row.appendChild(marksCell);
        studentList.appendChild(row);
    });
}

function updateStatistics(studentArray) {
    totalStudents.textContent = studentArray.length;

    const totalMarks = studentArray.reduce(function(total, student) {
        return total + student.marks;
    }, 0);

    const average = studentArray.length === 0
        ? 0
        : totalMarks / studentArray.length;

    averageMarks.textContent = average.toFixed(2);

    if (studentArray.length === 0) {
        topper.textContent = "None";
    } else {
        const topStudent = studentArray.reduce(function(best, student) {
            return student.marks > best.marks ? student : best;
        });

        topper.textContent = topStudent.name + " (" + topStudent.marks + ")";
    }
}

function applyFilters() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCourse = courseFilter.value;
    const minimumMarks = marksFilter.value;

    const filteredStudents = students.filter(function(student) {
        const matchesName = student.name.toLowerCase().includes(searchText);
        const matchesCourse = selectedCourse === "" || student.course === selectedCourse;
        const matchesMarks = minimumMarks === "" || student.marks >= Number(minimumMarks);

        return matchesName && matchesCourse && matchesMarks;
    });
    const sortOption = sortBy.value;

    if (sortOption === "name") {
        filteredStudents.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }
    if (sortOption === "marks-asc") {
        filteredStudents.sort(function(a, b) {
            return a.marks - b.marks;
        });
    }

    if (sortOption === "marks-desc") {
        filteredStudents.sort(function(a, b) {
            return b.marks - a.marks;
        });
    }
    studentList.innerHTML = "";
    displayStudents(filteredStudents);
    updateStatistics(filteredStudents);
}

searchInput.addEventListener("input", applyFilters);
courseFilter.addEventListener("change", applyFilters);
marksFilter.addEventListener("input", applyFilters);
sortBy.addEventListener("change", applyFilters);

displayStudents(students);
updateStatistics(students);