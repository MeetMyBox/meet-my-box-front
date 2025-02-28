import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@shared/ui/Button/ui/button";
import styles from "../../Menu/ui/styles.module.scss";

import logo from "@assets/logo_mob.svg";
import { useStore } from "@nanostores/react";
import { isProfileMenuOpen } from "@stores/profileMenuState";
import { useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";

export const ProfileMenu = () => {
  const [userEmail, setUserEmail] = useState(null);
  const menuOpen = useStore(isProfileMenuOpen);

  const toggleMenu = () => {
    isProfileMenuOpen.set(!menuOpen);
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

  // const handleContactsNavigation = () => {
  //   window.location.href = "#contacts-mob";
  // };

  return (
    <>
      {menuOpen && (
        <Slide
          direction="down"
          className="w-full fixed z-50 flex bg-white h-full"
        >
          <aside className={styles.menu}>
            <FontAwesomeIcon
              icon={faClose}
              className={styles.menu__close}
              onClick={toggleMenu}
            />
            <img src={logo.src} className="w-[160px] mt-32" />
            <nav className="flex flex-col items-center gap-4 mt-8">
              <a className="text-dark text-xl" href="#">
                Главная
              </a>
              <a className="text-dark text-xl" href="/profile">
                Профиль
              </a>
              <a className="text-dark text-xl" href="/calculate">
                Новая посылка
              </a>
              <a className="text-dark text-xl" href="/address">
                Мои адреса
              </a>
              <a className="text-dark text-xl" href="/packages">
                Мои посылки
              </a>
              <a href="https://t.me/meetmbox" className="text-dark text-xl">
                Заказать
              </a>
            </nav>
            {userEmail ? (
              <span
                className={`text-main text-2xl mt-4 cursor-pointer`}
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
          </aside>
        </Slide>
      )}
    </>
  );
};
