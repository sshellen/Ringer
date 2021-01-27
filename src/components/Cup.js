import React from "react";

const wiggleRoom = 35;
const size = 20;

const Cup = ({ id, manifest }) => {
  return (
    <div id={id} className="cup">
      {manifest === "empty" ? (
        <img src="./svg/cup.svg" className="empty" />
      ) : manifest === "bomb" ? (
        <img src="./svg/bomb.svg" className="bomb" />
      ) : manifest === "pie" ? (
        <img src="./svg/pie.svg" className="pie" />
      ) : (
        <img src="./png/ringer.png" className="ringer" />
      )}
    </div>
  );
};

export default Cup;
