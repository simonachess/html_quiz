const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Marketing Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Markup Leveler", correct: false },
        ],
    },
    {
        question: "Which of the following is the correct structure for an HTML document?",
        answers: [
            { text: "&lthtml&gt&lthead&gt&lt/head&gt&ltbody&gt&lt/body&gt&lt/html&gt", correct: true },
            { text: "&lthead&gt&lthtml&gt&lt/html&gt&ltbody&gt&lt/body&gt&lt/head&gt", correct: false },
            { text: "&ltbody&gt&lthead&gt&lt/head&gt&lthtml&gt&lt/html&gt&lt/body&gt", correct: false },
            { text: "&lthtml&gt&ltbody&gt&lt/body&gt&lthead&gt&lt/head&gt&lt/html&gt", correct: false }
        ],
    },
    {
        question: "Which HTML element is used to define the title of a document?",
        answers: [
            { text: "&lt;head&gt", correct: false },
            { text: "&lt;title&gt", correct: true },
            { text: "&lt;header&gt", correct: false },
            { text: "&lt;top&gt", correct: false }
        ],
    },
    {
        question: "What is the purpose of the &lt;body&gt tag in HTML?",
        answers: [
            { text: "It defines the document's head section.", correct: false },
            { text: "It contains all the content such as text, images, and links.", correct: true },
            { text: "It is used to define the main content of an HTML document.", correct: false },
            { text: "It specifies the body of the email content in HTML.", correct: false }
        ],
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "&lt;hyperhyperlink&gt", correct: false },
            { text: "&lt;link&gt", correct: false },
            { text: "&lt;a&gt", correct: true },
            { text: "&lt;href&gt", correct: false }
        ],
    },
    {
        question: "Which tag is used to display images in HTML?",
        answers: [
            { text: "&lt;img&gt", correct: true },
            { text: "&lt;image&gt", correct: false },
            { text: "&lt;src&gt", correct: false },
            { text: "&lt;pic&gt", correct: false }
        ],
    },
    {
        question: "What attribute is used to provide the path of an image in the &lt;img&gt tag?",
        answers: [
            { text: "link", correct: false },
            { text: "src", correct: true },
            { text: "href", correct: false },
            { text: "url", correct: false }
        ],
    },
    {
        question: "Which HTML tag is used to create an unordered list?",
        answers: [
            { text: "&lt;ul&gt", correct: true },
            { text: "&lt;ol&gt", correct: false },
            { text: "&lt;list&gt", correct: false },
            { text: "&lt;li&gt", correct: false }
        ],
    },
    {
        question: "What does the &lt;br&gt tag do?",
        answers: [
            { text: "It breaks the text into two sections.", correct: false },
            { text: "It creates a bold text.", correct: false },
            { text: "It inserts a line break.", correct: true },
            { text: "It adds a new row in a table.", correct: false }
        ],
    },
    {
        question: "In HTML, what does the `fieldset` tag do?",
        answers: [
            { text: "It is used to group related data in a form.", correct: true },
            { text: "It sets the field to a fixed size.", correct: false },
            { text: "It automatically validates the fields within a form.", correct: false },
            { text: "It hides the fields in a form.", correct: false }
        ],
    }
]

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const questionsLeft = document.querySelector('.questions-left');
const indicator = document.querySelector('.indicator');
const answerLetter = document.querySelector('.answer-letter');
const resultContainer = document.querySelector('.result-container');
const finalText = document.querySelector('.finish-text');
const progressBar = document.querySelector('.progress-bar');
const resultNumber = document.querySelector('.result-number');
const resultText = document.querySelector('.result-text');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Submit Answer";

    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionsLeft.innerHTML = `Question ${currentQuestionIndex + 1} out of ${questions.length}`;
    indicator.style.width = `${(currentQuestionIndex === 0 ? '0.1' : currentQuestionIndex) * 100 / questions.length}%`
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    const answerLetters = ['A', 'B', 'C', 'D'];

    currentQuestion.answers.map((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("btn");
        const answerLetter = document.createElement("span");
        answerLetter.classList.add("answer-letter");
        answerLetter.innerHTML = answerLetters[index];
        const answerText = document.createElement("span");
        answerText.classList.add("answer-text");
        answerText.innerHTML = answer.text;
        button.appendChild(answerLetter);
        button.appendChild(answerText);
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    questionsLeft.style.display = "block";
    questionElement.style.display = "block";
    progressBar.style.display = "block";
    answerButtons.style.display = "flex";
    finalText.style.display = "none";
    resultContainer.style.display = "none";
    nextButton.disabled = true;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    let selectBtn = e.target;
    if (selectBtn.tagName === 'SPAN') {
        selectBtn = selectBtn.parentNode;
    }
    selectBtn.classList.add("selected");
    Array.from(answerButtons.children).map(button => {
        button.classList.remove("selected");
    });
    selectBtn.classList.add("selected");
    nextButton.disabled = false;
    nextButton.innerHTML = "Submit Answer";
}

function submitAnswer() {
    Array.from(answerButtons.children).map(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
            if (button.classList.contains("selected")) {
                score++;
            }
        } else if (button.classList.contains("selected")) {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
    nextButton.innerHTML = "Next Question";
}

function showScore() {
    resetState();
    questionElement.style.display = "block";
    resultContainer.style.display = "flex";
    resultNumber.innerHTML = score;
    resultText.innerHTML = `out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    questionsLeft.style.display = "none";
    questionElement.style.display = "none";
    answerButtons.style.display = "none";
    progressBar.style.display = "none";
    finalText.style.display = "block";
    nextButton.disabled = false;
}

function handleNextButton() {
    if (nextButton.innerHTML === "Next Question") {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    } else if (nextButton.innerHTML === "Submit Answer") {
        submitAnswer();
    } else if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    }
}

nextButton.addEventListener("click", handleNextButton);

startQuiz();


