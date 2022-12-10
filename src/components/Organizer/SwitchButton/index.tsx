import * as Switch from "@radix-ui/react-switch";
import styles from "./styles.module.scss";

export type CheckedState = boolean | "indeterminate";

interface Props {
  value?: CheckedState | any;
  onCheckedChange: (value: CheckedState) => void;
}

export function SwitchButton({ value, onCheckedChange }:Props) {
  return (
    <Switch.Root
      className={`${styles["SwitchRoot"]}`}
      onCheckedChange={onCheckedChange}
      defaultChecked={value}
    >
      <Switch.Thumb className={`${styles["SwitchThumb"]}`} />
    </Switch.Root>
  );
}
