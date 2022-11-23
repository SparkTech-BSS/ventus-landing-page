import * as Checkbox from "@radix-ui/react-checkbox";
import { BsCheck } from "react-icons/bs";
import styles from "./styles.module.scss";

export type CheckedState = boolean | 'indeterminate';

interface Props {
  value?: CheckedState;
  onCheckedChange: (value: CheckedState) => void;
}

export function CheckBox({ value, onCheckedChange }:Props) {
  return (
    <Checkbox.Root
      className={`${styles["CheckboxRoot"]}`}
      // defaultChecked
      id="c1"
      onCheckedChange={onCheckedChange}
    >
      <Checkbox.Indicator className={`${styles["CheckboxIndicator"]}`}>
        <BsCheck size={24}/>
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}
