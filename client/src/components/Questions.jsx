import React from "react";

const Question = ({ questions }) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel mt-4"
    //   data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {questions &&
          questions.map((question, idx) => {
            return idx == 0 ? (
              <div className="carousel-item active" key={idx}>
                <img
                  className="key img-fluid"
                  src={question}
                  alt="..."
                  style={{ height: "50%", width: "50%" }}
                />
              </div>
            ) : (
              <div className="carousel-item" key={idx}>
                <img
                  className="key"
                  src={question}
                  alt="..."
                  style={{ height: "50%", width: "50%" }}
                />
              </div>
            );
          })}
        {/* <div className="carousel-item active">
          <img className="key" src="images/pseudo_img.png" alt />
        </div>
        <div className="carousel-item">
          <img className="key" src="images/pseudo_img.png" alt />
        </div>
        <div className="carousel-item">
          <img lassName="key" src="images/pseudo_img.png" alt />
        </div> */}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Question;
