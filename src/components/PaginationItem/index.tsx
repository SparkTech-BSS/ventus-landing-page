import styles from "./styles.module.scss";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ isCurrent = false, onPageChange, number } : PaginationItemProps ) {
    if (isCurrent) {
        return (
            <button 
                //className={styles[""]}
                disabled
            >
                {number}
            </button>
        )
    }

    return (
        <button
        onClick={() => onPageChange(number)}
        >
            {number}
        </button>
    )
}
