import { difficultyLevel, passScores } from "../utils/constants";

const quizInitialState = JSON.parse(localStorage.getItem("quizProgress")) || {
  questions: [],
  currentLevel: difficultyLevel[0],
  currentQuestionIndex: 0,
  currentQuestion: null,
  currentAnswer: null,
  answerStatus: null,
  score: 0,
  minScoreLvl: passScores[0],
  outOfScore: 0,
  quizFinished: false,
  difficultyIndex: 0,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return { ...state, ...action.payload };
    case "RESET_STATE":
      return { ...quizInitialState };
    default:
      return state;
  }
};

export { quizReducer, quizInitialState };
