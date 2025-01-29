import questionsData from '../data/questions.json';

export const loadQuestions = (level) => {
  return questionsData[level] || [];
};
