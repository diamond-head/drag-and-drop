import React from "react";

export default function ArrowCenter({
  label = 'THE NEXT CHAPTER',
  onCTAClick,
  arrowPos = {},
  hideCta = false
}) {
  if (arrowPos?.position === 'BOTTOM') {
    return (
      <div style={{ display: arrowPos?.hide && 'none' }} className="my-4">
        <div className="flex flex-col items-center"  style={{ position: 'absolute', bottom: '-20%', left: arrowPos?.value[0] }}>
          <div className="my-2">
            <div className="h-0 w-0 border-x-4 border-x-transparent border-b-[12px]"></div>
            <div className="h-[100px] border-2 w-[2px]" style={{marginLeft: 2, height: 200}}></div>
          </div>
          <div className="text-center font-medium">
            <div className="">YOU</div>
            <div className="">ARE</div>
            <div className="">HERE</div>
          </div>
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
      {!hideCta && (
        <button className="bg-sky-800 font-bold text-lg text-white" onClick={onCTAClick}>
          {label}
        </button>
      )}
    </div>
  );
}
