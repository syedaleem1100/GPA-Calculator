// Select elements
const coursesBody = document.getElementById("courses-body");
const addCourseBtn = document.getElementById("add-course-btn");
const calculateBtn = document.getElementById("calculate-btn");
const gpaDisplay = document.getElementById("gpa");

// Grade to GPA mapping
const gradePoints = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0
};

// Add first course row by default
addCourse();

// Event listeners
addCourseBtn.addEventListener("click", addCourse);
calculateBtn.addEventListener("click", calculateGPA);

// Function to add a new course row
function addCourse() {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" placeholder="Course Name"></td>
        <td><input type="number" min="0" placeholder="Credits"></td>
        <td>
            <select>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
        </td>
        <td><button onclick="removeCourse(this)">Delete</button></td>
    `;

    coursesBody.appendChild(row);
}

// Function to remove a course row
function removeCourse(button) {
    const row = button.parentElement.parentElement;
    coursesBody.removeChild(row);
}

// Function to calculate GPA
function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;

    const rows = coursesBody.querySelectorAll("tr");
    rows.forEach(row => {
        const creditInput = row.querySelector("td:nth-child(2) input");
        const gradeSelect = row.querySelector("td:nth-child(3) select");

        const credits = parseFloat(creditInput.value);
        const grade = gradeSelect.value;

        if (!isNaN(credits) && gradePoints[grade] !== undefined) {
            totalCredits += credits;
            totalPoints += credits * gradePoints[grade];
        }
    });

    const gpa = totalCredits === 0 ? 0 : totalPoints / totalCredits;
    gpaDisplay.textContent = gpa.toFixed(2);
}
