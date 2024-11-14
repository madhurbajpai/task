import { useNavigate } from "react-router-dom";
import "./Card.css";
import React from "react";

const Card = (props) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="one-card" 
      style={{ backgroundColor: props.color }}
      onClick={() => navigate(`${props.loc}`)}>
        <span className="title">{props.title}</span>
      </div>
    </>
  );
};

export default Card;
