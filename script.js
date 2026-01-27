let questions = [];
let userAnswers = {};
let currentQuestionIndex = 0;
let totalCorrect = 0;

// Load questions from JSON files dynamically
async function loadQuestions() {
    try {
        // First, try to determine how many question files exist by attempting to load them
        questions = [];
        let questionNumber = 1;
        
        while (true) {
            try {
                const response = await fetch(`questions/${questionNumber}.json`);
                if (!response.ok) {
                    break; // Stop when we reach a non-existent file
                }
                const questionData = await response.json();
                questions.push(questionData);
                questionNumber++;
            } catch (error) {
                break; // Stop when we can't fetch a file
            }
        }
        
        if (questions.length === 0) {
            throw new Error('No questions found in questions folder');
        }
        
        initializeExam();
    } catch (error) {
        console.error('Error loading questions:', error);
        document.getElementById('loading').innerHTML = 
            `<div class="error">Error loading questions: ${error.message}. Please check your questions folder and files.</div>`;
    }
}

function initializeExam() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('questionContent').style.display = 'block';
    
    updateProgress();
    createQuestionList();
    showQuestion(0);
}

function createQuestionList() {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';
    
    questions.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'question-btn';
        btn.textContent = index + 1;
        btn.onclick = () => showQuestion(index);
        btn.dataset.index = index;
        questionList.appendChild(btn);
    });
}

function showQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    
    currentQuestionIndex = index;
    
    const question = questions[index];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    
    questionText.innerHTML = `${index + 1}. ${question.question}`;
    
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.onclick = () => selectOption(option.key);
        optionDiv.dataset.optionKey = option.key;
        
        optionDiv.innerHTML = `
            <span class="option-key">${option.key}.</span>
            <span class="option-text">${option.text}</span>
        `;
        
        // Check if this option was previously selected
        if (userAnswers[index] && userAnswers[index].includes(option.key)) {
            optionDiv.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    updateQuestionButtonStates();
    updateProgress();
    updateNavigationButtons();
}

function selectOption(optionKey) {
    const question = questions[currentQuestionIndex];
    const multiSelect = question.answers.platform.length > 1;
    
    if (multiSelect) {
        // For multiple answers, allow toggling selection
        if (!userAnswers[currentQuestionIndex]) {
            userAnswers[currentQuestionIndex] = [];
        }
        
        const currentSelection = userAnswers[currentQuestionIndex];
        const optionIndex = currentSelection.indexOf(optionKey);
        
        if (optionIndex > -1) {
            currentSelection.splice(optionIndex, 1);
        } else {
            currentSelection.push(optionKey);
        }
        
        // Update UI
        document.querySelectorAll('.option').forEach(opt => {
            if (currentSelection.includes(opt.dataset.optionKey)) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    } else {
        // For single answer, just select this option
        userAnswers[currentQuestionIndex] = [optionKey];
        
        document.querySelectorAll('.option').forEach(opt => {
            if (opt.dataset.optionKey === optionKey) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }
    
    updateQuestionButtonStates();
    updateNavigationButtons();
}

function submitAnswer() {
    const question = questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex] || [];
    const correctAnswer = question.answers.platform;
    
    const isCorrect = arraysEqual(userAnswer.sort(), correctAnswer.sort());
    
    // Add feedback classes to options
    document.querySelectorAll('.option').forEach(opt => {
        const optionKey = opt.dataset.optionKey;
        
        if (correctAnswer.includes(optionKey)) {
            opt.classList.add('correct');
        }
        
        if (userAnswer.includes(optionKey) && !correctAnswer.includes(optionKey)) {
            opt.classList.add('incorrect');
        }
    });
    
    // Disable options after submission
    document.querySelectorAll('.option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Update question button state
    updateQuestionButtonStates();
    
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;
    
    // Move to next question after delay
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            showQuestion(currentQuestionIndex + 1);
        } else {
            showResults();
        }
    }, 1500);
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function updateQuestionButtonStates() {
    const questionButtons = document.querySelectorAll('.question-btn');
    
    questionButtons.forEach((btn, index) => {
        btn.className = 'question-btn';
        
        if (userAnswers[index]) {
            const question = questions[index];
            const userAnswer = userAnswers[index];
            const correctAnswer = question.answers.platform;
            
            if (arraysEqual(userAnswer.sort(), correctAnswer.sort())) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('incorrect');
            }
        } else {
            btn.classList.add('answered');
        }
    });
}

function updateProgress() {
    document.getElementById('progressIndicator').textContent = 
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === questions.length - 1 || !userAnswers[currentQuestionIndex];
    
    // Enable submit button only if there's an answer selected
    submitBtn.disabled = !userAnswers[currentQuestionIndex] || 
                       (submitBtn.disabled === false && 
                        document.querySelector('.option.correct') !== null);
}

function showResults() {
    // Calculate final score
    totalCorrect = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i]) {
            const userAnswer = userAnswers[i];
            const correctAnswer = questions[i].answers.platform;
            if (arraysEqual(userAnswer.sort(), correctAnswer.sort())) {
                totalCorrect++;
            }
        }
    }
    
    const scorePercentage = Math.round((totalCorrect / questions.length) * 100);
    
    document.getElementById('questionDisplay').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}

function resetExam() {
    userAnswers = {};
    currentQuestionIndex = 0;
    totalCorrect = 0;
    
    document.getElementById('results').style.display = 'none';
    document.getElementById('questionDisplay').style.display = 'block';
    
    updateQuestionButtonStates();
    showQuestion(0);
}

// Function to toggle question panel expansion/collapse
function toggleQuestionPanel() {
    const panel = document.getElementById('questionsPanel');
    const toggleBtn = document.getElementById('togglePanelBtn');
    
    if (panel.classList.contains('collapsed')) {
        // Expand the panel
        panel.classList.remove('collapsed');
        toggleBtn.textContent = 'Collapse Panel';
    } else {
        // Collapse the panel
        panel.classList.add('collapsed');
        toggleBtn.textContent = 'Expand Panel';
    }
}

// Initialize the exam when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up the toggle button event listener
    document.getElementById('togglePanelBtn').onclick = toggleQuestionPanel;
    
    // Also allow clicking on the entire header to toggle
    document.getElementById('panelHeader').addEventListener('click', function(e) {
        // Only toggle if not clicking on the button itself
        if (e.target !== document.getElementById('togglePanelBtn')) {
            toggleQuestionPanel();
        }
    });
    
    // Start loading questions
    loadQuestions();
});