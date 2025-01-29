import { useState } from "react";
import styled from "styled-components";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";

const MultipleChoiceQue = ({ questionObj, onAnswerSelect, answerStatus }) => {
  const [selectedOption, setSelectedOption] = useState();

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onAnswerSelect(value);
  };

  return (
    <QuestionContainer>
      <QuestionText>{questionObj.question}</QuestionText>
      <OptionsContainer>
        {questionObj?.options.map((each) => {
          return (
            <OptionContainer key={each}>
              <OptionLeft>
                <CheckboxInput
                  type="checkbox"
                  value={each}
                  checked={selectedOption === each}
                  onChange={handleOptionChange}
                  disabled={answerStatus ? true : false}
                />
                <CheckboxInputText>{each}</CheckboxInputText>
              </OptionLeft>
              <OptionRight>
                {selectedOption === each && answerStatus === "wrong" && (
                  <p>{<StyledWrongIcon />}</p>
                )}
                {answerStatus && questionObj.correctAnswer === each && (
                  <p>{<StyledCheckIcon />}</p>
                )}
              </OptionRight>
            </OptionContainer>
          );
        })}
      </OptionsContainer>
    </QuestionContainer>
  );
};

export default MultipleChoiceQue;

const QuestionContainer = styled.div`
  padding: 20px;
`;
const QuestionText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  text-align: left;
`;
const OptionsContainer = styled.div``;
const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0px;
  border-radius: 5px;
`;
const CheckboxInput = styled.input``;
const CheckboxInputText = styled.p`
  margin-left: 10px;
  font-size: 14px;
`;
const OptionLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const OptionRight = styled.div``;
const StyledCheckIcon = styled(FaRegCircleCheck)`
  color: rgb(0, 207, 0);
  font-size: 16px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2); /* Slight zoom on hover */
  }
`;

const StyledWrongIcon = styled(IoCloseCircleOutline)`
  color: rgb(226, 1, 1);
  font-size: 18px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2); /* Slight zoom on hover */
  }
`;
