import React, { useEffect, useReducer, useState } from "react";
import { loadQuestions } from "../utils/loadQuestions";
import styled from "styled-components";
import Question from "../components/Question";
import { useNavigate } from "react-router-dom";
import { media } from "../utils/media";
import { quizInitialState, quizReducer } from "../reducers/quizReducer";
import { difficultyLevel, levelScores, passScores } from "../utils/constants";

const QuizScreen = () => {
  const [state, dispatch] = useReducer(quizReducer, quizInitialState);
  const [timeLeft, setTimeLeft] = useState(15);
  const navigate = useNavigate();

  const {
    questions,
    currentLevel,
    currentQuestionIndex,
    currentQuestion,
    score,
    currentAnswer,
    answerStatus,
    quizFinished,
    difficultyIndex,
    outOfScore,
  } = state;

  useEffect(() => {
    const savedProgress = localStorage.getItem("quizProgress");
    if (savedProgress) {
      dispatch({ type: "UPDATE_STATE", payload: JSON.parse(savedProgress) });
    }
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && answerStatus === null && currentAnswer === null) {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          answerStatus: "wrong",
          outOfScore: outOfScore + levelScores[difficultyIndex],
        },
      });
      return;
    } else if (timeLeft === 0 && currentAnswer !== null) {
      handleSubmitAnswer();
      return;
    } else if (timeLeft === 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, timeLeft]);

  useEffect(() => {
    localStorage.setItem("quizProgress", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const loadedQuestions = loadQuestions(currentLevel);
    dispatch({
      type: "UPDATE_STATE",
      payload: { questions: loadedQuestions },
    });
  }, [currentLevel]);

  useEffect(() => {
    if (questions.length > 0) {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          currentQuestion: questions[currentQuestionIndex],
        },
      });
    }
  }, [questions, currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          currentQuestionIndex: currentQuestionIndex + 1,
          answerStatus: null,
          currentAnswer: null,
        },
      });
      setTimeLeft(15);
    } else {
      if (
        currentLevel === difficultyLevel[difficultyIndex] &&
        score < passScores[difficultyIndex]
      ) {
        dispatch({
          type: "UPDATE_STATE",
          payload: { quizFinished: true },
        });
      } else {
        if (difficultyIndex + 1 === difficultyLevel.length) {
          dispatch({
            type: "UPDATE_STATE",
            payload: {
              quizFinished: true,
            },
          });
        } else {
          setTimeLeft(15);
          dispatch({
            type: "UPDATE_STATE",
            payload: {
              currentLevel: difficultyLevel[difficultyIndex + 1],
              difficultyIndex: difficultyIndex + 1,
              currentQuestionIndex: 0,
              currentAnswer: null,
              answerStatus: null,
              minScoreLvl: passScores[difficultyIndex + 1],
            },
          });
        }
      }
    }
  };

  const onChangeText = (value) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { currentAnswer: value },
    });
  };

  const handleSubmitAnswer = () => {
    if (currentQuestion.correctAnswer === currentAnswer) {
      let addScore = levelScores[difficultyIndex];
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          answerStatus: "correct",
          score: score + addScore,
          outOfScore: outOfScore + levelScores[difficultyIndex],
        },
      });
    } else {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          answerStatus: "wrong",
          outOfScore: outOfScore + levelScores[difficultyIndex],
        },
      });
    }
  };

  if (quizFinished) {
    navigate("/end");
  }

  return (
    <QuizScreenContainer>
      <QuestionWrapper>
        <CardHeader>
          <ScoreText>Score: {score}</ScoreText>
          <ScoreText>{timeLeft}</ScoreText>
          <ScoreText>Difficulty: {currentLevel}</ScoreText>
        </CardHeader>
        <CardBody>
          <Question
            currentQuestion={currentQuestion}
            onAnswerSelect={onChangeText}
            answerStatus={answerStatus}
          />
        </CardBody>
        <CardFooter>
          <OptionButton
            onClick={handleNextQuestion}
            disabled={answerStatus ? false : true}
          >
            Next Question
          </OptionButton>
          <OptionButton
            onClick={() => setTimeLeft(0)}
            disabled={currentAnswer ? (answerStatus ? true : false) : true}
          >
            Submit Answer
          </OptionButton>
        </CardFooter>
      </QuestionWrapper>
    </QuizScreenContainer>
  );
};

export default QuizScreen;

const QuizScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #017bff;

  @media ${media.mobile} {
    padding: 0 20px;
  }
`;

const QuestionWrapper = styled.div`
  min-height: 400px;
  min-width: 500px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${media.mobile} {
    min-height: 300px;
    min-width: 300px;
  }
`;

const OptionButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  background-color: #027aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const ScoreText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;
const CardHeader = styled.div`
  height: 50px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid rgb(220, 220, 220);
  height: 50px;
`;
const CardBody = styled.div`
  flex: 1;
`;
