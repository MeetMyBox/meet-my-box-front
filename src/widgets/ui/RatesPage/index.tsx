import { RatesList, RatesListPC } from "@entities/RatesList";
import {
  faChevronRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.scss";

export const RatesPage = () => {
  // const [showInfo, setShowInfo] = useState();
  const [rates, setRates] = useState<any>(null);

  useEffect(() => {
    const fetchedRates = () => {
      const all_rates = localStorage.getItem("rates");
      if (all_rates) {
        setRates(JSON.parse(all_rates));
      }
    };

    fetchedRates(); // Call the function to fetch rates
  }, []);

  return (
    <>
      <div className={styles.rates}>
        <h2 className={styles.rates__heading}>Информация о доставках</h2>
        {rates ? (
          <RatesList
            days={rates.days}
            prices={rates.price}
            dates={rates.dates}
            urls={rates.urls}
          />
        ) : (
          <></>
        )}
        {}
      </div>
      <div className={styles.rates_pc}>
        <span className="flex items-center gap-4">
          <h2 className={styles.rates_pc__heading}>Информация о доставках</h2>
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-place="bottom"
            data-tooltip-content="Выберите наиболее подходящую для вас доставку"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="text-main" />
          </span>{" "}
        </span>
        <Tooltip
          id="my-tooltip"
          style={{ fontSize: "16px", fontWeight: 400 }}
        />
        <button
          className="text-main text-lg flex items-center gap-2 mb-4 cursor-pointer hover:underline"
          onClick={() => (window.location.href = "/")}
        >
          Вернуться назад{" "}
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
        </button>

        {rates ? (
          <RatesListPC
            days={rates.days}
            prices={rates.price}
            dates={rates.dates}
            urls={rates.urls}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
