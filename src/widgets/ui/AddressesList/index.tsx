import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAddresses } from "@shared/lib/hooks/useGetAddress";
import Button from "@shared/ui/Button/ui/button";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import type { AddressProps } from "src/types/adress-types";

export const AddressesSelectors: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressProps[]>();
  const [currentAddress, setCurrentAddress] = useState<AddressProps[]>();
  const [chosenAddress, setChosenAddress] = useState<number>();

  // Получение адресов при монтировании компонента
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const fetchedAddresses = await useGetAddresses();
        if (fetchedAddresses) {
          setAddresses(fetchedAddresses);
          setCurrentAddress(
            fetchedAddresses.filter((address) => address.type === "receiver")
          );
          if (fetchedAddresses.length > 0) {
            setChosenAddress(fetchedAddresses[0].id);
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке адресов:", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddressType = (type: string) => {
    const filteredAddresses = addresses?.filter(
      (address) => address.type === type
    );
    setCurrentAddress(filteredAddresses);
    if (filteredAddresses && filteredAddresses.length > 0) {
      setChosenAddress(filteredAddresses[0].id);
    }
  };

  const handleAddressChange = (addressId: number) => {
    setChosenAddress(addressId);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-[90%] max-w-[800px] min-h-[300px]">
      <span className="w-full text-xl flex text-center justify-center gap-4">
        Выберите итоговый адрес
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-place="bottom"
          data-tooltip-content="Выберите адрес получателя и отправителя, которые вы заполняли ранее"
        >
          <FontAwesomeIcon icon={faInfoCircle} className="text-main" />
        </span>
        <Tooltip
          id="my-tooltip"
          style={{ fontSize: "16px", fontWeight: 400 }}
        />
      </span>
      <div className="w-full flex items-center justify-center gap-2">
        <Button
          text={"Получатель"}
          buttonType={
            currentAddress !== undefined &&
            currentAddress[0].type === "receiver"
              ? "filled"
              : "outline"
          }
          onClick={() => handleAddressType("receiver")}
        />
        <Button
          text={"Отправитель"}
          buttonType={
            currentAddress !== undefined && currentAddress[0].type === "sender"
              ? "filled"
              : "outline"
          }
          onClick={() => handleAddressType("sender")}
        />
      </div>
      <select
        className="block w-[60%] px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
        onChange={(e) => handleAddressChange(parseInt(e.target.value))}
        value={chosenAddress || ""} // Устанавливаем текущее значение
      >
        <option value="" disabled>
          Выберите адрес
        </option>
        {currentAddress?.map((address) => (
          <option key={address.id} value={address.id} className="w-full">
            {address.postal_code +
              "," +
              address.city +
              address.street +
              address.housing +
              ", Кв. " +
              address.apartment +
              ", Дом " +
              address.building}
          </option>
        ))}
      </select>
      <Button
        text="Выбрать"
        buttonType="filled"
        // onClick={() => console.log("Выбранный адрес:", chosenAddress)} // Простая логика выбора
      />
    </div>
  );
};
