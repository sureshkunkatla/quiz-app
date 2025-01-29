import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { media } from "../utils/media";

const StartScreen = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <Container>
      <Title>Welcome to the Quiz App</Title>
      <StartButton onClick={startQuiz}>Start Quiz</StartButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;

  @media ${media.mobile} {
    font-size: 24px;
  }
`;

const StartButton = styled.button`
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #2563eb;
  }
`;

export default StartScreen;
