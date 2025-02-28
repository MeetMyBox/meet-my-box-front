import bg_logo from "@assets/bg_face.svg";
import group from "@assets/clients_group.png";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { baseUrl, useGetBlock } from "@shared/lib/hooks/useGetBlock";
import Button from "@shared/ui/Button/ui/button";
import { IconButton } from "@shared/ui/IconButton/ui/icon-button";
import { Paragraph } from "@shared/ui/Paragraph/ui/paragraph";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import styles from "./styles.module.scss";
import { Loader } from "@widgets/ui/Loader/ui/loader";

export const MainScreen = () => {
  const [main, setMain] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBlock = async () => {
      try {
        setIsLoading(true);
        const block = await useGetBlock("/api/main-blocks/1");
        setMain(block);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlock();
  }, []);

  useEffect(() => {
    localStorage.removeItem("packageId");
    localStorage.removeItem("weight");
    localStorage.removeItem("rates");
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {main ? (
        <>
          <main className={styles.main_screen} id="main-mob">
            <img
              src={bg_logo.src}
              alt="bg_logo"
              loading="lazy"
              className={styles.main_screen__logo}
            />
            <Fade>
              <span className={styles.main_screen__heading}>
                {main.heading}
              </span>
            </Fade>
            <Fade delay={0.2}>
              <Paragraph isCentered margin="mt-4">
                {main.paragraph}
              </Paragraph>
            </Fade>
            <Button
              text="Оформить заявку"
              buttonType="filled"
              margin="mt-8"
              onClick={() => (window.location.href = "#calculate-mob")}
            />
            <IconButton
              text="Как это работает"
              icon={faChevronRight}
              margin="mt-4"
              onClick={() => (window.location.href = "#process-mob")}
            />
            <div
              className={styles.main_screen__clients}
              onClick={() => (window.location.href = "/#feedback")}
            >
              <img src={group.src} alt="clients" />
              <Paragraph margin="ml-2">200+ Довольных клиентов</Paragraph>
            </div>
            <img
              src={baseUrl + main.img.data.attributes.url}
              alt="Main Image"
              className={styles.main_screen__img}
            />
          </main>
          <main className={styles.main_screen_pc} id="main-pc">
            <div className="w-full flex justify-between">
              <div className="flex items-start flex-col">
                <Fade>
                  <h1 className={styles.main_screen_pc__heading}>
                    {main.heading}
                  </h1>
                </Fade>
                <Fade delay={0.2}>
                  <Paragraph margin="mt-4" width="w-[60%]">
                    {main.paragraph}
                  </Paragraph>
                </Fade>
                <div className="flex items-center gap-4 mt-8">
                  <Button
                    text="Оформить заявку"
                    buttonType="filled"
                    onClick={() => (window.location.href = "#calculate-pc")}
                  />
                  <IconButton
                    text="Как это работает"
                    icon={faChevronRight}
                    onClick={() => (window.location.href = "#process-pc")}
                  />
                </div>
                <div
                  className={styles.main_screen__clients}
                  onClick={() => (window.location.href = "/#feedback-pc")}
                >
                  <img src={group.src} alt="clients" />
                  <Paragraph margin="ml-2">200+ Довольных клиентов</Paragraph>
                </div>
              </div>
              <div className="w-full flex">
                <Fade className="w-full flex justify-end">
                  <img
                    alt="Main Image"
                    width={400}
                    height={400}
                    src={baseUrl + main.img.data.attributes.url}
                    className={styles.main_screen_pc__img}
                  />
                </Fade>
              </div>
            </div>
          </main>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
