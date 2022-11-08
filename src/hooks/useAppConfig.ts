import { useState } from "react";

export function useAppConfig() {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isActiveSidebarMobile, setIsActiveSidebarMobile] =
    useState<boolean>(false);

  function handleToggleSidebar() {
    setToggleSidebar(!toggleSidebar);
  }

  return {
    handleToggleSidebar,
    toggleSidebar,
    setToggleSidebar,
    isMobile,
    setIsMobile,
    isActiveSidebarMobile,
    setIsActiveSidebarMobile,
  };
}
