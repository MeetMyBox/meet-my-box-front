import styles from "./styles.module.scss";

interface IPackageDetails {
  items: any;
  onClick?: () => void;
}

export const PackageDetails: React.FC<IPackageDetails> = ({ items }) => {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.package_card}>
          {items.map((item: any, index: number) => (
            <div className="w-full flex flex-col gap-4 items-start p-4">
              <h6 className="font-bold">Предмет {index + 1}</h6>
              <span>Наименование: {item.name}</span>
              <span>Страна: {item.country}</span>
              <span>Вес: {item.weight}</span>
              <span>Количество: {item.quantity}</span>
              <span>Стоимость: {item.cost}€</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
