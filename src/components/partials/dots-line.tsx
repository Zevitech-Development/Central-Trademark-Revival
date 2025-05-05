import React from "react";

const DotsLine = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1 h-1 rounded-full bg-secondary" />
      <div className="w-1 h-1 rounded-full bg-secondary" />
      <div className="w-1 h-1 rounded-full bg-secondary" />
      <div className="h-[3px] w-16 bg-secondary rounded-lg" />
    </div>
  );
};

export default DotsLine;
