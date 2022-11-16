import React, {
  SelectHTMLAttributes,
  forwardRef,
  DetailedHTMLProps,
} from "react";

import styles from "./styles.module.scss";

type Option = {
  label: React.ReactNode;
  value: string | number;
};

type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: Option[];
  label: string;
  requiredSymbol?: boolean;
  errorMessage?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, requiredSymbol = false, errorMessage, options, ...props }, ref) => (
    <div className={`${styles["select-wrapper"]}`}>
      <div className={`${styles["label-row"]}`}>
        <label>{label}</label>
        <span className={`${requiredSymbol && styles.requiredSymbol}`}>*</span>
      </div>

      <select ref={ref} {...props}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <span className={`${styles["error-message"]}`}>{errorMessage}</span>
    </div>
  )
);
