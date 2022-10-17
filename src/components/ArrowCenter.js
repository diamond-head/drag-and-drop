import React from "react";

export default function ArrowCenter({
  label = 'THE NEXT CHAPTER',
  onCTAClick,
  arrowPos = {}
}) {
  if (arrowPos?.position === 'BOTTOM') {
    return (
      <div style={{ position: 'absolute', bottom: 0, left: arrowPos.value[0] }}>
        <div className="my-2 flex flex-column items-center">
          <div className="h-0 w-0 border-x-4 border-x-transparent border-b-[12px] border-b-black"></div>
          <div className="h-[100px] border-2 border-black w-[2px]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="arrow-center flex">
      <div className="w-full my-2 flex items-center">
        <div className="h-[2px] border-2 border-black w-full"></div>
        <div className="h-0 w-0 border-y-4 border-y-transparent border-l-[12px] border-l-black"></div>
      </div>
      <button className="bg-sky-800 font-bold text-lg text-white" onClick={onCTAClick}>
        {label}
      </button>
    </div>
  );
}
