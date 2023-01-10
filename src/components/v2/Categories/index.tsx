import { useRef, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./styles.module.scss";
import { CATEGORIES_DATA } from "data";
import "keen-slider/keen-slider.min.css";

export function Categories() {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  return (
    <section className={styles["categories"]}>
      <div className={`container ${styles["container"]}`}>
        <h2 className={`${styles["heading"]}`}>Categorias de eventos</h2>

        <div className={`${styles["categories-carousel"]}`}>
          <div className="embla__viewport" ref={viewportRef}>
            <div className="embla__container__categories">
              {CATEGORIES_DATA.map((item: any) => {
                return (
                  <div className="embla__categories_slide" key={item.id}>
                    <a
                      key={item.id}
                      className={`${styles["category-card"]} ${
                        styles[`image-${item.id}`]
                      }`}
                    >
                      <div className={`${styles["category-card-title"]}`}>
                        <span>{item.name}</span>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
