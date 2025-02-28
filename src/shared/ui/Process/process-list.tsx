import { ImageCard } from "../Card/ui/Image/image-card";
import styles from "./styles.module.scss";

interface IProcessList {
  choosenState: string;
  items: any[];
}

export const ProcessList: React.FC<IProcessList> = ({
  choosenState,
  items,
}) => {
  const start = choosenState === "Отправить посылку" ? 0 : 4;
  const end = choosenState === "Отправить посылку" ? 4 : 7;
  const content = items.slice(start, end);
  // console.log(content[0].image.data.attributes.url);

  return (
    <div className={styles.process__list}>
      {content.map((item, index) => (
        <ImageCard
          key={index}
          img={item.image.data.attributes.url}
          description={item.text}
        />
      ))}
    </div>
  );
};

export const ProcessListPC: React.FC<IProcessList> = ({
  choosenState,
  items,
}) => {
  const start = choosenState === "Отправить посылку" ? 0 : 4;
  const end = choosenState === "Отправить посылку" ? 4 : 7;
  const content = items.slice(start, end);

  return (
    <div className={styles.process_pc__list}>
      {content.map((item, index) => (
        <ImageCard
          key={index}
          img={item.image.data.attributes.url}
          description={item.text}
        />
      ))}
    </div>
  );
};
