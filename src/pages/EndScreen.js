import styled from "styled-components";
import { media } from "../utils/media";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { quizInitialState } from "../reducers/quizReducer";

const EndScreen = () => {
  const navigate = useNavigate();

  const [progressDetails, setProgressDetails] = useState({});

  useEffect(() => {
    let getQuizData = localStorage.getItem("quizProgress");
    if (getQuizData) {
      setProgressDetails(JSON.parse(getQuizData));
    }
  }, []);

  const resetQuiz = () => {
    localStorage.setItem("quizProgress", JSON.stringify(quizInitialState));
    navigate("/quiz");
  };

  const text =
    progressDetails?.currentLevel === "hard" &&
    progressDetails?.score >= progressDetails.minScoreLvl
      ? "Congratulations! You've completed all levels!"
      : `You failed at the ${progressDetails.currentLevel} level. Try again`;

  return (
    <QuizScreenContainer>
      <Title>{text}</Title>
      <ScoreParent>
        <YourScore>
          <YourScoreText>Your Score</YourScoreText>
          <ScoreContainer>
            <Score>{progressDetails?.score}</Score>
            <Line />
            <Score>{progressDetails.outOfScore}</Score>
          </ScoreContainer>
        </YourScore>
        <YourScore>
          <YourScoreText>Required Score</YourScoreText>
          <ScoreContainer>
            <Score>{progressDetails.minScoreLvl}</Score>
            <Line />
            <Score>{progressDetails.outOfScore}</Score>
          </ScoreContainer>
        </YourScore>
      </ScoreParent>
      <StartButton onClick={resetQuiz}>Restart Quiz</StartButton>
    </QuizScreenContainer>
  );
};

export default EndScreen;

const YourScoreText = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 15px;
`;
const YourScore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ScoreParent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  border-top: 1px solid #ffffff;
`;
const Score = styled.p`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
`;
const ScoreContainer = styled.div`
  height: 70px;
  width: 70px;
  border: 1px solid #ffffff;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0px 20px;
`;

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

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  color: #ffffff;

  @media ${media.mobile} {
    font-size: 24px;
  }
`;

const StartButton = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #ffffff;
  color: #3b82f6;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: rgb(226, 223, 223);
  }
`;
