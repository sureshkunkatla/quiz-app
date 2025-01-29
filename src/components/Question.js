import React from "react";
import InputQue from "./InputQue";
import TrueFalseQue from "./TrueFalseQue";
import MultipleChoiceQue from "./MultipleChoiceQue";

const Question = ({ currentQuestion, onAnswerSelect, answerStatus }) => {
  switch (currentQuestion?.type) {
    case "multiple-choice":
      return (
        <MultipleChoiceQue
          questionObj={currentQuestion}
          onAnswerSelect={onAnswerSelect}
          answerStatus={answerStatus}
        />
      );
    case "true-false":
      return (
        <TrueFalseQue
          questionObj={currentQuestion}
          onAnswerSelect={onAnswerSelect}
          answerStatus={answerStatus}
        />
      );
    case "text-input":
      return (
        <InputQue
          questionObj={currentQuestion}
          onAnswerSelect={onAnswerSelect}
          answerStatus={answerStatus}
        />
      );
    default:
      return <div>Invalid question type</div>;
  }
};

export default Question;
