import React from "react";
import type { CSSProperties, MouseEventHandler } from "react";

interface AnimatedButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  onClick,
  disabled = false,
  className = "",
}) => {
  const originalStyle: CSSProperties = {
    background: "#fff",
    color: "#d100b2ff",
    display: "grid",
    inset: "0",
    placeContent: "center",
    position: "absolute",
    transition: "transform 0.3s cubic-bezier(0.87, 0, 0.13, 1)",
  };

  const lettersContainerStyle: CSSProperties = {
    display: "inline-flex",
  };

  const spanStyle: CSSProperties = {
    opacity: 0,
    transform: "translateY(-15px)",
    transition: "transform 0.3s cubic-bezier(0.87, 0, 0.13, 1), opacity 0.3s",
    display: "inline-block", // importante para respetar el espacio
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const originalDiv = e.currentTarget.querySelector(".original") as HTMLDivElement | null;
    if (originalDiv) originalDiv.style.transform = "translateY(100%)";

    const spans = e.currentTarget.querySelectorAll(".letters span");
    spans.forEach((span: Element, i: number) => {
      const s = span as HTMLSpanElement;
      if (s.textContent !== "\u00A0") {
        s.style.opacity = "1";
        s.style.transform = "translateY(0)";
        s.style.transitionDelay = `${i * 0.1}s`;
      }
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const originalDiv = e.currentTarget.querySelector(".original") as HTMLDivElement | null;
    if (originalDiv) originalDiv.style.transform = "translateY(0)";

    const spans = e.currentTarget.querySelectorAll(".letters span");
    spans.forEach((span: Element, i: number) => {
      const s = span as HTMLSpanElement;
      if (s.textContent === "\u00A0") {
        s.style.opacity = "0";
        s.style.transform = "translateY(0)";
      } else {
        s.style.opacity = "0";
        s.style.transform = i % 2 === 0 ? "translateY(-15px)" : "translateY(15px)";
        s.style.transitionDelay = "0s";
      }
    });
  };

  return (
    <button
      className={`relative font-extrabold overflow-hidden rounded-full block text-lg px-8 py-6 transition-all duration-300 ${className}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        textTransform: "uppercase",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
      }}
    >
      <div className="original" style={originalStyle}>
        {text}
      </div>
      <div className="letters" style={lettersContainerStyle}>
        {text.split("").map((letter: string, index: number) => (
          <span
            key={index}
            style={{
              ...spanStyle,
              width: letter === " " ? "0.5rem" : "auto",
              transform: letter === " " ? "translateY(0)" : index % 2 === 0 ? "translateY(-15px)" : "translateY(15px)",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </button>
  );
};

export default AnimatedButton;
