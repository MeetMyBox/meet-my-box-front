import type { AddressProps } from "@features/AddressesCard";
import { AgreeCard } from "@features/Cards/AgreeCard";
import { CourierCard } from "@features/Cards/CourierCard";
import { InsuranceCard } from "@features/Cards/InsuranceCard";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button as MUIBTN,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material"; // Импортируем компоненты MUI для табов
import { useUpdatePackage } from "@shared/lib/hooks/Packages/useUpdatePackage";
import { checkAuth } from "@shared/lib/hooks/useCheckAuth";
import { useGetAddresses } from "@shared/lib/hooks/useGetAddress";
import Button from "@shared/ui/Button/ui/button";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

import { Card, CardContent, Grid } from "@mui/material";

const AddressCard = ({ title, address }) => (
  <Card sx={{ minWidth: 350, mb: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        <strong>{title}</strong>
      </Typography>
      <Typography variant="body1">
        <strong>Имя:</strong> {address.firstName || "Не указано"}
      </Typography>
      <Typography variant="body1">
        <strong>Фамилия:</strong> {address.lastName || "Не указано"}
      </Typography>
      <Typography variant="body1">
        <strong>Телефон:</strong> {address.phoneNumber || "Не указано"}
      </Typography>
      <Typography variant="body1">
        <strong>Страна:</strong> {address.country || "Не указано"}
      </Typography>
      <Typography variant="body1">
        <strong>Город:</strong> {address.city || "Не указано"}
      </Typography>
      <Typography variant="body1">
        <strong>Улица:</strong> {address.street || "Не указано"}
      </Typography>
      <Typography variant="body1">
        <strong>Дом:</strong> {address.building || "Не указано"}
      </Typography>
      <Typography variant="body1">
        <strong>Квартира:</strong> {address.apartment || "Не указано"}
      </Typography>
      <Typography variant="body1">
        <strong>Почтовый индекс:</strong> {address.postalCode || "Не указано"}
      </Typography>
    </CardContent>
  </Card>
);

const AddressDisplay = ({ senderAddress, receiverAddress }) => (
  <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="flex-start"
    spacing={4}
    sx={{ width: "100vw", maxWidth: "100%", margin: "auto" }}
  >
    {senderAddress && (
      <Grid item>
        <AddressCard title="Отправитель" address={senderAddress} />
      </Grid>
    )}
    {receiverAddress && (
      <Grid item>
        <AddressCard title="Получатель" address={receiverAddress} />
      </Grid>
    )}
  </Grid>
);

export default AddressDisplay;

export const ApplicationPage = () => {
  const [selectedAddressType, setSelectedAddressType] = useState<
    "sender" | "receiver" | null
  >(null);
  const [addresses, setAddresses] = useState<AddressProps[]>();
  const [senderAddress, setSenderAddress] = useState<AddressProps[]>();
  const [receiverAddress, setReceiverAddress] = useState<AddressProps>();
  const [previousInsurance, setPreviousInsurance] = useState(false);
  const [previousCourier, setPreviousCourier] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<AddressProps[]>();
  const [address, setAddress] = useState<AddressProps>();
  const [chosenAddress, setChosenAddress] = useState<number>();
  const [id, setId] = useState<string>();
  const [selectedTab, setSelectedTab] = useState(1); // Состояние для выбранного таба
  const [insurance, setInsurance] = useState(false);
  const [courier, setCourier] = useState(false);
  const [note, setNote] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false); // Состояние для третьего чекбокса
  const [agree4, setAgree4] = useState(false);
  const [packageCurrent, setPackageCurrent] = useState<{ items: any[] } | null>(
    null
  );
  const [price, setPrice] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [countryData, setCountryData] = useState<any>("");
  const [openDialog, setOpenDialog] = useState(false);
  const toggle1 = () => setAgree1(!agree1);
  const toggle2 = () => setAgree2(!agree2);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const toggle3 = () => setAgree3(!agree3); // Обработчик для третьего сост
  const toggle4 = () => setAgree4(!agree3);
  const toggle5 = () => setInsurance(!insurance); // Обработчик для третьего сост
  const toggle6 = () => setCourier(!courier);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const [senderAddressId, setSenderAddressId] = useState<number | null>(null);
  const [receiverAddressId, setReceiverAddressId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchAddressesAsync = async () => {
      const storedPackageId = JSON.parse(
        localStorage.getItem("packageId") || "{}"
      );
      const countryData = JSON.parse(
        localStorage.getItem("countryData") || "{}"
      );

      if (countryData) {
        setCountryData(countryData);
      }

      const priceData = localStorage.getItem("packagePrice");
      if (priceData) {
        setPrice(priceData);
        setTotalPrice(parseFloat(priceData.replace("€", "")));
      } else {
        window.location.href = "/rates";
      }

      if (storedPackageId) {
        setId(storedPackageId.id);
        setPackageCurrent(storedPackageId);

        try {
          const fetchedAddresses = await useGetAddresses();

          if (fetchedAddresses) {
            setAddresses(fetchedAddresses);
            console.log("lol:", fetchedAddresses);

            // Фильтруем только два адреса — отправителя и получателя
            const filteredAddresses = fetchedAddresses.filter(
              (address) =>
                address.id === senderAddressId ||
                address.id === receiverAddressId
            );

            setCurrentAddress(filteredAddresses);

            if (filteredAddresses.length > 0) {
              setChosenAddress(filteredAddresses[0].id);
              setAddress(filteredAddresses[0]);
            }
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      }
    };

    setSelectedTab(1);
    fetchAddressesAsync();
  }, [senderAddressId, receiverAddressId]);

  useEffect(() => {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) return;
  }, []);

  useEffect(() => {
    if (!packageCurrent || !packageCurrent.items) {
      return; // Возвращаемся, если данные еще не загружены
    }
    // Рассчитываем 5% от стоимости всех элементов
    const totalCost = packageCurrent.items.reduce((sum: number, item: any) => {
      const itemCost = parseFloat(item.cost);
      return sum + itemCost * 0.05;
    }, 0);

    // Используем предыдущее значение для корректного пересчета
    setTotalPrice((prevPrice) => {
      let newTotalPrice = prevPrice;
      if (previousInsurance === false && insurance === true) {
        // Переход с false на true — добавляем стоимость страховки
        newTotalPrice += totalCost;
      } else if (previousInsurance === true && insurance === false) {
        // Переход с true на false — убираем стоимость страховки
        newTotalPrice -= totalCost;
      }
      console.log(newTotalPrice);
      setPreviousInsurance(insurance);
      setPreviousCourier(courier);

      return parseFloat(newTotalPrice.toFixed(2)); // Форматируем итоговую стоимость с 2 знаками после запятой
    });
  }, [insurance, packageCurrent]);

  useEffect(() => {
    if (!packageCurrent || !packageCurrent.items) {
      return; // Возвращаемся, если данные еще не загружены
    }
    // Рассчитываем 5% от стоимости всех элементов
    const totalCost = packageCurrent.items.reduce((sum: number, item: any) => {
      const itemCost = parseFloat(item.cost);
      return sum + itemCost * 0.05;
    }, 0);

    // Используем предыдущее значение для корректного пересчета
    setTotalPrice((prevPrice) => {
      let newTotalPrice = prevPrice;
      // Добавляем или убираем стоимость страховки
      if (previousCourier === false && courier === true) {
        // Переход с false на true — добавляем стоимость курьера
        newTotalPrice += 3;
      } else if (previousCourier === true && courier === false) {
        // Переход с true на false — убираем стоимость курьера
        newTotalPrice -= 3;
      }
      console.log(newTotalPrice);
      setPreviousInsurance(insurance);
      setPreviousCourier(courier);

      return parseFloat(newTotalPrice.toFixed(2)); // Форматируем итоговую стоимость с 2 знаками после запятой
    });
  }, [courier, packageCurrent]);

  const handleInsuranceClick = (value: boolean) => {
    setInsurance(value);
    setSelectedTab((prev) => prev + 1);
  };

  const handleCourierClick = (value: boolean, note: string) => {
    setCourier(value);
    setSelectedTab((prev) => prev + 1);
    setNote(note);
  };

  // const handleAddressChange = (addressId: number) => {
  //   // Assuming `addresses` is your array of address objects
  //   const selectedAddress = addresses?.find(
  //     (address) => address.id === addressId
  //   );

  //   if (selectedAddress) {
  //     setChosenAddress(addressId); // Set the chosen address ID
  //     setAddress(selectedAddress); // Set the full address object
  //   }
  // };

  const handleTabChange = (newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleAgreeClick = async () => {
    if (!agree1 || !agree2) {
      alert("Вы должны согласиться со всеми условиями!");
      return;
    } else {
      // Обновление и отправка данных пакета
      const packageData = JSON.parse(localStorage.getItem("packageId") || "{}");
      const dimensionsData = JSON.parse(
        localStorage.getItem("dimensionsData") || "{}"
      );
      const rateType = (localStorage.getItem("rateType") || "{}") as
        | "Express"
        | "Standard";

      // В данном случае packageData уже распарсен и items можно получить напрямую
      const items = packageData.items || []; // Проверка на наличие items в объекте

      // Proceed with the package update
      const package_now = await useUpdatePackage({
        id: parseInt(id !== undefined ? id : "", 10),
        insurance: !insurance ? "Не нужна" : "Нужна",
        courier: !courier ? "Не нужен" : "Нужен",
        receiverAddress: receiverAddress,
        senderAddress: senderAddress,
        items: items,
        note: note,
        type: rateType,
        addressId: chosenAddress,
        width: dimensionsData.width,
        height: dimensionsData.height,
        length: dimensionsData.length,
        weight: dimensionsData.weight,
      });

      localStorage.removeItem("dimensionsData");

      console.log(package_now);

      // Update package data in localStorage
      localStorage.setItem("packageId", JSON.stringify(package_now));
      localStorage.setItem("priceData", `€${totalPrice}`);

      // Redirect to the payment page
      window.location.href = "/payment-methods";
    }
  };

  // const handleAddressType = (type: string) => {
  //   const filteredAddresses = addresses?.filter(
  //     (address) => address.type === type
  //   );
  //   setCurrentAddress(filteredAddresses);
  //   if (filteredAddresses && filteredAddresses.length > 0) {
  //     setChosenAddress(filteredAddresses[0].id);
  //     setAddress(filteredAddresses[0]);
  //   }
  // };

  const handleNavigation = () => {
    window.location.href = "/packages/add";
  };

  const handleItemDelete = (index: number) => {
    const packageData = JSON.parse(localStorage.getItem("packageId") || "{}");
    if (packageData.items) {
      packageData.items.splice(index, 1); // Удаление элемента по индексу
      localStorage.setItem("packageId", JSON.stringify(packageData)); // Обновление `localStorage`
    }
    // Обновляем состояние после удаления
    setPackageCurrent({ ...packageCurrent, items: packageData.items });
  };

  // Обработчик выбора адреса из выпадающего списка
  const handleAddressChange = (selectedId: number) => {
    // Проверка существования выбранного адреса в списке
    const selectedAddress = addresses.find(
      (address) => address.id === selectedId
    );

    if (!selectedAddress) {
      alert("Выбранный адрес не существует!");
      return;
    }

    // Проверка, что адреса отправителя и получателя разные
    if (selectedAddressType === "sender" && selectedId !== receiverAddressId) {
      setSenderAddressId(selectedId);
      setSenderAddress(selectedAddress);
    } else if (
      selectedAddressType === "receiver" &&
      selectedId !== senderAddressId
    ) {
      setReceiverAddressId(selectedId);
      setReceiverAddress(selectedAddress);
    } else {
      alert("Отправитель и получатель не могут быть одним и тем же адресом!");
    }
  };

  // Устанавливаем тип выбранного адреса
  const handleAddressType = (type: "sender" | "receiver") => {
    setSelectedAddressType(type);
  };

  const returnTotalCost = () => {
    if (packageCurrent) {
      const totalCost = parseFloat(
        packageCurrent.items
          .reduce((sum: number, item: any) => {
            // Convert cost to number (if it's a string) and calculate 5%
            const itemCost = parseFloat(item.cost);
            const fivePercent = itemCost * 0.05; // Calculate 5% of the cost
            return sum + fivePercent;
          }, 0)
          .toFixed(2)
      );
      return totalCost;
    }
    return 0;
  };

  return (
    <div className="w-full min-h-[80vh] pb-8 pt-8 flex flex-col items-center justify-center">
      {/* Табы навигации */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{ marginBottom: 4, width: "100%" }} // Set width to ensure it fits the container
          centered={!isSmallScreen} // Centered only on larger screens
          variant={isSmallScreen ? "scrollable" : "fullWidth"} // Scrollable on small screens
          scrollButtons="auto" // Automatically show scroll buttons when needed
          allowScrollButtonsMobile // Enable scroll buttons for mobile devices
        >
          <Tab
            label="Рассчитать"
            onClick={() => (window.location.href = "/calculate")}
            disabled={!receiverAddressId || !senderAddressId} // Disable based on condition
          />
          <Tab
            label="Адреса"
            disabled={!receiverAddressId || !senderAddressId} // Disable based on condition
          />
          <Tab
            label="Содержимое"
            disabled={!receiverAddressId || !senderAddressId} // Disable based on condition
          />
          <Tab
            label="Страхование"
            disabled={!receiverAddressId || !senderAddressId} // Disable based on condition
          />
          <Tab
            label="Вызов курьера"
            disabled={!receiverAddressId || !senderAddressId} // Disable based on condition
          />
          <Tab
            label="Итог"
            disabled={!receiverAddressId || !senderAddressId} // Disable based on condition
          />
        </Tabs>
      </div>

      {/* Содержимое каждого этапа */}
      {selectedTab === 1 && (
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
                selectedAddressType === "receiver" ? "filled" : "outline"
              }
              onClick={() => handleAddressType("receiver")}
            />
            <Button
              text={"Отправитель"}
              buttonType={
                selectedAddressType === "sender" ? "filled" : "outline"
              }
              onClick={() => handleAddressType("sender")}
            />
          </div>
          <select
            className="block w-[60%] px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 mb-6"
            onChange={(e) => handleAddressChange(parseInt(e.target.value))}
            value={
              selectedAddressType === "sender"
                ? senderAddressId || ""
                : receiverAddressId || ""
            }
            disabled={!selectedAddressType}
          >
            <option value="" disabled>
              Выберите адрес
            </option>
            {addresses?.map((address) => (
              <option key={address.id} value={address.id}>
                {`${address.postalCode},  ${address.city}, Улица ${address.street} ${address.housing}, Кв. ${address.apartment}, Дом ${address.building}`}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <Button
              text={"Содержимое посылки"}
              buttonType="outline"
              onClick={() => handleDialogOpen()}
            />
            <Button
              text={"Добавить адрес"}
              buttonType="outline"
              onClick={() => (window.location.href = "/address/add")}
            />
          </div>
          <Button
            text="Далее"
            buttonType="filled"
            onClick={() => {
              if (receiverAddressId && senderAddressId) {
                setSelectedTab((prev) => prev + 1);
              } else {
                alert(
                  "Пожалуйста, выберите оба адреса: и отправителя, и получателя."
                );
              }
            }}
            // disabled={!receiverAddressId || !senderAddressId}
          />

          {openDialog && (
            <Dialog
              open={openDialog}
              onClose={handleDialogClose}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Детали содержимого</DialogTitle>
              {packageCurrent.items === undefined ? (
                <div className="ml-4  mb-4">Содержимое вашей посылки пусто</div>
              ) : (
                <DialogContent>
                  <Table>
                    <TableBody>
                      {packageCurrent.items.map((item: any, index: number) => (
                        <TableRow
                          key={index}
                          sx={{ display: { xs: "block", sm: "table-row" } }}
                        >
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                wordWrap: "break-word",
                              }}
                            >
                              {item.name}
                            </Typography>
                          </TableCell>
                          <TableCell>Вес: {item.weight} кг</TableCell>
                          <TableCell>Количество: {item.quantity}</TableCell>
                          <TableCell>Страна: {item.country}</TableCell>
                          <TableCell>Цена: €{item.cost}</TableCell>
                          {/* Добавленная иконка удаления */}
                          <TableCell align="right">
                            <IconButton
                              onClick={() => handleItemDelete(index)}
                              sx={{
                                color: "red",
                                textTransform: "none",
                                borderRadius: "999px",
                              }}
                              aria-label="удалить"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              )}
              <DialogActions>
                <MUIBTN
                  onClick={handleNavigation}
                  variant="contained"
                  sx={{
                    backgroundColor: "#220CF3",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "999px",
                  }}
                >
                  Вернуться к содержимому
                </MUIBTN>
                <MUIBTN
                  onClick={handleDialogClose}
                  variant="contained"
                  sx={{
                    backgroundColor: "#220CF3",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "999px",
                  }}
                >
                  Закрыть
                </MUIBTN>
              </DialogActions>
            </Dialog>
          )}
        </div>
      )}

      {selectedTab === 2 && (
        <>
          <div className="flex flex-col items-center justify-center">
            <DialogTitle>Детали содержимого</DialogTitle>
            {packageCurrent.items === undefined ? (
              <div className="ml-4">Содержимое вашей посылки пусто</div>
            ) : (
              <DialogContent>
                <Table>
                  <TableBody>
                    {packageCurrent.items.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{ display: { xs: "block", sm: "table-row" } }}
                      >
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              wordWrap: "break-word",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell>Вес: {item.weight} кг</TableCell>
                        <TableCell>Количество: {item.quantity}</TableCell>
                        <TableCell>Страна: {item.country}</TableCell>
                        <TableCell>Цена: €{item.cost}</TableCell>
                        {/* Добавленная иконка удаления */}
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleItemDelete(index)}
                            sx={{
                              color: "red",
                              textTransform: "none",
                              borderRadius: "999px",
                            }}
                            aria-label="удалить"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            )}
            <Button
              //Изменил на далее так как выполняет только это функцию
              text="Далее"
              buttonType="filled"
              onClick={() => setSelectedTab((prev) => prev + 1)}
            />
          </div>
        </>
      )}
      {selectedTab === 3 && (
        <>
          <InsuranceCard
            onInsuranceClick={handleInsuranceClick}
            packageCurrent={packageCurrent.items}
            price={price}
          />
          <Button
            text={"Содержимое посылки"}
            buttonType="outline"
            onClick={() => handleDialogOpen()}
          />
          {openDialog && (
            <Dialog
              open={openDialog}
              onClose={handleDialogClose}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Детали содержимого</DialogTitle>
              {packageCurrent.items === undefined ? (
                <div className="ml-4">Содержимое вашей посылки пусто</div>
              ) : (
                <DialogContent>
                  <Table>
                    <TableBody>
                      {packageCurrent.items.map((item: any, index: number) => (
                        <TableRow
                          key={index}
                          sx={{ display: { xs: "block", sm: "table-row" } }}
                        >
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                wordWrap: "break-word",
                              }}
                            >
                              {item.name}
                            </Typography>
                          </TableCell>
                          <TableCell>Вес: {item.weight} кг</TableCell>
                          <TableCell>Количество: {item.quantity}</TableCell>
                          <TableCell>Страна: {item.country}</TableCell>
                          <TableCell>Цена: €{item.cost}</TableCell>
                          {/* Добавленная иконка удаления */}
                          <TableCell align="right">
                            <IconButton
                              onClick={() => handleItemDelete(index)}
                              sx={{ color: "red" }}
                              aria-label="удалить"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              )}
              <DialogActions>
                <MUIBTN
                  onClick={handleNavigation}
                  variant="contained"
                  sx={{
                    backgroundColor: "#220CF3",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "999px",
                  }}
                >
                  Вернуться к содержимому
                </MUIBTN>
                <MUIBTN
                  onClick={handleDialogClose}
                  variant="contained"
                  sx={{
                    backgroundColor: "#220CF3",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "999px",
                  }}
                >
                  Закрыть
                </MUIBTN>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
      {selectedTab === 4 && (
        <>
          <CourierCard onCourierClick={handleCourierClick} />
          <Button
            text={"Содержимое посылки"}
            buttonType="outline"
            margin="mt-4"
            onClick={() => handleDialogOpen()}
          />
          {openDialog && (
            <Dialog
              open={openDialog}
              onClose={handleDialogClose}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Детали содержимого</DialogTitle>
              {packageCurrent.items === undefined ? (
                <div className="ml-4">Содержимое вашей посылки пусто</div>
              ) : (
                <DialogContent>
                  <Table>
                    <TableBody>
                      {packageCurrent.items.map((item: any, index: number) => (
                        <TableRow
                          key={index}
                          sx={{ display: { xs: "block", sm: "table-row" } }}
                        >
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                wordWrap: "break-word",
                              }}
                            >
                              {item.name}
                            </Typography>
                          </TableCell>
                          <TableCell>Вес: {item.weight} кг</TableCell>
                          <TableCell>Количество: {item.quantity}</TableCell>
                          <TableCell>Страна: {item.country}</TableCell>
                          <TableCell>Цена: €{item.cost}</TableCell>
                          {/* Добавленная иконка удаления */}
                          <TableCell align="right">
                            <IconButton
                              onClick={() => handleItemDelete(index)}
                              sx={{ color: "red" }}
                              aria-label="удалить"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              )}
              <DialogActions>
                <MUIBTN
                  onClick={handleNavigation}
                  variant="contained"
                  sx={{
                    backgroundColor: "#220CF3",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "999px",
                  }}
                >
                  Вернуться к содержимому
                </MUIBTN>
                <MUIBTN
                  onClick={handleDialogClose}
                  variant="contained"
                  sx={{
                    backgroundColor: "#220CF3",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "999px",
                  }}
                >
                  Закрыть
                </MUIBTN>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
      {/* {showDocumentCard && (
        <DocumentUpload onDocumentClick={handleDocumentClick} />
      )} */}
      {/* {showCostCard && (
        <CostCard
          onCostClick={handleCostClick}
          packageCurrent={packageCurrent}
        />
      )} */}
      {/* {showAgreeCard && ( */}
      {/* {selectedTab === 5 && (
        <CostCard
          onCostClick={handleCostClick}
          packageCurrent={packageCurrent}
          price={price}
          country={countryData}
          insurance={insurance}
          courier={courier}
          address={address}
        />
      )} */}
      {selectedTab === 5 && (
        <>
          <h1 className="text-3xl">Проверьте все ваши данные</h1>
          <h2 className="text-2xl my-4">
            Посылка из{" "}
            <span className="text-main">
              {countryData.from.country} ({countryData.from.code})
            </span>{" "}
            в{""} {""}
            <span className="text-main">
              {""} {""}
              {countryData.to.country} ({countryData.to.code})
            </span>
          </h2>
          <Box
            sx={{
              width: 400,
              backgroundColor: "white",
              padding: 4,
              borderRadius: 2,
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <AddressDisplay
              senderAddress={senderAddress}
              receiverAddress={receiverAddress}
            />
          </Box>
          <MUIBTN
            onClick={() => setSelectedTab(1)}
            variant="contained"
            sx={{
              backgroundColor: "#220CF3",
              color: "#fff",
              textTransform: "none",
              borderRadius: "999px",
            }}
          >
            Вернуться к адресу
          </MUIBTN>

          <div>
            <DialogTitle>Детали содержимого</DialogTitle>
            {packageCurrent.items === undefined ? (
              <div className="ml-4">Содержимое вашей посылки пусто</div>
            ) : (
              <DialogContent>
                <Table>
                  <TableBody>
                    {packageCurrent.items.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{ display: { xs: "block", sm: "table-row" } }}
                      >
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              wordWrap: "break-word",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell>Вес: {item.weight} кг</TableCell>
                        <TableCell>Количество: {item.quantity}</TableCell>
                        <TableCell>Страна: {item.country}</TableCell>
                        <TableCell>Цена: €{item.cost}</TableCell>
                        {/* Добавленная иконка удаления */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            )}
          </div>
          <MUIBTN
            onClick={() => setSelectedTab(2)}
            variant="contained"
            sx={{
              backgroundColor: "#220CF3",
              color: "#fff",
              textTransform: "none",
              borderRadius: "999px",
            }}
          >
            Вернуться к cодержимому
          </MUIBTN>
          <div className="my-2"></div>
          <AgreeCard
            onAgreeClick={handleAgreeClick}
            toggle1={toggle1}
            toggle2={toggle2}
            toggle3={toggle3}
            toggle4={toggle4}
            toggle5={toggle5}
            toggle6={toggle6}
            insurance={insurance}
            courier={courier}
          />
          {courier && (
            <h3 className="text-sm mt-2 mb-2">
              В цену входит курьер <span className="text-main">(+€3)</span>
            </h3>
          )}
          {insurance && (
            <h3 className="text-sm mt-2 mb-2">
              В цену входит страховка{" "}
              <span className="text-main">(+€{returnTotalCost()})</span>
            </h3>
          )}
          <h3 className="text-lg font-semibold mt-2 mb-2">
            Итого: <span className="text-main">€{totalPrice}</span>
          </h3>
        </>
      )}
    </div>
  );
};
