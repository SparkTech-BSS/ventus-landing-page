import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { api } from "services/api";
import { HighlightedCardEvent } from "../HighlightedCardEvent";
import useEmblaCarousel from "embla-carousel-react";
import { HighlightedEventData } from "data";
import useInterval from "hooks/useInterval";
import { HighlightedEventDotButton } from "../HighlightedEventDotButton";
import styles from "./styles.module.scss";

export function HighlightedEvent() {
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [viewportRef, embla] = useEmblaCarousel({
    align: "center",
    skipSnaps: false,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<any>([]);
  const [delay, setDelay] = useState(2000);
  const [isRunning, setIsRunning] = useState(true);

  const scrollTo = useCallback(
    (index: any) => embla && embla.scrollTo(index),
    [embla]
  );
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  useInterval(
    () => {
      if (selectedIndex === scrollSnaps.length - 1) {
        scrollTo(0);
      } else {
        scrollNext();
      }
    },
    isRunning ? delay : null
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await api.get(`events/findbyhighlighted/${true}`);
      setEvents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(events)

  return (
    <section
      className={`section ${styles["highlighted-event"]}`}
      id="event"
      aria-label="highlighted-event"
    >
      <div className={`container ${styles.container}`}>
        <div className={styles["header-row"]}>
          <h1 className={`section-heading`}>Destaques</h1>

          <Link href="/events" shallow={true}>
            <a className={styles["se-more"]}>Ver mais</a>
          </Link>
        </div>

        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {HighlightedEventData.map((item: any) => {
              return (
                <div className="embla__slide" key={item.id}>
                  <div className="embla__slide__inner">
                    <HighlightedCardEvent {...item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${styles["highlighted-event-dots"]}`}>
          {scrollSnaps.map((snap: any, index: number) => (
            <HighlightedEventDotButton
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
              key={index}
            />
          ))}
        </div>

        {/* <div className={`${styles["carousel-wrapper"]}`}>
          {HighlightedEventData.map((item: any) => {
            return <HighlightedCardEvent key={item.id} {...item} />;
          })}
        </div> */}
      </div>
    </section>
  );
}
