import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./final.css";
const Final = () => {
  const colors = [
    {
      colorImg: "images/1.png",
      colorCode: "#FF0000",
      colorName: "Red",
    },
    {
      colorImg: "images/2.png",
      colorCode: "#FFA500",
      colorName: "Orange",
    },
    {
      colorImg: "images/3.png",
      colorCode: "#FFFF00",
      colorName: "Yellow",
    },
    {
      colorImg: "images/4.png",
      colorCode: "#008000",
      colorName: "Green",
    },
    {
      colorImg: "images/5.png",
      colorCode: "#0000FF",
      colorName: "Blue",
    },
  ];

  const navigate = useNavigate();
  const [colorCode, setColorcode] = useState("");
  const final = async (e) => {
    e.preventDefault();
    const response = await fetch("user/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({teamSolution:colorCode}),
    });
    const data = await response.json();
    if (response.status === 200) {
      navigate("/login");
    }
    console.log(data);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setColorcode(value);
  };
  return (
    <div className="bg_img">
      <div
        className="container-fluid d-flex p-5 text-light"
        style={{ minHeight: "100vh" }}
      >
        <div className="container border border-dark table-container w-50 p-3 mx-3 my-5">
          <table className="table">
            <thead>
              <tr className="text-light fw-bold">
                <th scope="col">#</th>
                <th scope="col">Color</th>
                <th scope="col">Color code</th>
                <th scope="col">Color Name</th>
              </tr>
            </thead>
            <tbody>
              {colors.map((color, index) => {
                return (
                  <tr className="text-light fw-bold" key={index}>
                    <th scope="row">{index}</th>
                    <td>{color.colorImg}</td>
                    <td>{color.colorCode}</td>
                    <td>{color.colorName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="container d-flex flex-column border border-light justify-content-center align-items-center ">
          <form
            onSubmit={final}
            className="d-flex flex-column border border-light justify-content-center align-items-center answer-div p-3"
          >
            <p className="fs-1 context">
              You have only one chance! be careful...
            </p>
            <input
              className="form-control w-50 p-3 mx-3 text-center"
              type="text"
              placeholder="Enter the code"
              name="colorCode"
              onChange={onChange}
              value={colorCode}
            />
            <button className="startBtn px-4 py-1 my-3">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Final;
