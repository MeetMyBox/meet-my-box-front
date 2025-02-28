import {
  CalculateForm,
  CalculateFormPC,
} from "@features/Form/Calculate/calculate-form";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetBlock } from "@shared/lib/hooks/useGetBlock";
import Button from "@shared/ui/Button/ui/button";
import { Documents } from "@shared/ui/Documents";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.scss";

export const CalculatePage = () => {
  const [calculate, setCalculate] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isForm, setIsForm] = useState(true);
  const [parcels, _setParcels] = useState([1]); // State to handle multiple parcels

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        setIsLoading(true);
        const block = await useGetBlock("/api/calculate-blocks/1");
        setCalculate(block);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlock();
  }, []);

  const handleToggleForm = () => {
    setIsForm(!isForm);
  };

  // Add a new parcel to the state
  // const handleAddParcel = () => {
  //   setParcels((prevParcels) => [...prevParcels, prevParcels.length + 1]);
  // };

  if (isLoading) return <></>;

  return (
    <>
      <section className={styles.calculate} id="calculate-mob">
        <h2 className={styles.calculate__heading}>{calculate.heading}</h2>
        <Button
          text="Посылка"
          buttonType={isForm ? "filled" : "outline"}
          margin="mt-6"
          onClick={handleToggleForm}
        />
        <Button
          text="Документы"
          buttonType={!isForm ? "filled" : "outline"}
          margin="mt-4"
          onClick={handleToggleForm}
        />
        {parcels.map((_parcel, index) => (
          <div key={index}>
            {isForm ? (
              <CalculateForm />
            ) : (
              <Documents onClick={handleToggleForm} />
            )}
          </div>
        ))}
      </section>
      <section className={styles.calculate_pc} id="calculate-pc">
        <div className="flex items-center gap-3">
          <h2 className={styles.calculate_pc__heading}>{calculate.heading}</h2>
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-place="bottom"
            data-tooltip-content="Рассчитайте цену за вашу посылку и перейдите к её оформлению"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="text-main" />
          </span>
          <Tooltip
            id="my-tooltip"
            style={{ fontSize: "16px", fontWeight: 400 }}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-4 mt-25">
          <Button
            text="Посылка"
            buttonType={isForm ? "filled" : "outline"}
            margin="mt-6"
            onClick={handleToggleForm}
          />
          <Button
            text="Документы"
            buttonType={!isForm ? "filled" : "outline"}
            margin="mt-6"
            onClick={handleToggleForm}
          />
        </div>
        {parcels.map((_parcel, index) => (
          <div key={index}>
            {isForm ? (
              <CalculateFormPC />
            ) : (
              <Documents onClick={handleToggleForm} />
            )}
          </div>
        ))}
      </section>
    </>
  );
};
