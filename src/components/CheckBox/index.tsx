import * as Checkbox from "@radix-ui/react-checkbox";
import { BsCheck } from "react-icons/bs";
import styles from "./styles.module.scss";

export function CheckBox() {
  return (
    <Checkbox.Root
      className={`${styles["CheckboxRoot"]}`}
      defaultChecked
      id="c1"
    >
      <Checkbox.Indicator className={`${styles["CheckboxIndicator"]}`}>
        <BsCheck size={24}/>
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}
