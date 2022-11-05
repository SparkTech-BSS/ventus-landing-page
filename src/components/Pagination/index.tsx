import { PaginationItem } from "components/PaginationItem";
import styles from "./styles.module.scss";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePageArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePageArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  function handlePreviousPages() {
    // TODO
  }

  function handleNextPages() {
    // TODO
  }

  return (
    <div className={styles["stack"]}>
      <div className={styles.box}>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </div>

      <div>
        
      </div>
    </div>
  );
}
