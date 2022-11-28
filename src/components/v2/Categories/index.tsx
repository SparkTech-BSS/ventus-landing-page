import { useRef, useEffect, useState } from "react";
import Image from "next/future/image";
import partyPNG from "../../../assets/png/categories/festa.png";
import styles from "./styles.module.scss";
import { CATEGORIES_DATA } from "data";

export function Categories() {
  const [position, setPosition] = useState({ top: 0, left: 0, x: 0, y: 0 });

  const categoriesCarouselRef =
    useRef() as React.MutableRefObject<HTMLDivElement>;

  function setBackgroundURL(imageURL: string | any) {
    return `linear-gradient(180deg, #1f1f1f 0%, rgba(31, 31, 31, 0) 100%),
    url(${imageURL}), #d9d9d9`;
  }

  const mouseMoveHandler = function (e: any) {
    // How far the mouse has been moved
    const dx = e.clientX - position.x;
    const dy = e.clientY - position.y;

    // Scroll the element
    categoriesCarouselRef.current.scrollTop = position.top - dy;
    categoriesCarouselRef.current.scrollLeft = position.left - dx;
  };

  const mouseUpHandler = function () {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);

    categoriesCarouselRef.current.style.cursor = "grab";
    categoriesCarouselRef.current.style.removeProperty("user-select");
  };

  const mouseDownHandler = function (e: any) {
    // categoriesCarouselRef.current.style.cursor = "grabbing";
    categoriesCarouselRef.current.style.userSelect = "none";

    setPosition({
      top: categoriesCarouselRef?.current?.scrollTop,
      left: categoriesCarouselRef?.current?.scrollLeft,
      x: e.clientX,
      y: e.clientY,
    });

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  useEffect(() => {
    categoriesCarouselRef.current.scrollTop = 181;
    categoriesCarouselRef.current.scrollLeft = 150;
  }, []);

  return (
    <section className={styles["categories"]}>
      <div className={`container ${styles["container"]}`}>
        <h2 className={`${styles["heading"]}`}>Categorias de eventos</h2>

        <div
          ref={categoriesCarouselRef}
          className={`${styles["categories-carousel"]}`}
          onMouseDown={mouseDownHandler}
        >
          {CATEGORIES_DATA.map((item: any) => {
            return (
              <a key={item.id} className={`${styles["category-card"]} ${styles[`image-${item.id}`]}`}>
                <div className={`${styles["category-card-title"]}`}>
                  <span>{item.name}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
