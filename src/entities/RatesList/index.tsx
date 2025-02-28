import { RatesCard, RatesCardPC } from "@features/RatesCard";
import { InfoScreen } from "@widgets/ui/HomePage/InfoScreen/InfoScreen";
import type React from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
export type TimeArray = {
  estimateNumber: string;
  estimateTime: string;
};
export type DateArray = {
  text: string;
  datetime: string;
};
interface Props {
  days: TimeArray[];
  prices: string[];
  dates: DateArray[];
  urls: string[];
}
export const RatesList: React.FC<Props> = ({ days, prices, dates, urls }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  return (
    <div className={styles.rates__list}>
      {days.map((item, index) =>
        prices[index] !== undefined &&
        dates[index] !== undefined &&
        urls[index] !== undefined &&
        index <= 1 ? (
          <div className="w-full relative" key={index}>
            <RatesCard
              day={item}
              price={prices[index]}
              date={dates[index]}
              url={urls[index]}
              key={index}
            />
            {selectedCardIndex === index && <InfoScreen />}
            <div className="absolute bottom-[-15px] left-[40%]">
              <span
                onClick={() => {
                  setSelectedCardIndex(
                    selectedCardIndex === index ? null : index
                  );
                }}
                className="bg-main text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-secondary transition transform hover:scale-105"
              >
                Details
              </span>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};
export const RatesListPC: React.FC<Props> = ({ days, prices, dates, urls }) => {
  // const [showInfo, setShowInfo] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  return (
    <div className={styles.rates__list}>
      {days.map((item, index) =>
        prices[index] !== undefined &&
        dates[index] !== undefined &&
        urls[index] !== undefined &&
        index <= 1 ? (
          <div className="w-full relative" key={index}>
            <RatesCardPC
              rateType=""
              day={item}
              price={prices[index]}
              date={dates[index]}
              url={urls[index]}
              key={index}
            />
            <div className="absolute bottom-[-15px] right-[0]">
              <span
                onClick={() => {
                  setSelectedCardIndex(
                    selectedCardIndex === index ? null : index
                  );
                }}
                className="bg-main cursor-pointer hover:opacity-70 duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-secondary transition transform hover:scale-105"
              >
                Details
              </span>
            </div>
            {/* Show InfoScreen only for the selected card */}
            {selectedCardIndex === index && <InfoScreen />}
          </div>
        ) : null
      )}
    </div>
  );
};
