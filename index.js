const coursesBody = document.getElementById("courses-body");
const addCourseBtn = document.getElementById("add-course-btn");
const calculateBtn = document.getElementById("calculate-btn");
const gpaDisplay = document.getElementById("gpa");

// Add new course row
addCourseBtn.addEventListener("click", () => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" placeholder="Course Name"></td>
        <td><input type="number" min="0" step="0.5" placeholder="Credit"></td>
        <td>
            <select>
                <option value="4">A</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2">C</option>
                <option value="1.7">C-</option>
                <option value="1">D</option>
                <option value="0">F</option>
            </select>
        </td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    coursesBody.appendChild(row);

    // Delete row
    row.querySelector(".delete-btn").addEventListener("click", () => {
        row.remove();
    });
});

// Calculate GPA
calculateBtn.addEventListener("click", () => {
    const rows = coursesBody.querySelectorAll("tr");
    let totalCredits = 0;
    let totalPoints = 0;

    rows.forEach(row => {
        const credit = parseFloat(row.cells[1].querySelector("input").value) || 0;
        const grade = parseFloat(row.cells[2].querySelector("select").value) || 0;

        totalCredits += credit;
        totalPoints += credit * grade;
    });

    const gpa = totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
    gpaDisplay.textContent = gpa;
});
