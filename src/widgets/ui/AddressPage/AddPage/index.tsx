import bg_face from "@assets/bg_face.svg";
import { AddAddressForm, AddAddressFormPC } from "@features/AddAddressForm";
import { useGetProfile } from "@shared/lib/hooks/useGetProfile";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

export const AddAddressPage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = useGetProfile();
      // console.log("user", fetchedUser);
      setUser(fetchedUser as any);
    };

    fetchUser();
  }, []);

  return (
    <>
      {user ? (
        <>
          <div className={styles.add_address}>
            <img
              src={bg_face.src}
              alt=""
              className={styles.add_address__img}
              width={400}
              height={400}
            />
            <h2 className={styles.add_address__heading}>Заполните адрес</h2>
            <AddAddressForm user={user} />
          </div>
          <div className={styles.add_address_pc}>
            <img
              src={bg_face.src}
              alt="BG_FACE"
              width={400}
              height={400}
              className={styles.add_address_pc__img}
            />
            <h2 className={styles.add_address_pc__heading}>Заполните адрес</h2>
            <AddAddressFormPC user={user} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.add_address}>
            <img
              src={bg_face.src}
              alt=""
              className={styles.add_address__img}
              width={400}
              height={400}
            />
            <h2 className={styles.add_address__heading}>Заполните адрес</h2>
            <AddAddressForm />
          </div>
          <div className={styles.add_address_pc}>
            <img
              src={bg_face.src}
              alt="BG_FACE"
              width={400}
              height={400}
              className={styles.add_address_pc__img}
            />
            <h2 className={styles.add_address_pc__heading}>Заполните адрес</h2>
            <AddAddressFormPC />
          </div>
        </>
      )}
    </>
  );
};
