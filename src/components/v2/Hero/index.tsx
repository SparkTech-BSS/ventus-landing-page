import { useState } from "react";
import Link from "next/link";
import { HERO_CAROUSEL } from "data";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./styles.module.scss";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slides: {
        origin: "center",
        perView: 1,
        //   spacing: 0,
      },
      vertical: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );


  

  return (
    <section className={`${styles["hero"]}`} aria-label="hero">
      <div ref={ref} className="keen-slider" style={{ height: 620 }}>
        {HERO_CAROUSEL.map((item: any, index: number) => {
          return (
            <div
              key={item?.id}
              className="keen-slider__slide keen-slider__slide__hero"
            >
              <div
                className={`${styles["hero-wrapper"]} ${
                  styles[`hero-wrapper-${index + 1}`]
                }`}
                style={{ backgroundImage: `url(${item?.image})` }}
              >
                <div className={`container ${styles.container}`}>
                  <div className={styles["hero-content"]}>
                    {item.id === 1 && (
                      <h1 className={`${styles["heading"]}`}>
                        ENCONTRE <span>EVENTOS</span> EM ANGOLA
                      </h1>
                    )}

                    {item.id === 2 && (
                      <h1 className={`${styles["heading"]}`}>
                        ENCONTRE <span>SHOWS</span> <span>INDIVIDUAIS</span> OU{" "}
                        <span>COMÉDIA</span>
                      </h1>
                    )}

                    {item.id === 3 && (
                      <h1 className={`${styles["heading"]}`}>
                        E MUITO MAIS <span>EVENTOS</span> AO SEU GOSTO
                      </h1>
                    )}

                    <div className={`${styles["btn-group"]}`}>
                      <Link href="/events" passHref>
                        <a className={`${styles.btn} ${styles["btn-full"]}`}>
                          Encontrar Eventos
                        </a>
                      </Link>

                      <Link href="#" passHref>
                        <a className={`${styles.btn} ${styles["btn-outline"]}`}>
                          Publicar Evento
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loaded && instanceRef.current && (
        <div className="dots-hero-vertical">
          {Array.from(
            Array(instanceRef?.current?.track?.details?.slides?.length).keys()
          ).map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef?.current?.moveToIdx(idx);
                }}
                className={"dot dot-hero-vertical" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </section>
  );
}
