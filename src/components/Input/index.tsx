import React, { ComponentProps, forwardRef } from "react";

import styles from "./styles.module.scss";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  requiredSymbol?: boolean;
  errorMessage?: string;
  margin?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    requiredSymbol = false,
    errorMessage,
    margin,
    type = "text",
    ...props
  },
  ref
) {
  return (
    <div
      className={`${styles["input-wrapper"]}`}
      style={{ margin: margin ? margin : 0 }}
    >
      <div className={`${styles["label-row"]}`}>
        <label>{label}</label>
        <span className={`${requiredSymbol && styles.requiredSymbol}`}>*</span>
      </div>
      <input type={type} ref={ref} {...props} />
      <span className={`${styles["error-message"]}`}>{errorMessage}</span>
    </div>
  );
});
