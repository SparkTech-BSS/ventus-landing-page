import { motion } from "framer-motion";
import {
  pageAnimation,
  fade,
  photoAnimation,
  lineAnimation,
  slider,
  sliderContainer,
  sliderMovie,
} from "../../utils";
import styles from "./styles.module.scss";

export function Rainbow() {
  return (
    <motion.section
      exit="exit"
    //   variants={pageAnimation}
      initial="hidden"
      animate="show"
      className={styles.rainbow}
    >
      <motion.div variants={sliderContainer}>
        <motion.div variants={slider} className={styles["framer"]} />
        <motion.div variants={slider} className={`${styles["framer"]} ${styles["framer-2"]}`} />
        <motion.div variants={slider} className={`${styles["framer"]} ${styles["framer-3"]}`} />
        <motion.div variants={slider} className={`${styles["framer"]} ${styles["framer-4"]}`} />
      </motion.div>
    </motion.section>
  );
}
