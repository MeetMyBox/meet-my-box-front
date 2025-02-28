import logo from "@assets/logo_mob.svg";
import { useStore } from "@nanostores/react";
import { BurgerButton } from "@shared/ui/Burger/ui/burger-button";
import Button from "@shared/ui/Button/ui/button";
import { isMenuOpen } from "@stores/menuState";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface IHeader {
  isMobile?: boolean;
}

export const Header: React.FC<IHeader> = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isDropdown2, setIsDropdown2] = useState(false);
  // let dropdownTimeout1: number;
  // let dropdownTimeout2: number;
  const handleMouseEnter = (setter: any) => {
    if (setter === setIsDropdown) {
      setIsDropdown2(false);
    } else {
      setIsDropdown(false);
    }
    // clearTimeout(timer); // Clear any existing timeout
    setter(true); // Show the dropdown
  };

  const handleMouseLeave = (setter: any) => {
    setTimeout(() => {
      setter(false); // Hide the dropdown after 3 seconds
    }, 3000); // Adjust the delay to 3000ms (3 seconds)
  };

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
  const menuOpen = useStore(isMenuOpen);

  // Function to toggle the menu state
  const toggleMenu = () => {
    isMenuOpen.set(!menuOpen);
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
      <header className={styles.header_pc}>
        <img
          className={styles.header_pc__logo}
          src={logo.src}
          onClick={() => (window.location.href = "/")}
          alt="Logotype"
        />
        <nav className={styles.header_pc__nav}>
          <a
            className={`${styles.header_pc__nav__link} ${styles.hover_link}`}
            onMouseEnter={() => handleMouseEnter(setIsDropdown)}
            onMouseLeave={() => handleMouseLeave(setIsDropdown)}
            href="/#calculate-pc"
          >
            Отправить посылку
          </a>
          {isDropdown && (
            <div className={styles.dropdown}>
              <ul className={styles.dropdown__list}>
                <li className={styles.dropdown__list__item}>
                  <a className="text-main hover:underline" href="/#process-pc">
                    Как это работает
                  </a>
                </li>
                <li className={styles.dropdown__list__item}>
                  <a className="text-main hover:underline" href="/cost">
                    Стоимость
                  </a>
                </li>
                <li className={styles.dropdown__list__item}>
                  <a
                    className="text-main hover:underline"
                    href="/#calculate-pc"
                  >
                    Заказать
                  </a>
                </li>
                <li className={styles.dropdown__list__item}>
                  <a className="text-main hover:underline" href="/#faq">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          )}
          <a
            className={`${styles.header_pc__nav__link} ${styles.hover_link2}`}
            href="/#contacts-pc"
            onMouseEnter={() => handleMouseEnter(setIsDropdown2)}
            onMouseLeave={() => handleMouseLeave(setIsDropdown2)}
          >
            Помощь с покупкой
          </a>
          {isDropdown2 && (
            <div className={styles.dropdown2}>
              <ul className={styles.dropdown2__list}>
                <li className={styles.dropdown2__list__item}>
                  <a className="text-main hover:underline" href="/#process-pc">
                    Как это работает
                  </a>
                </li>
                <li className={styles.dropdown2__list__item}>
                  <a className="text-main hover:underline" href="/cost">
                    Стоимость
                  </a>
                </li>
                <li className={styles.dropdown2__list__item}>
                  <a
                    className="text-main hover:underline"
                    href="/#calculate-pc"
                  >
                    Заказать
                  </a>
                </li>
                <li className={styles.dropdown2__list__item}>
                  <a className="text-main hover:underline" href="/#faq">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          )}
          <a className={styles.header_pc__nav__link} href="/cost">
            Стоимость
          </a>
          {userEmail ? (
            <span
              className={`${styles.header_pc__email} cursor-pointer`}
              onClick={() => (window.location.href = "/profile")}
            >
              Личный кабинет
            </span>
          ) : (
            <Button
              text="Войти"
              buttonType="filled"
              onClick={() => {
                window.location.href = "/login";
              }}
            />
          )}
        </nav>
      </header>
    </>
  );
};
