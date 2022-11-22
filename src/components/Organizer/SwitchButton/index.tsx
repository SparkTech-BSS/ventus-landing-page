import * as Switch from "@radix-ui/react-switch";
import styles from "./styles.module.scss";

export function SwitchButton() {
  return (
    <Switch.Root className={`${styles["SwitchRoot"]}`}>
      <Switch.Thumb className={`${styles["SwitchThumb"]}`} />
    </Switch.Root>
  );
}
