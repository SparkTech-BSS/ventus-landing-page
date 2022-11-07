import { usePagination, DOTS } from "hooks/usePagination";
import styles from "./styles.module.scss";

export function CustomPagination(props: any) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={styles["pagination-container"]}>
      <button
        className={`${styles["pagination-item"]} ${
          currentPage === 1 && styles["disabled"]
        }`}
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        <div className={`${styles["arrow"]} ${styles["left"]}`} />
      </button>
      {paginationRange.map((pageNumber: any, index: number) => {
        if (pageNumber === DOTS) {
          return (
            <button
              key={index}
              className={`${styles["pagination-item"]} ${styles["dots"]}`}
            >
              &#8230;
            </button>
          );
        }

        return (
          <button
            key={index}
            className={`${styles["pagination-item"]} ${
              pageNumber === currentPage && styles["selected"]
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className={`${styles["pagination-item"]} ${
          currentPage === lastPage && styles["disabled"]
        }`}
        onClick={onNext}
        disabled={currentPage === lastPage}
      >
        <div className={`${styles["arrow"]} ${styles["right"]}`} />
      </button>
    </div>
  );
}
