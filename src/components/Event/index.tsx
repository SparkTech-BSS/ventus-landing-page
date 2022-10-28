import { useState, useEffect } from "react";
import { EventCard } from "../EventCard";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import styles from "./styles.module.scss";
import { useEvents } from "hooks/api/events";

interface Props {
  data: any;
}

export function Event({ data }: Props) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      breakpoints: {
        "(min-width: 575px)": {
          slides: { perView: 1, spacing: 5 },
        },
        "(min-width: 600px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 992px)": {
          slides: { perView: 3, spacing: 5 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3, spacing: 10 },
        },
        "(min-width: 1200px)": {
          slides: { perView: 4, spacing: 10 },
        },
      },
      loop: true,
      slides: { perView: 1 },
      initial: 0,
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className={`section ${styles.event}`}
      id="event"
      aria-label="event"
    >
      <div className={`container ${styles.container}`}>
        <div className={styles["header-row"]}>
          <h1 className={`section-heading`}>Eventos</h1>

          <Link href="/events" shallow={true}>
            <a className={styles["se-more"]}>Ver mais</a>
          </Link>
        </div>

        {mounted && (
          <div className={`${styles["carousel-wrapper"]}`}>
            <div ref={ref} className="keen-slider">
              {data?.map((item: any) => {
                return (
                  <div className="keen-slider__slide" key={item?.event?._id}>
                    <EventCard data={item?.event} />
                  </div>
                );
              })}
            </div>

            {loaded && instanceRef.current && (
              <div className="dots">
                {Array.from(
                  Array(
                    instanceRef?.current?.track?.details?.slides?.length
                  ).keys()
                ).map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef?.current?.moveToIdx(idx);
                      }}
                      className={
                        "dot" + (currentSlide === idx ? " active" : "")
                      }
                    ></button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <button className={styles["btn-buy-ticket"]}>Comprar ingressos</button>
      </div>
    </section>
  );
}
