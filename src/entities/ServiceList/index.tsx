import { serviceList } from "@shared/lib/content/Process";
import { Paragraph } from "@shared/ui/Paragraph/ui/paragraph";
import styles from "./styles.module.scss";

export const ServiceList = () => {
  return (
    <div className={styles.service__list}>
      {serviceList.map((item, index) => (
        <div key={index} className={styles.item}>
          <img
            width={400}
            height={400}
            src={item.img.src}
            alt="image card"
            className={styles.item__img}
          />
          <Paragraph isCentered margin="mt-4" width="w-full">
            {item.description}
          </Paragraph>
        </div>
      ))}
    </div>
  );
};
