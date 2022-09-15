import React from "react";

const Question = ({ questions }) => {
  return (
    <div className="mt-4">
      <div className="d-flex gap-4 justify-content-center">
        {questions &&
          questions.map((question, idx) => {
            return (
              <a href={question} className="btn btn-success px-4" target="_blank">
                Question {idx+1}
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Question;
