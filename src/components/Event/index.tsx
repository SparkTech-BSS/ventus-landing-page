import { useRef, useState, useEffect } from "react";
import { EventCard } from "../EventCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper as SwiperCore } from "swiper/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./styles.module.scss";

interface Props {
  data: any;
}

export function Event({ data }: Props) {
  const swiperRef = useRef<SwiperCore>();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <section
      className={`section ${styles.event}`}
      id="event"
      aria-label="event"
    >
      <div className={`container ${styles.container}`}>
        <div className={styles["header-row"]}>
          <h1 className={`section-heading`}>Eventosdssssssssss</h1>

          <Link href="/events" shallow={true}>
            <a className={styles["se-more"]}>Ver mais</a>
          </Link>
        </div>

        <div className={`${styles["carousel-wrapper"]}`}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            // slidesPerView={"auto"}
            // centeredSlides={true}
            draggable
            updateOnWindowResize
            observer
            freeMode={true}
            // cssMode={true}
            // loop={typeof window !== 'undefined' ? true : false}
            observeParents
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              disabledClass: 'disabled_swiper_button'
            }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="swiper"
          >
            {data.map((item: any) => {
              return (
                <SwiperSlide key={item?.event?._id}>
                  <EventCard data={item?.event} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button
            className={`${styles["btn-event-carousel"]} ${styles["btn-event-carousel--prev"]} swiper-button-prev`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            {/* <IoIosArrowBack size={28} /> */}
          </button>
          <button
            className={`${styles["btn-event-carousel"]} ${styles["btn-event-carousel--next"]} swiper-button-next`}
            onClick={() => swiperRef.current?.slideNext()}
          >
            {/* <IoIosArrowForward size={28} /> */}
          </button>
        </div>

        <Link href="/events" passHref>
          <button className={styles["btn-buy-ticket"]}>
            Comprar ingressos
          </button>
        </Link>
      </div>
    </section>
  );
}
