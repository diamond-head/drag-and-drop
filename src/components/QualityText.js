import React from "react";

export default function QualityText({ color, text }) {
  return (
    <div className="w-[110px] text-center">
      <span className={`${color} text-base font-bold`}>{text}</span>
    </div>
  );
}
