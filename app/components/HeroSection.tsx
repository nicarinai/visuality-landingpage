import { useState, useRef, useEffect, useCallback } from "react";

type SliderProps = {
  beforeSrc: string;
  afterSrc: string;
};

export default function HeroSection({ beforeSrc, afterSrc }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, isDragging]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <h1 className="text-5xl text-center pt-10 font-bold">
          건설 디자인 프로세스, 이제 AI로 자동화하세요.
        </h1>
      </div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none max-w-4xl m-5 rounded-lg"
      >
        {/* 큰 Visuality 타이포그래피 (배경) */}
        <h1 className="absolute text-[6rem] font-bold opacity-20 select-none p-5">
          Visuality
        </h1>
        {/* Before 이미지 */}
        <img
          src={beforeSrc}
          alt="Before"
          className="w-full h-full object-cover"
        />
        {/* After 이미지 (클리핑 처리) */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* 큰 Visuality 타이포그래피 (배경) */}
          <h1 className="absolute text-[6rem] font-bold opacity-80 select-none p-5 text-black">
            Visuality
          </h1>

          <img
            src={afterSrc}
            alt="After"
            className="w-full h-full object-cover object-left"
          />
        </div>
        {/* 슬라이더 핸들 */}
        <div
          role="button"
          tabIndex={0}
          className="absolute top-0 h-full"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <div className="w-[4px] h-full flex bg-white hover:text-blue-600 active:text-blue-600 hover:bg-blue-500 active:bg-blue-500   opacity-70 cursor-ew-resize">
            <div className="flex self-center justify-self-center -ml-[22px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className="size-6 rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
