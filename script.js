let currentQuestionIndex = 0;
let score = 0;
let time = 60;
let timerInterval;
const questions = [
    {
        question: "Which continent is the largest by land area?",
        choices: ["Africa", "Asia", "North America", "South America"],
        answer: 1 // Asia
    },
    {
        question: "Which ocean is the largest by area?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3 // Pacific Ocean
    },
    {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        answer: 2 // Ottawa
    },
    {
        question: "Which river is the longest in the world?",
        choices: ["Nile River", "Amazon River", "Yangtze River", "Mississippi River"],
        answer: 0 // Nile River
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        choices: ["China", "India", "Japan", "South Korea"],
        answer: 2 // Japan
    },
    {
        question: "What is the largest desert in the world?",
        choices: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"],
        answer: 0 // Sahara Desert
    },
    {
        question: "Which mountain range is the longest in the world?",
        choices: ["Himalayas", "Andes", "Rocky Mountains", "Alps"],
        answer: 1 // Andes
    },
    {
        question: "What is the smallest country in the world by land area?",
        choices: ["Vatican City", "Monaco", "Maldives", "Singapore"],
        answer: 0 // Vatican City
    },
    {
        question: "Which city is located at the confluence of the Rhone and Saone rivers?",
        choices: ["Paris", "Rome", "Athens", "Lyon"],
        answer: 3 // Lyon
    },
    {
        question: "Which African country is known as the 'Pearl of Africa'?",
        choices: ["Kenya", "Nigeria", "Egypt", "Uganda"],
        answer: 3 // Uganda
    }
];

const selectedAnswers = []; // Store user-selected answers

function startQuiz() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElements = document.querySelectorAll('.choice');
    const currentQuestion = questions[currentQuestionIndex];
    
    questionElement.innerText = currentQuestion.question;
    choicesElements.forEach((button, index) => {
        button.innerText = currentQuestion.choices[index];
    });
}

function selectAnswer(choice) {
    selectedAnswers[currentQuestionIndex] = choice;
    const currentQuestion = questions[currentQuestionIndex];
    if (choice === currentQuestion.answer) {
        score++;
    }
    document.getElementById('current-score').innerText = score;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        document.getElementById('time').innerText = time;
        if (time === 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    const resultTable = document.getElementById('result-table');

    // Clear previous results
    resultTable.innerHTML = '';
    
    questions.forEach((question, index) => {
        const row = resultTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerText = "Question " + (index + 1);
        if (selectedAnswers[index] === question.answer) {
            cell2.innerText = "Congrats. You got it Right.";
        } else {
            cell2.innerText = "Wrong. Correct answer : " + question.choices[question.answer];
        }
    });

    document.getElementById('final-score').innerText = score;
}


function restartQuiz() {
    currentQuestionIndex=0;
    score = 0;
    time = 60;
    selectedAnswers.length = 0; // Clear selected answers array
    document.getElementById('time').innerText = time;
    document.getElementById('current-score').innerText = score;
    document.getElementById('result-container').style.display = 'none';
    startQuiz();
}

