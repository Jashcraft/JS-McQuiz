var start = document.querySelector('#startBtn');
var quizContainer = document.querySelector('#quiz-section');
var counter = 100;
var timeDisplay = document.querySelector('#timer');
var quizTimer;
var questionsIndexPosition = 0;
var questions = [
    {
        questionText: 'Interest in diamonds in this color soared when Ben gave Jen a big one set in her engagement ring.',
        choices: ['Pink', 'Red', 'White', 'A Fire Truck'],
        answer: 'Pink'
    },
    {
        questionText: 'Frederic Henry, the protagonist of this Hemingway novel, is in the Italian ambulance service during World War I.',
        choices: ['A Farewell To Arms', 'A Winters Tale', 'A Fire Truck', 'Baby: by Justin Bieber'],
        answer: 'A Farewell To Arms'
    },
    {
        questionText: 'The smallest of the Great Lakes, it has a surface area of about 7,500 square miles.',
        choices: ['A Fire Truck', 'Atlantic Ocean', 'Lake Ontario', 'Chad Lake'],
        answer: 'Lake Ontario'
    },
    {
        questionText: 'This sophisticated invention is often used to rid residential homes of flames.',
        choices: ['Thoughts and Prayers', 'The Slim Jim', 'A Winters Tale', 'A Fire Truck'],
        answer: 'A Fire Truck'
    }
];


function endScreen () {
    clearInterval(quizTimer);
    var score = document.createElement('h1')
    score.textContent = 'Score: ' + counter;
    quizContainer.append(score);
};


function answerChecker() {
    var answerVerify = document.createElement('h1');
    var nextButton = document.createElement('button')
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.addEventListener('click', function () {
        questionsIndexPosition++;
        quizContainer.innerHTML = '';
        if (questionsIndexPosition < questions.length) {
            displayQuestion();
        }
        else{
            endScreen();
        }

    })

    if (this.textContent === questions[questionsIndexPosition].answer) {
        // say you did good 
        answerVerify.textContent = 'CORRECT!'
    }
    else {
        // say you did bad
        answerVerify.textContent = 'Less Correct Than it probably could have been ...'
        counter -= 5;
        if (counter < 0) {
            counter = 0;
        }
    }
    quizContainer.appendChild(answerVerify);
    quizContainer.appendChild(nextButton);
}

function displayQuestion() {
    var questionTitleHeader = document.createElement('h2');
    questionTitleHeader.textContent = "Question:";
    questionTitleHeader.className = "question-title";

    var questionContent = document.createElement('h3');
    questionContent.textContent = questions[questionsIndexPosition].questionText;
    questionContent.className = "questions-content";

    var answersDiv = document.createElement('div');
    answersDiv.className = 'answer-selection';

    questions[questionsIndexPosition].choices.forEach(choice => {
        var choiceButton = document.createElement('button');
        choiceButton.className = 'answer-button';
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", answerChecker);
        answersDiv.appendChild(choiceButton);
    });
    quizContainer.appendChild(questionTitleHeader);
    quizContainer.appendChild(questionContent);
    quizContainer.appendChild(answersDiv);
};

function loadQuiz() {
    quizContainer.innerHTML = '';
    quizTimer = setInterval(function () {
        counter--;
        timeDisplay.textContent = counter;
        if (counter <= 0) {
            endScreen();
        }
    }, 1000)

    displayQuestion();
}


start.addEventListener("click", loadQuiz);