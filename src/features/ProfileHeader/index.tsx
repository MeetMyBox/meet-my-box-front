import logo from "@assets/logo_mob.svg";
import { useStore } from "@nanostores/react";
import { BurgerButton } from "@shared/ui/Burger/ui/burger-button";
import { isProfileMenuOpen } from "@stores/profileMenuState";
import { useEffect, useState } from "react";
import styles from "../../features/ui/Header/styles.module.scss";

interface IHeader {
  isMobile?: boolean;
}

export const ProfileHeader: React.FC<IHeader> = () => {
  const [_userEmail, setUserEmail] = useState(null);
  // const [_isDropdown, setIsDropdown] = useState(false);
  // const [_isDropdown2, setIsDropdown2] = useState(false);
  // let dropdownTimeout1: any;
  // let dropdownTimeout2: any;
  // const handleMouseEnter = (setter: any, timer: any) => {
  //   if (setter === setIsDropdown) {
  //     setIsDropdown2(false);
  //   } else {
  //     setIsDropdown(false);
  //   }
  //   clearTimeout(timer); // Clear any existing timeout
  //   setter(true); // Show the dropdown
  // };

  // const handleMouseLeave = (setter: any, timer: any) => {
  //   timer = setTimeout(() => {
  //     setter(false); // Hide the dropdown after 3 seconds
  //   }, 3000); // Adjust the delay to 3000ms (3 seconds)
  // };

  useEffect(() => {
    // Check for userData in localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserEmail(user.email); // Set the email if userData exists
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);
  // Access the menu state
  const menuOpen = useStore(isProfileMenuOpen);

  // Function to toggle the menu state
  const toggleMenu = () => {
    isProfileMenuOpen.set(!menuOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <img
          className={styles.header__logo}
          src={logo.src}
          alt="Logotype"
          onClick={() => (window.location.href = "/")}
        />
        <BurgerButton onClick={toggleMenu} />
      </header>
    </>
  );
};
