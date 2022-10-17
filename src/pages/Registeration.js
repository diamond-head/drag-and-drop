import React from "react";
import RegisterationForm from "../components/RegisterationForm";

export default function Registeration() {
  return (
    <div className="p-4">
      <div className="w-[200px] text-center">
        <span className="text-4xl font-bold">MY STORY SO FAR...</span>
      </div>
      <RegisterationForm />
    </div>
  );
}
