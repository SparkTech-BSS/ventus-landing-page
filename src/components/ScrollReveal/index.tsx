import React, { useRef, useEffect, FC, CSSProperties } from "react";
import scrollReveal from "scrollreveal";
// import "./ScrollReveal.css";

interface ScrollRevealProps {
  style?: CSSProperties;
  children?: React.ReactNode
}

const ScrollReveal: FC<ScrollRevealProps> = ({ children, style }: any) => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (sectionRef.current)
      scrollReveal().reveal(sectionRef.current, {
        reset: true,
        delay: 500,
        origin: "top",
        distance: "30px",
        duration: 700,
      });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={style}
      className="container scroll-section"
      data-testid="section"
    >
      {children}
    </section>
  );
};

export default ScrollReveal;
