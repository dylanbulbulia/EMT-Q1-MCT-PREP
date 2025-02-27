{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww8860\viewh18540\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 let questions = [];\
let currentSet = 0;\
let score = 0;\
const questionsPerSet = 5;\
\
document.addEventListener("DOMContentLoaded", () => \{\
    fetch('questions.json')\
        .then(response => response.json())\
        .then(data => \{\
            questions = shuffleArray(data);\
            showNextSet();\
        \})\
        .catch(error => console.error("Error loading questions:", error));\
\});\
\
function showNextSet() \{\
    if (currentSet * questionsPerSet >= questions.length) \{\
        document.getElementById("quiz-container").classList.add("hidden");\
        document.getElementById("final-score").classList.remove("hidden");\
        document.getElementById("score").innerText = `Your Score: $\{score\}/$\{questions.length\}`;\
        return;\
    \}\
\
    document.getElementById("question-area").innerHTML = "";\
    document.getElementById("result").innerText = "";\
\
    let questionSubset = questions.slice(currentSet * questionsPerSet, (currentSet + 1) * questionsPerSet);\
    questionSubset.forEach((q, index) => \{\
        let questionDiv = document.createElement("div");\
        questionDiv.innerHTML = `<p>$\{q.question\}</p>`;\
        q.options.forEach((option, i) => \{\
            questionDiv.innerHTML += `<input type="radio" name="q$\{index\}" value="$\{i\}"> $\{option\}<br>`;\
        \});\
        document.getElementById("question-area").appendChild(questionDiv);\
    \});\
\
    document.getElementById("next-btn").onclick = checkAnswers;\
\}\
\
function checkAnswers() \{\
    let questionSubset = questions.slice(currentSet * questionsPerSet, (currentSet + 1) * questionsPerSet);\
    let correctCount = 0;\
    let resultsText = "";\
\
    questionSubset.forEach((q, index) => \{\
        let selected = document.querySelector(`input[name="q$\{index\}"]:checked`);\
        if (selected) \{\
            if (parseInt(selected.value) === q.answer) \{\
                correctCount++;\
                resultsText += `\uc0\u9989  Correct: $\{q.question\}\\n`;\
            \} else \{\
                resultsText += `\uc0\u10060  Incorrect: $\{q.question\}\\nCorrect Answer: $\{q.options[q.answer]\}\\nExplanation: $\{q.explanation\}\\n\\n`;\
            \}\
        \} else \{\
            resultsText += `\uc0\u10060  Skipped: $\{q.question\}\\nCorrect Answer: $\{q.options[q.answer]\}\\nExplanation: $\{q.explanation\}\\n\\n`;\
        \}\
    \});\
\
    score += correctCount;\
    document.getElementById("result").innerText = resultsText;\
    currentSet++;\
\}\
\
function restartQuiz() \{\
    currentSet = 0;\
    score = 0;\
    fetch('questions.json')\
        .then(response => response.json())\
        .then(data => \{\
            questions = shuffleArray(data);\
            document.getElementById("quiz-container").classList.remove("hidden");\
            document.getElementById("final-score").classList.add("hidden");\
            showNextSet();\
        \});\
\}\
\
function shuffleArray(array) \{\
    return array.sort(() => Math.random() - 0.5);\
\}}