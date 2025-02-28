import {
  CalculateForm,
  CalculateFormPC,
} from "@features/Form/Calculate/calculate-form";
import { useGetBlock } from "@shared/lib/hooks/useGetBlock";
import { FAQList } from "@shared/ui/Accordion/faq-accordion";
import Button from "@shared/ui/Button/ui/button";
import { Documents } from "@shared/ui/Documents";
import { useEffect, useState } from "react";
import { InfoScreen } from "../../InfoScreen/InfoScreen";
import styles from "./styles.module.scss";

export const CalculateScreen = () => {
  const [calculate, setCalculate] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isForm, setIsForm] = useState(true);
  const [parcels, _setParcels] = useState([1]); // State to handle multiple parcels

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        setIsLoading(true);
        const block = await useGetBlock("/api/calculate-blocks/1");
        // console.log("calc block:", block);
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

  if (isLoading) return null;

  return (
    <>
      <section className={styles.calculate} id="calculate-mob">
        <span className={styles.calculate__heading}>{calculate.heading}</span>
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
        <h2 className={styles.calculate_pc__heading}>{calculate.heading}</h2>
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

        <InfoScreen />
      </section>
      <div className="w-[90%] lg:w-[86.6%]">
        <FAQList items={calculate.questions} />
      </div>
      <button className="text-black text-sm mt-8">
        Еще больше ответов на вопросы{" "}
        <a href="/faq" className="text-main">
          здесь
        </a>
      </button>
    </>
  );
};
