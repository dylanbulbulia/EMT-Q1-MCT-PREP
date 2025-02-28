document.addEventListener("DOMContentLoaded", () => {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = shuffleArray(data);
            showNextSet();
        })
        .catch(error => console.error("Error loading questions:", error));
});

let questions = [];
let currentSet = 0;
let score = 0;
const questionsPerSet = 5;

function showNextSet() {
    if (currentSet * questionsPerSet >= questions.length) {
        document.getElementById("quiz-container").classList.add("hidden");
        document.getElementById("final-score").classList.remove("hidden");
        document.getElementById("score").innerText = `Your Score: ${score}/${questions.length}`;
        return;
    }

    document.getElementById("question-area").innerHTML = "";
    document.getElementById("result").innerText = "";

    let questionSubset = questions.slice(currentSet * questionsPerSet, (currentSet + 1) * questionsPerSet);
    questionSubset.forEach((q, index) => {
        let questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach((option, i) => {
            questionDiv.innerHTML += `<input type="radio" name="q${index}" value="${i}"> ${option}<br>`;
        });
        document.getElementById("question-area").appendChild(questionDiv);
    });

    document.getElementById("next-btn").onclick = checkAnswers;
}

function checkAnswers() {
    let questionSubset = questions.slice(currentSet * questionsPerSet, (currentSet + 1) * questionsPerSet);
    let correctCount = 0;
    let resultsText = "";

    questionSubset.forEach((q, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            if (parseInt(selected.value) === q.answer) {
                correctCount++;
                resultsText += `✅ Correct: ${q.question}\n`;
            } else {
                resultsText += `❌ Incorrect: ${q.question}\nCorrect Answer: ${q.options[q.answer]}\nExplanation: ${q.explanation}\n\n`;
            }
        } else {
            resultsText += `❌ Skipped: ${q.question}\nCorrect Answer: ${q.options[q.answer]}\nExplanation: ${q.explanation}\n\n`;
        }
    });

    score += correctCount;
    document.getElementById("result").innerText = resultsText;
    currentSet++;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
