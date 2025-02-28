import bg_face from "@assets/bg_face.svg";
import ServicePricingTable from "@entities/AdditionalServiceTable";
import PricingTable from "@entities/CostTable";
import { useGetBlock } from "@shared/lib/hooks/useGetBlock";
import Button from "@shared/ui/Button/ui/button";
import { Paragraph } from "@shared/ui/Paragraph/ui/paragraph";
import { useEffect, useState } from "react";
import { AboutScreen } from "../HomePage/screens/AboutScreen/AboutScreen";
import { ContactScreen } from "../HomePage/screens/ContactScreen/ContactScreen";
import { Loader } from "../Loader/ui/loader";
import styles from "./styles.module.scss";

export const CostPage = () => {
  // const [tableState, setTableState] = useState<string>("Стандарт");
  const [cost, setCost] = useState<any>(null);
  const [cost2, setCost2] = useState<any>(null);
  const [help, setHelp] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        setIsLoading(true);
        const block = await useGetBlock("/api/cost-tables/1");
        const block2 = await useGetBlock("/api/cost-tables/2");
        const block3 = await useGetBlock("/api/help-tables/1");
        setCost(block);
        setCost2(block2);
        setHelp(block3);
      } catch (error) {
        console.error("Error fetching Cost data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlock();
  }, []);

  // Return loader if data is still being fetched
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className={styles.cost}>
        <img
          src={bg_face.src}
          alt="BLOB"
          width={400}
          height={400}
          className={styles.cost__img}
        />
        <h1 className={styles.cost__heading}>{cost.heading}</h1>
        <Paragraph isCentered margin="mt-4" width="w-[30%]">
          {cost.paragraph}
        </Paragraph>

        <div className="w-full flex flex-col md:flex-row justify-center items-start space-x-4">
          <>
            <PricingTable cost1={cost} cost2={cost2} />
          </>
        </div>
        <h2 className={`${styles.cost__heading} mt-4 mb-4`}>
          Помощь с покупкой
        </h2>
        <ServicePricingTable help={help} />
        <Button
          text="Помощь с покупкой"
          buttonType="filled"
          margin="mt-12"
          onClick={() => {
            window.location.href = "/faq";
          }}
        />
      </div>
      <AboutScreen />
      <ContactScreen />
    </>
  );
};
