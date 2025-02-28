import no_address from "@assets/no_address.png";
import { AddressPC } from "@features/AddressesCard";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAddresses } from "@shared/lib/hooks/useGetAddress";
import Button from "@shared/ui/Button/ui/button";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.scss";
import type { AddressProps } from "src/types/adress-types";

export const AddressPage = () => {
  const [address, setAddress] = useState<AddressProps[]>([]);

  useEffect(() => {
    const fetchAddress = async () => {
      const fetchedAddress = await useGetAddresses();
      setAddress(fetchedAddress);
    };

    fetchAddress();
  }, []);

  return (
    <>
      <div className={styles.address}>
        {address.length > 0 ? (
          <AddressPC items={address} />
        ) : (
          <>
            <img
              src={no_address.src}
              alt="Address"
              className={styles.address__img}
              width={400}
              height={400}
            />
            <h2 className={styles.address__heading}>У вас пока нет адресов</h2>
          </>
        )}
      </div>

      <div className={styles.address_pc}>
        {address.length > 0 ? (
          <>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl">Ваши адреса</h1>
              <span
                data-tooltip-id="my-tooltip"
                data-tooltip-place="bottom"
                data-tooltip-content="Здесь вы видите ваши адреса, которые заполнили ранее"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="text-main" />
              </span>
              <Tooltip
                id="my-tooltip"
                style={{ fontSize: "16px", fontWeight: 400 }}
              />
            </div>
            <AddressPC items={address} />
          </>
        ) : (
          <>
            <img
              src={no_address.src}
              alt=""
              className={styles.address_pc__img}
            />
            <h2 className={styles.address_pc__heading}>
              У вас пока нет адресов
            </h2>
          </>
        )}
        <Button
          buttonType="filled"
          text="Добавить адрес"
          margin="mt-6"
          onClick={() => {
            window.location.href = "/address/add";
          }}
        />
      </div>
    </>
  );
};
