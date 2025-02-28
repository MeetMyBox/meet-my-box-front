import { AddPackages, AddPackagesPC } from "@entities/Packages/AddPackage";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkAuth } from "@shared/lib/hooks/useCheckAuth";
import { useGetAddresses } from "@shared/lib/hooks/useGetAddress";
import Button from "@shared/ui/Button/ui/button";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.scss";
import type { AddressProps } from "src/types/adress-types";

export const AddPackagesPage = () => {
  const [address, setAddress] = useState<AddressProps[]>([]);
  // const packageQuantityData = JSON.parse(
  //   localStorage.getItem("packageQuantity") as any
  // );

  useEffect(() => {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) return;
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      const fetchedAddress = await useGetAddresses();
      setAddress(fetchedAddress);
    };

    fetchAddress();
  }, []);

  return (
    <>
      {address && address.length !== 0 ? (
        <>
          <div className={styles.package}>
            <div className="flex items-center justify-between gap-2">
              <h2 className={styles.package__heading}>Содержимое посылки</h2>
              <span
                className="text-main"
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
              >
                <FontAwesomeIcon icon={faCircleInfo} size="lg" />
              </span>
              <Tooltip
                id="my-tooltip"
                style={{ fontSize: "16px", fontWeight: 400 }}
              >
                Внимательно заполните все поля: <br /> наименование, страну
                происхождения, кол-во предметов, их вес и стоимость
              </Tooltip>
            </div>
            <AddPackages />
          </div>
          <div className={styles.package_pc}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <h2 className={styles.package_pc__heading}>
                    Содержимое посылки
                  </h2>
                  <span
                    className="text-main"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-place="bottom"
                  >
                    <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                  </span>
                </div>
              </div>
              <Tooltip
                id="my-tooltip"
                style={{ fontSize: "16px", fontWeight: 400 }}
              >
                Внимательно заполните все поля: <br /> наименование, страну
                происхождения, кол-во предметов, их вес и стоимость
              </Tooltip>
            </div>
            <AddPackagesPC />
          </div>
        </>
      ) : (
        <>
          <div className={styles.package}>
            <h2 className={styles.package__heading}>Добавьте адреса</h2>
            <Button
              text="Добавить"
              margin="mt-4"
              buttonType="filled"
              onClick={() => {
                window.location.href = "/address/add";
              }}
            />
          </div>
          <div className={styles.package_pc}>
            <h2 className={styles.package_pc__heading}>Добавьте адреса</h2>
            <Button
              text="Добавить"
              margin="mt-4"
              buttonType="filled"
              onClick={() => {
                window.location.href = "/address/add";
              }}
            />
          </div>
        </>
      )}
    </>
  );
};
