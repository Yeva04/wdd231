const courses = [
    { code: 'WDD 130', title: 'Web Fundamentals', credits: 3, completed: false, category: 'wdd' },
    { code: 'WDD 231', title: 'Web Development', credits: 3, completed: true, category: 'wdd' },
    { code: 'WDD 331', title: 'Advanced Web', credits: 3, completed: false, category: 'wdd' },
    { code: 'CSE 110', title: 'Intro to Programming', credits: 3, completed: false, category: 'cse' },
    { code: 'CSE 131', title: 'Algorithms', credits: 3, completed: false, category: 'cse' }
];

function filterCourses(category) {
    let filteredCourses = category === 'all' ? courses : courses.filter(course => course.category === category);
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = totalCredits;

    filteredCourses.forEach(course => {
        const div = document.createElement('div');
        div.className = 'course-card';
        div.textContent = course.code;
        if (course.completed) {
            div.style.backgroundColor = '#e0f7fa';
        }
        courseList.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => filterCourses('all'));