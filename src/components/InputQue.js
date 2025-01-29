import styled from "styled-components";

const InputQue = ({ questionObj, onAnswerSelect, answerStatus }) => {
  return (
    <QuestionContainer>
      <QuestionText>{questionObj.question}</QuestionText>
      <QuestionInput
        placeholder="Enter your answer..."
        onChange={(e) => onAnswerSelect(e.target.value)}
        disabled={answerStatus ? true : false}
      />
      {answerStatus && <AnswerText>Your answer is {answerStatus}</AnswerText>}
      {answerStatus === "wrong" && (
        <AnswerText>Correct Answer: {questionObj.correctAnswer}</AnswerText>
      )}
    </QuestionContainer>
  );
};

export default InputQue;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const QuestionText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  text-align: left;
`;

const QuestionInput = styled.input`
  outline: none;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0px;
  border-radius: 5px;
`;
const AnswerText = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  text-align: left;
`;
