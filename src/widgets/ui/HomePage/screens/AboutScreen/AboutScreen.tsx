import { AboutGroup, AboutGroupPC } from "@shared/ui/Card/ui/About/about-card";
import { Paragraph } from "@shared/ui/Paragraph/ui/paragraph";
import { Fade } from "react-awesome-reveal";
import styles from "./styles.module.scss";
export const AboutScreen = () => {
  return (
    <>
      <div className={styles.about}>
        <Fade>
          <h3 className={styles.about__heading}>Meet My Box это:</h3>
        </Fade>
        <Fade className="w-full flex items-center justify-center">
          <Paragraph isCentered width="w-[50%]" margin="mt-4">
            Meet my Box - лучший сервис доставки посылок из Европы в Россию и
            страны СНГ.
          </Paragraph>
        </Fade>
        <AboutGroup />
      </div>
      <div className={styles.about_pc}>
        <Fade>
          <h3 className={styles.about_pc__heading}>Meet My Box это:</h3>
        </Fade>
        <Fade className="w-full flex items-center justify-center">
          <Paragraph isCentered width="w-[60%]" margin="mt-4">
            Meet my Box - лучший сервис доставки посылок из Европы в Россию и
            страны СНГ.
          </Paragraph>
        </Fade>
        <AboutGroupPC />
      </div>
    </>
  );
};
