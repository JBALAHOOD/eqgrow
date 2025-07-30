// EQGrow - Main JavaScript File

// Global state management
const AppState = {
    currentPage: 'home',
    user: {
        current_streak: 0,
        total_exercises_completed: 0,
        completed_days: [],
        eq_score: 0
    },
    exercises: [
        {
            id: 1,
            title: "Mindful Breathing",
            description: "Practice deep breathing to center yourself and become more aware of your emotional state.",
            instructions: "Find a quiet place, sit comfortably, and focus on your breath. Inhale for 4 counts, hold for 4, exhale for 4. Repeat for 5 minutes.",
            category: "self_awareness",
            duration_minutes: 5,
            difficulty: "Beginner"
        },
        {
            id: 2,
            title: "Emotion Labeling",
            description: "Identify and label your emotions throughout the day to build self-awareness.",
            instructions: "When you notice an emotion, pause and name it. Ask yourself: What am I feeling? Why am I feeling this way?",
            category: "self_awareness",
            duration_minutes: 3,
            difficulty: "Beginner"
        },
        {
            id: 3,
            title: "Active Listening Practice",
            description: "Practice truly listening to others without interrupting or planning your response.",
            instructions: "Focus completely on the speaker. Maintain eye contact, nod, and ask clarifying questions. Avoid thinking about your response while they speak.",
            category: "empathy",
            duration_minutes: 10,
            difficulty: "Intermediate"
        },
        {
            id: 4,
            title: "Stress Management",
            description: "Learn to manage stress through progressive muscle relaxation.",
            instructions: "Sit or lie down comfortably. Tense each muscle group for 5 seconds, then relax for 10 seconds. Work through your entire body.",
            category: "self_regulation",
            duration_minutes: 8,
            difficulty: "Intermediate"
        },
        {
            id: 5,
            title: "Gratitude Practice",
            description: "Cultivate gratitude by reflecting on positive aspects of your life.",
            instructions: "Write down 3 things you're grateful for today. Be specific and reflect on why each brings you joy.",
            category: "motivation",
            duration_minutes: 5,
            difficulty: "Beginner"
        }
    ],
    journalEntries: [],
    assessmentQuestions: [
        {
            id: 1,
            category: "self_awareness",
            question: "I am usually aware of my emotions as they occur.",
            type: "scale"
        },
        {
            id: 2,
            category: "self_awareness", 
            question: "I understand what triggers my emotional reactions.",
            type: "scale"
        },
        {
            id: 3,
            category: "self_regulation",
            question: "I can stay calm under pressure.",
            type: "scale"
        },
        {
            id: 4,
            category: "self_regulation",
            question: "I think before I act when I'm upset.",
            type: "scale"
        },
        {
            id: 5,
            category: "empathy",
            question: "I can easily sense when others are feeling uncomfortable.",
            type: "scale"
        },
        {
            id: 6,
            category: "empathy",
            question: "I'm good at understanding other people's emotions.",
            type: "scale"
        },
        {
            id: 7,
            category: "social_skills",
            question: "I'm comfortable talking to new people.",
            type: "scale"
        },
        {
            id: 8,
            category: "social_skills",
            question: "I can resolve conflicts effectively.",
            type: "scale"
        },
        {
            id: 9,
            category: "motivation",
            question: "I stay motivated even when facing setbacks.",
            type: "scale"
        },
        {
            id: 10,
            category: "motivation",
            question: "I set goals and work persistently toward them.",
            type: "scale"
        }
    ],
    assessmentAnswers: {},
    currentAssessmentQuestion: 0
};

// DOM Elements
const elements = {
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    navLinks: document.querySelectorAll('.nav-link'),
    pages: document.querySelectorAll('.page'),
    completeExerciseBtn: document.getElementById('completeExerciseBtn'),
    completionStatus: document.getElementById('completionStatus'),
    currentStreak: document.getElementById('currentStreak'),
    totalExercises: document.getElementById('totalExercises'),
    monthlyProgress: document.getElementById('monthlyProgress'),
    weeklyProgress: document.getElementById('weeklyProgress'),
    weeklyProgressFill: document.getElementById('weeklyProgressFill'),
    exerciseTitle: document.getElementById('exerciseTitle'),
    exerciseDescription: document.getElementById('exerciseDescription'),
    exerciseInstructions: document.getElementById('exerciseInstructions'),
    exerciseCategory: document.getElementById('exerciseCategory'),
    exerciseDuration: document.getElementById('exerciseDuration'),
    exerciseDifficulty: document.getElementById('exerciseDifficulty'),
    journalModal: document.getElementById('journalModal'),
    journalForm: document.getElementById('journalForm'),
    journalContent: document.getElementById('journalContent'),
    closeModal: document.getElementById('closeModal'),
    cancelEntry: document.getElementById('cancelEntry'),
    newEntryBtn: document.getElementById('newEntryBtn'),
    journalEntries: document.getElementById('journalEntries'),
    questionContainer: document.getElementById('questionContainer'),
    questionCounter: document.getElementById('questionCounter'),
    progressPercentage: document.getElementById('progressPercentage'),
    assessmentProgressFill: document.getElementById('assessmentProgressFill'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn')
};

// Initialize the application
function init() {
    loadUserData();
    setupEventListeners();
    loadTodayExercise();
    updateStats();
    setupFloatingOrbs();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Mobile sidebar toggle
    if (elements.sidebarToggle) {
        elements.sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Exercise completion
    if (elements.completeExerciseBtn) {
        elements.completeExerciseBtn.addEventListener('click', completeExercise);
    }

    // Journal modal
    if (elements.newEntryBtn) {
        elements.newEntryBtn.addEventListener('click', openJournalModal);
    }

    if (elements.closeModal) {
        elements.closeModal.addEventListener('click', closeJournalModal);
    }

    if (elements.cancelEntry) {
        elements.cancelEntry.addEventListener('click', closeJournalModal);
    }

    if (elements.journalForm) {
        elements.journalForm.addEventListener('submit', handleJournalSubmit);
    }

    // Assessment navigation
    if (elements.prevBtn) {
        elements.prevBtn.addEventListener('click', previousQuestion);
    }

    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', nextQuestion);
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === elements.journalModal) {
            closeJournalModal();
        }
    });

    // Handle hash changes for navigation
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
}

// Navigation handling
function handleNavigation(e) {
    e.preventDefault();
    const page = e.currentTarget.getAttribute('data-page');
    navigateToPage(page);
}

function handleHashChange() {
    const hash = window.location.hash.slice(1) || 'home';
    navigateToPage(hash);
}

function navigateToPage(page) {
    // Update active nav link
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });

    // Hide all pages
    elements.pages.forEach(p => p.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.classList.add('active');
        AppState.currentPage = page;
        
        // Load page-specific content
        loadPageContent(page);
    }

    // Update URL
    window.location.hash = page;

    // Close mobile sidebar
    if (window.innerWidth < 1024) {
        elements.sidebar.classList.remove('active');
    }
}

function loadPageContent(page) {
    switch (page) {
        case 'home':
            loadTodayExercise();
            updateStats();
            break;
        case 'journal':
            loadJournalEntries();
            break;
        case 'assessment':
            loadAssessment();
            break;
        case 'progress':
            loadProgress();
            break;
        case 'profile':
            loadProfile();
            break;
    }
}

// Sidebar functionality
function toggleSidebar() {
    elements.sidebar.classList.toggle('active');
}

// Exercise functionality
function loadTodayExercise() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const exerciseIndex = dayOfYear % AppState.exercises.length;
    const todayExercise = AppState.exercises[exerciseIndex];

    if (todayExercise && elements.exerciseTitle) {
        elements.exerciseTitle.textContent = todayExercise.title;
        elements.exerciseDescription.textContent = todayExercise.description;
        elements.exerciseInstructions.textContent = todayExercise.instructions;
        elements.exerciseCategory.textContent = todayExercise.category.replace('_', ' ');
        elements.exerciseDuration.textContent = `${todayExercise.duration_minutes} min`;
        elements.exerciseDifficulty.textContent = todayExercise.difficulty;

        // Check if completed today
        const today = new Date().toISOString().split('T')[0];
        const hasCompletedToday = AppState.user.completed_days.includes(today);
        
        if (hasCompletedToday) {
            elements.completionStatus.style.display = 'flex';
            elements.completeExerciseBtn.style.display = 'none';
        } else {
            elements.completionStatus.style.display = 'none';
            elements.completeExerciseBtn.style.display = 'inline-flex';
        }
    }
}

function completeExercise() {
    const today = new Date().toISOString().split('T')[0];
    
    if (!AppState.user.completed_days.includes(today)) {
        // Add today to completed days
        AppState.user.completed_days.push(today);
        
        // Calculate new streak
        let newStreak = 1;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (AppState.user.completed_days.includes(yesterdayStr)) {
            newStreak = AppState.user.current_streak + 1;
        }

        // Update user data
        AppState.user.current_streak = newStreak;
        AppState.user.total_exercises_completed += 1;
        AppState.user.last_exercise_date = today;

        // Save to localStorage
        saveUserData();

        // Update UI
        elements.completionStatus.style.display = 'flex';
        elements.completeExerciseBtn.style.display = 'none';
        updateStats();

        // Show success animation
        showSuccessAnimation();
    }
}

function showSuccessAnimation() {
    const btn = elements.completeExerciseBtn;
    btn.innerHTML = '<i class="fas fa-check"></i> Completed!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Great job! Come back tomorrow for a new exercise.';
    }, 1000);
}

// Stats and progress
function updateStats() {
    if (elements.currentStreak) {
        elements.currentStreak.textContent = AppState.user.current_streak;
    }

    if (elements.totalExercises) {
        elements.totalExercises.textContent = AppState.user.total_exercises_completed;
    }

    if (elements.monthlyProgress) {
        const monthStart = new Date();
        monthStart.setDate(1);
        const monthlyCount = AppState.user.completed_days.filter(date => 
            new Date(date) >= monthStart
        ).length;
        elements.monthlyProgress.textContent = monthlyCount;
    }

    if (elements.weeklyProgress) {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weeklyCount = AppState.user.completed_days.filter(date => 
            new Date(date) >= weekAgo
        ).length;
        elements.weeklyProgress.textContent = `${weeklyCount}/7`;
        
        if (elements.weeklyProgressFill) {
            const percentage = (weeklyCount / 7) * 100;
            elements.weeklyProgressFill.style.width = `${percentage}%`;
        }
    }
}

// Journal functionality
function openJournalModal() {
    elements.journalModal.classList.add('active');
    elements.journalContent.focus();
}

function closeJournalModal() {
    elements.journalModal.classList.remove('active');
    elements.journalForm.reset();
}

function handleJournalSubmit(e) {
    e.preventDefault();
    
    const content = elements.journalContent.value.trim();
    if (!content) return;

    const entry = {
        id: Date.now(),
        content: content,
        date: new Date().toISOString(),
        prompt: "How are you feeling today?"
    };

    AppState.journalEntries.unshift(entry);
    saveJournalEntries();
    loadJournalEntries();
    closeJournalModal();
}

function loadJournalEntries() {
    if (!elements.journalEntries) return;

    if (AppState.journalEntries.length === 0) {
        elements.journalEntries.innerHTML = `
            <div class="text-center py-8">
                <div class="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-pen text-sage-400 text-2xl"></i>
                </div>
                <h3 class="text-lg font-semibold text-sage-700 mb-2">Start your reflection journey</h3>
                <p class="text-sage-600 mb-4">Begin with your first journal entry to track your emotional growth.</p>
                <button class="btn btn-outline" onclick="openJournalModal()">Write First Entry</button>
            </div>
        `;
    } else {
        elements.journalEntries.innerHTML = AppState.journalEntries.map((entry, index) => `
            <div class="journal-entry" style="animation-delay: ${index * 0.1}s">
                <div class="entry-header">
                    <span class="entry-date">${formatDate(entry.date)}</span>
                </div>
                <div class="entry-content">
                    <p>${entry.content}</p>
                </div>
            </div>
        `).join('');
    }
}

// Assessment functionality
function loadAssessment() {
    if (AppState.currentAssessmentQuestion >= AppState.assessmentQuestions.length) {
        showAssessmentResults();
        return;
    }

    const question = AppState.assessmentQuestions[AppState.currentAssessmentQuestion];
    const progress = ((AppState.currentAssessmentQuestion + 1) / AppState.assessmentQuestions.length) * 100;

    if (elements.questionCounter) {
        elements.questionCounter.textContent = `Question ${AppState.currentAssessmentQuestion + 1} of ${AppState.assessmentQuestions.length}`;
    }

    if (elements.progressPercentage) {
        elements.progressPercentage.textContent = `${Math.round(progress)}% Complete`;
    }

    if (elements.assessmentProgressFill) {
        elements.assessmentProgressFill.style.width = `${progress}%`;
    }

    if (elements.questionContainer) {
        elements.questionContainer.innerHTML = `
            <div class="question-content">
                <h3 class="question-text">${question.question}</h3>
                <div class="scale-options">
                    ${[1, 2, 3, 4, 5].map(num => `
                        <label class="scale-option">
                            <input type="radio" name="question${question.id}" value="${num}" 
                                   ${AppState.assessmentAnswers[question.id] === num ? 'checked' : ''}>
                            <span class="scale-label">${num}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="scale-labels">
                    <span>Strongly Disagree</span>
                    <span>Strongly Agree</span>
                </div>
            </div>
        `;

        // Add event listeners to radio buttons
        const radioButtons = elements.questionContainer.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                AppState.assessmentAnswers[question.id] = parseInt(e.target.value);
                updateAssessmentButtons();
            });
        });
    }

    updateAssessmentButtons();
}

function updateAssessmentButtons() {
    const currentQuestion = AppState.assessmentQuestions[AppState.currentAssessmentQuestion];
    const hasAnswered = AppState.assessmentAnswers[currentQuestion.id];

    if (elements.prevBtn) {
        elements.prevBtn.disabled = AppState.currentAssessmentQuestion === 0;
    }

    if (elements.nextBtn) {
        elements.nextBtn.disabled = !hasAnswered;
        
        if (AppState.currentAssessmentQuestion === AppState.assessmentQuestions.length - 1) {
            elements.nextBtn.innerHTML = '<i class="fas fa-check"></i> Complete Assessment';
        } else {
            elements.nextBtn.innerHTML = 'Next Question <i class="fas fa-arrow-right"></i>';
        }
    }
}

function previousQuestion() {
    if (AppState.currentAssessmentQuestion > 0) {
        AppState.currentAssessmentQuestion--;
        loadAssessment();
    }
}

function nextQuestion() {
    if (AppState.currentAssessmentQuestion < AppState.assessmentQuestions.length - 1) {
        AppState.currentAssessmentQuestion++;
        loadAssessment();
    } else {
        calculateAssessmentResults();
    }
}

function calculateAssessmentResults() {
    // Calculate category scores
    const categoryScores = {
        self_awareness: 0,
        self_regulation: 0,
        empathy: 0,
        social_skills: 0,
        motivation: 0
    };

    const categoryCounts = {
        self_awareness: 0,
        self_regulation: 0,
        empathy: 0,
        social_skills: 0,
        motivation: 0
    };

    AppState.assessmentQuestions.forEach(question => {
        const answer = AppState.assessmentAnswers[question.id];
        if (answer) {
            categoryScores[question.category] += answer;
            categoryCounts[question.category]++;
        }
    });

    // Calculate averages
    Object.keys(categoryScores).forEach(category => {
        if (categoryCounts[category] > 0) {
            categoryScores[category] = categoryScores[category] / categoryCounts[category];
        }
    });

    const totalScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 5;
    const percentageScore = Math.round(totalScore * 20);

    // Update user's EQ score
    AppState.user.eq_score = percentageScore;
    saveUserData();

    showAssessmentResults(percentageScore, categoryScores);
}

function showAssessmentResults(totalScore, categoryScores) {
    if (!elements.questionContainer) return;

    const recommendations = generateRecommendations(categoryScores);

    elements.questionContainer.innerHTML = `
        <div class="results-container">
            <div class="results-header">
                <h2>Your EQ Assessment Results</h2>
                <div class="overall-score">
                    <div class="score-circle">
                        <span class="score-number">${totalScore}%</span>
                        <span class="score-label">Overall EQ Score</span>
                    </div>
                </div>
            </div>
            
            <div class="category-scores">
                <h3>Category Breakdown</h3>
                <div class="score-grid">
                    ${Object.entries(categoryScores).map(([category, score]) => `
                        <div class="category-score">
                            <div class="category-name">${category.replace('_', ' ')}</div>
                            <div class="category-value">${Math.round(score * 20)}%</div>
                            <div class="category-bar">
                                <div class="bar-fill" style="width: ${score * 20}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="recommendations">
                <h3>Recommendations</h3>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            
            <div class="results-actions">
                <button class="btn btn-primary" onclick="restartAssessment()">
                    <i class="fas fa-redo"></i> Take Assessment Again
                </button>
            </div>
        </div>
    `;

    // Hide navigation buttons
    if (elements.prevBtn) elements.prevBtn.style.display = 'none';
    if (elements.nextBtn) elements.nextBtn.style.display = 'none';
}

function generateRecommendations(scores) {
    const recommendations = [];
    const sortedCategories = Object.entries(scores).sort(([,a], [,b]) => a - b);
    
    const categoryRecommendations = {
        self_awareness: "Practice mindful observation of your emotions throughout the day. Try journaling about your feelings and their triggers.",
        self_regulation: "Learn breathing techniques and pause before reacting to emotional situations. Develop healthy coping strategies.",
        empathy: "Practice active listening and try to understand others' perspectives. Pay attention to non-verbal cues.",
        social_skills: "Work on your communication skills and practice building rapport with others. Join social activities or groups.",
        motivation: "Set clear, achievable goals and celebrate small wins. Focus on your personal values and what drives you."
    };

    // Add recommendations for the two lowest scoring categories
    for (let i = 0; i < Math.min(2, sortedCategories.length); i++) {
        const [category] = sortedCategories[i];
        recommendations.push(categoryRecommendations[category]);
    }

    return recommendations;
}

function restartAssessment() {
    AppState.currentAssessmentQuestion = 0;
    AppState.assessmentAnswers = {};
    
    if (elements.prevBtn) elements.prevBtn.style.display = 'inline-flex';
    if (elements.nextBtn) elements.nextBtn.style.display = 'inline-flex';
    
    loadAssessment();
}

// Progress functionality
function loadProgress() {
    // This would load progress charts and data
    console.log('Loading progress page');
}

// Profile functionality
function loadProfile() {
    // This would load profile data
    console.log('Loading profile page');
}

// Data persistence
function saveUserData() {
    localStorage.setItem('eqgrow_user', JSON.stringify(AppState.user));
}

function loadUserData() {
    const saved = localStorage.getItem('eqgrow_user');
    if (saved) {
        AppState.user = { ...AppState.user, ...JSON.parse(saved) };
    }
}

function saveJournalEntries() {
    localStorage.setItem('eqgrow_journal', JSON.stringify(AppState.journalEntries));
}

function loadJournalEntries() {
    const saved = localStorage.getItem('eqgrow_journal');
    if (saved) {
        AppState.journalEntries = JSON.parse(saved);
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function setupFloatingOrbs() {
    const container = document.querySelector('.app-container');
    if (container) {
        for (let i = 0; i < 3; i++) {
            const orb = document.createElement('div');
            orb.className = 'floating-orb';
            container.appendChild(orb);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export for global access
window.EQGrow = {
    AppState,
    completeExercise,
    openJournalModal,
    restartAssessment
};