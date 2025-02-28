import { AddPackagesForm, AddPackagesFormPC } from "@features/AddPackagesForm";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { generateId } from "@shared/lib/helpers/utils";
import { useAddPackage } from "@shared/lib/hooks/Packages/useAddPackage";
import { useItemsManagement } from "@shared/lib/hooks/useItemsManagement";
import Button from "@shared/ui/Button/ui/button";
import React, { useEffect, useState } from "react";
type Item = {
  id: number;
  item_name: string;
  origin_country: string;
  quantity: string;
  weight: string;
  price: string;
};

export const AddPackages = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [current, setCurrent] = useState<any>(1);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  // const [defaultItem, setDefaultItem] = useState<Item | null>(null);
  const { addItem, removeItem } = useItemsManagement();
  const [_isDataLoaded, setIsDataLoaded] = useState(false);

  if (addItem) {
    console.log(addItem);
  }
  // Господи, не удаляйте эту функцию, она спасла жизнь многим детям в будующем
  useEffect(() => {
    // Используем setTimeout для отладки проблемы с загрузкой
    setTimeout(() => {
      const packageData = localStorage.getItem("packageId");
      if (packageData) {
        const parsedPackage = JSON.parse(packageData); // Парсим строку из localStorage
        if (parsedPackage && parsedPackage.items) {
          console.log(
            "Загрузка предметов из localStorage:",
            parsedPackage.items
          );
          setItems(parsedPackage.items); // Устанавливаем состояние items из localStorage
          // Устанавливаем начальное значение counter на основе максимального ID
          // const maxId = parsedPackage.items.reduce(
          //   (max: number, item: Item) => Math.max(max, item.id),
          //   0
          // );
        }
      }
      setIsDataLoaded(true); // Устанавливаем флаг, что данные успешно загружены
    }, 500); // 500ms задержка для корректной инициализации состояния
  }, []);

  // Загрузка предметов из localStorage при загрузке компонента
  useEffect(() => {
    const packageData = localStorage.getItem("packageId");
    if (packageData) {
      const parsedPackage = JSON.parse(packageData);
      if (
        parsedPackage &&
        parsedPackage.items &&
        parsedPackage.items.length > 0
      ) {
        const loadedItems = parsedPackage.items;
        setItems(loadedItems);

        // Устанавливаем первый предмет в качестве текущего по умолчанию
        const firstItem = loadedItems[0];
        setCurrent(firstItem.id);
        setSelectedItem(firstItem);
        setItemName(firstItem.name);
        setOriginCountry(firstItem.country);
        setQuantity(firstItem.quantity);
        setWeight(firstItem.weight);
        setPrice(firstItem.cost);
      }
    }
  }, []);

  const handleUpdateItem = () => {
    if (!selectedItem) return;

    // Обновленный элемент
    const updatedItem: Item = {
      ...selectedItem,
      item_name: itemName,
      origin_country: originCountry,
      quantity: quantity,
      weight: weight,
      price: price,
    };

    // Заменяем элемент в массиве
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );

    // Считаем общий вес всех элементов после обновления
    const totalWeight = updatedItems.reduce(
      (sum, item) => sum + parseInt(item.weight),
      0
    );

    if (
      totalWeight > (parseFloat(localStorage.getItem("weight") || "any") || 15)
    ) {
      alert(
        `Общий вес всех предметов (${totalWeight} кг) не может превышать веса который вы ввели в посылке или быть более 15 кг!`
      );
      return; // Прекращаем выполнение, если превышен лимит
    }

    // Обновляем состояние и сохраняем в localStorage
    setItems(updatedItems);
    syncLocalStorage(updatedItems);

    setSelectedItem(null); // Сбрасываем состояние редактируемого элемента
    clearForm(); // Очищаем поля формы после редактирования
  };

  // Синхронизация `localStorage` при изменении `items`
  const syncLocalStorage = (updatedItems: Item[]) => {
    const packageData = JSON.parse(localStorage.getItem("packageId") || "{}");
    packageData.items = updatedItems;
    localStorage.setItem("packageId", JSON.stringify(packageData));
  };

  // Обработчик добавления предмета с новым ID
  const handleAddItem = () => {
    if (!itemName || !originCountry || !quantity || !weight || !price) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    // Вес нового элемента
    const newItemWeight = parseInt(weight);
    // Суммируем вес всех элементов + новый элемент
    const totalWeight =
      items.reduce((sum, item) => sum + parseInt(item.weight), 0) +
      newItemWeight;

    if (
      totalWeight > (parseFloat(localStorage.getItem("weight") || "any") || 15)
    ) {
      alert(
        `Общий вес всех предметов (${totalWeight} кг) не может превышать веса который вы ввели в посылке или быть более 15 кг!`
      );
      return; // Прекращаем выполнение, если превышен лимит
    }

    const newItem: Item = {
      id: generateId(),
      item_name: itemName,
      origin_country: originCountry,
      quantity: quantity,
      weight: weight,
      price: price,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    syncLocalStorage(updatedItems);

    clearForm();
  };
  // Обработчик удаления предмета
  const handleRemoveItem = (id: number) => {
    removeItem(id); // Используем существующий метод `removeItem` из хука
    // Обновляем состояние напрямую
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (items.length > 0) {
      const firstItem = items[0];
      setSelectedItem(firstItem);
      setCurrent(firstItem.id);
      setItemName(firstItem.item_name);
      setOriginCountry(firstItem.origin_country);
      setQuantity(firstItem.quantity);
      setWeight(firstItem.weight);
      setPrice(firstItem.price);
    } else {
      // Если нет элементов, сбросить значения
      setSelectedItem(null);
      setCurrent(null);
      clearForm();
    }
  }, [items]);

  // const checkTotalWeight = (newItemWeight: number) => {
  //   const packageData = localStorage.getItem("packageId");
  //   if (packageData) {
  //     const parsedPackage = JSON.parse(packageData);
  //     if (parsedPackage && parsedPackage.items) {
  //       // Вычисляем общий вес предметов
  //       const totalWeight = parsedPackage.items.reduce(
  //         (sum: number, item: Item) => sum + item.weight,
  //         0
  //       );
  //       // Добавляем вес нового предмета
  //       const newTotalWeight = totalWeight + newItemWeight;
  //       // Проверяем, меньше ли общий вес 15 кг
  //       return newTotalWeight <= 15;
  //     }
  //   }
  //   return true; // Если нет данных в localStorage, то проверка пройдена
  // };

  // const saveItemsToPackage = (updatedItems: Item[]) => {
  //   const packageData = JSON.parse(localStorage.getItem("packageId") || "{}");
  //   const updatedPackageData = {
  //     ...packageData,
  //     items: updatedItems,
  //   };

  //   localStorage.setItem("packageId", JSON.stringify(updatedPackageData));
  // };

  const clearForm = () => {
    setItemName("");
    setOriginCountry("");
    setQuantity("");
    setWeight("");
    setPrice("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let updatedItems = items;

    if (selectedItem) {
      updatedItems = items.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              item_name: itemName,
              origin_country: originCountry,
              quantity: quantity,
              weight: weight,
              price: price,
            }
          : item
      );

      setItems(updatedItems);
      setSelectedItem(null);
    } else {
      if (
        itemName !== "" &&
        originCountry !== "" &&
        quantity !== "" &&
        weight !== "" &&
        price !== ""
      ) {
        const newItem: Item = {
          id: generateId(),
          item_name: itemName,
          origin_country: originCountry,
          quantity: quantity,
          weight: weight,
          price: price,
        };
        updatedItems = [...items, newItem];
        setItems(updatedItems);
      }
    }

    const backendItems = updatedItems.map((item) => ({
      name: item.item_name,
      country: item.origin_country,
      quantity: parseInt(item.quantity, 10),
      weight: parseInt(item.weight, 10),
      cost: parseInt(item.price, 10),
    }));

    // console.log("backend items:", backendItems);

    const current_package = await useAddPackage({
      items: backendItems,
      status: "Pending",
    });
    if (current_package) {
      localStorage.setItem("packageId", JSON.stringify(current_package));
    }

    const newItemWeight = parseInt(weight);
    // Суммируем вес всех элементов + новый элемент
    const totalWeight =
      items.reduce((sum, item) => sum + parseInt(item.weight), 0) +
      newItemWeight;

    if (
      totalWeight > (parseFloat(localStorage.getItem("weight") || "any") || 15)
    ) {
      alert(
        `Общий вес всех предметов (${totalWeight} кг) не может превышать веса который вы ввели в посылке или быть более 15 кг!`
      );
      return; // Прекращаем выполнение, если превышен лимит
    }

    // setItems([]);
    setItemName("");
    setOriginCountry("");
    setQuantity("");
    setWeight("");
    setPrice("");
    window.location.href = "/application";
  };

  const handleSelectItem = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
      setCurrent(item.id);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col w-full">
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: 250,
                borderRadius: 2,
                boxShadow: 3,
                mb: 3,
                backgroundColor: "#fff",
              }}
            >
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {item.item_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Страна: {item.origin_country}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Количество: {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Вес: {item.weight} кг
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Цена: {item.price} €
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    text="Удалить"
                    buttonType="outline"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 w-full"
                  />
                </CardActions>
              </Card>
            </Box>
          ))}
        </div>
        <div className="flex items-center justify-center mt-4 w-[60%]">
          <select
            value={current || ""}
            onChange={(e) => {
              handleSelectItem(parseInt(e.target.value, 10));
            }}
            className="border px-2 py-1 rounded-md w-full"
          >
            <option value="" disabled>
              Предметы
            </option>
            {items.map((item, index) => (
              <option key={item.id} value={item.id}>
                Предмет {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <AddPackagesForm
        item={selectedItem}
        itemName={itemName}
        originCountry={originCountry}
        quantity={quantity}
        weight={weight}
        price={price}
        setItemName={setItemName}
        setOriginCountry={setOriginCountry}
        setQuantity={setQuantity}
        setWeight={setWeight}
        setPrice={setPrice}
        handleAddItem={handleAddItem}
        handleItemChange={handleUpdateItem}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export const AddPackagesPC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [current, setCurrent] = useState<any>(1);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  // const [defaultItem, setDefaultItem] = useState<Item | null>(null);
  const { addItem, removeItem } = useItemsManagement();
  // const [isDataLoaded, setIsDataLoaded] = useState(false); // Флаг для отслеживания загрузки данных

  if (addItem) {
    console.log(addItem);
  }
  // Господи, не удаляйте эту функцию, она спасла жизнь многим детям в будующем
  useEffect(() => {
    // Используем setTimeout для отладки проблемы с загрузкой
    setTimeout(() => {
      const packageData = localStorage.getItem("packageId");
      if (packageData) {
        const parsedPackage = JSON.parse(packageData); // Парсим строку из localStorage
        if (parsedPackage && parsedPackage.items) {
          // console.log(
          //   "Загрузка предметов из localStorage:",
          //   parsedPackage.items
          // );
          setItems(parsedPackage.items); // Устанавливаем состояние items из localStorage
          // Устанавливаем начальное значение counter на основе максимального ID
          // const maxId = parsedPackage.items.reduce(
          //   (max: number, item: Item) => Math.max(max, item.id),
          //   0
          // );
        }
      }
      // setIsDataLoaded(true); // Устанавливаем флаг, что данные успешно загружены
    }, 500); // 500ms задержка для корректной инициализации состояния
  }, []);

  // Загрузка предметов из localStorage при загрузке компонента
  useEffect(() => {
    const packageData = localStorage.getItem("packageId");
    if (packageData) {
      const parsedPackage = JSON.parse(packageData);
      if (
        parsedPackage &&
        parsedPackage.items &&
        parsedPackage.items.length > 0
      ) {
        const loadedItems = parsedPackage.items;
        setItems(loadedItems);

        // Устанавливаем первый предмет в качестве текущего по умолчанию
        const firstItem = loadedItems[0];
        setCurrent(firstItem.id);
        setSelectedItem(firstItem);
        setItemName(firstItem.item_name);
        setOriginCountry(firstItem.origin_country);
        setQuantity(firstItem.quantity);
        setWeight(firstItem.weight);
        setPrice(firstItem.price);
      }
    }
  }, []);

  const handleUpdateItem = () => {
    if (!selectedItem) return;

    // Обновленный элемент
    const updatedItem: Item = {
      ...selectedItem,
      item_name: itemName,
      origin_country: originCountry,
      quantity: quantity,
      weight: weight,
      price: price,
    };

    // Заменяем элемент в массиве
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );

    // Считаем общий вес всех элементов после обновления
    const totalWeight = updatedItems.reduce(
      (sum, item) => sum + parseInt(item.weight),
      0
    );
    const totalPrice = items.reduce(
      (sum, item) => sum + parseInt(item.price),
      0
    );

    if (
      totalWeight > (parseFloat(localStorage.getItem("weight") || "any") || 15)
    ) {
      alert(
        `Общий вес всех предметов (${totalWeight} кг) не может превышать веса который вы ввели в посылке или быть более 15 кг!`
      );
      return; // Прекращаем выполнение, если превышен лимит
    }

    if (totalPrice > 1000) {
      alert(
        `Общая стоимость всех предметов (${totalPrice} €) не может превышать 1000 €!`
      );
      return; // Прекращаем выполнение, если превышен лимит стоимости
    }

    // Обновляем состояние и сохраняем в localStorage
    setItems(updatedItems);
    syncLocalStorage(updatedItems);

    setSelectedItem(null); // Сбрасываем состояние редактируемого элемента
    clearForm(); // Очищаем поля формы после редактирования
  };

  // Синхронизация `localStorage` при изменении `items`
  const syncLocalStorage = (updatedItems: Item[]) => {
    const packageData = JSON.parse(localStorage.getItem("packageId") || "{}");
    packageData.items = updatedItems;
    localStorage.setItem("packageId", JSON.stringify(packageData));
  };

  // Обработчик добавления предмета с новым ID
  const handleAddItem = () => {
    if (!itemName || !originCountry || !quantity || !weight || !price) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    // Вес нового элемента
    const newItemWeight = parseInt(weight);
    const newItemPrice = parseInt(price);

    // Суммируем вес всех элементов + новый элемент
    const totalWeight =
      items.reduce((sum, item) => sum + parseInt(item.weight), 0) +
      newItemWeight;
    const totalPrice =
      items.reduce((sum, item) => sum + parseInt(item.price), 0) + newItemPrice;

    if (
      totalWeight > (parseFloat(localStorage.getItem("weight") || "0") || 15)
    ) {
      alert(
        `Общий вес всех предметов (${totalWeight} кг) не может превышать веса который вы ввели в посылке или быть более 15 кг!`
      );
      return; // Прекращаем выполнение, если превышен лимит
    }

    if (totalPrice > 1000) {
      alert(
        `Общая стоимость всех предметов (${totalPrice} €) не может превышать 1000 €!`
      );
      return; // Прекращаем выполнение, если превышен лимит стоимости
    }

    const newItem: Item = {
      id: generateId(), // Уникальный ID
      item_name: itemName,
      origin_country: originCountry,
      quantity: quantity,
      weight: weight,
      price: price,
    };

    // Обновляем массив элементов и сохраняем в localStorage
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    syncLocalStorage(updatedItems);

    clearForm(); // Очищаем форму после добавления
  };
  // Обработчик удаления предмета
  const handleRemoveItem = (id: number) => {
    removeItem(id); // Используем существующий метод `removeItem` из хука
    // Обновляем состояние напрямую
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (items.length > 0) {
      const firstItem = items[0];
      setSelectedItem(firstItem);
      setCurrent(firstItem.id);
      setItemName(firstItem.item_name);
      setOriginCountry(firstItem.origin_country);
      setQuantity(firstItem.quantity);
      setWeight(firstItem.weight);
      setPrice(firstItem.price);
    } else {
      // Если нет элементов, сбросить значения
      setSelectedItem(null);
      setCurrent(null);
      clearForm();
    }
  }, [items]);

  // const checkTotalWeight = (newItemWeight: number) => {
  //   const packageData = localStorage.getItem("packageId");
  //   if (packageData) {
  //     const parsedPackage = JSON.parse(packageData);
  //     if (parsedPackage && parsedPackage.items) {
  //       // Вычисляем общий вес предметов
  //       const totalWeight = parsedPackage.items.reduce(
  //         (sum: number, item: Item) => sum + item.weight,
  //         0
  //       );
  //       // Добавляем вес нового предмета
  //       const newTotalWeight = totalWeight + newItemWeight;
  //       // Проверяем, меньше ли общий вес 15 кг
  //       return newTotalWeight <= 15;
  //     }
  //   }
  //   return true; // Если нет данных в localStorage, то проверка пройдена
  // };

  // const saveItemsToPackage = (updatedItems: Item[]) => {
  //   const packageData = JSON.parse(localStorage.getItem("packageId") || "{}");
  //   const updatedPackageData = {
  //     ...packageData,
  //     items: updatedItems,
  //   };

  //   localStorage.setItem("packageId", JSON.stringify(updatedPackageData));
  // };

  const clearForm = () => {
    setItemName("");
    setOriginCountry("");
    setQuantity("");
    setWeight("");
    setPrice("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let updatedItems = items;

    if (selectedItem) {
      updatedItems = items.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              item_name: itemName,
              origin_country: originCountry,
              quantity: quantity,
              weight: weight,
              price: price,
            }
          : item
      );

      // const newItemWeight = parseInt(weight);
      // Суммируем вес всех элементов + новый элемент
      // const totalWeight =
      //   items.reduce((sum, item) => sum + parseInt(item.weight), 0) +
      //   newItemWeight;

      // if (
      //   totalWeight >
      //   (parseFloat(localStorage.getItem("weight") || "any") || 15)
      // ) {
      //   alert(
      //     `Общий вес всех предметов (${totalWeight} кг) не может превышать веса который вы ввели в посылке или быть более 15 кг!`
      //   );
      //   return; // Прекращаем выполнение, если превышен лимит
      // }

      setItems(updatedItems);
      setSelectedItem(null);
    } else {
      if (
        itemName !== "" &&
        originCountry !== "" &&
        quantity !== "" &&
        weight !== "" &&
        price !== ""
      ) {
        // const newItemWeight = parseInt(weight);
        // Суммируем вес всех элементов + новый элемент
        // const totalWeight =
        //   items.reduce((sum, item) => sum + parseInt(item.weight), 0) +
        //   newItemWeight;

        // if (
        //   totalWeight >
        //   (parseFloat(localStorage.getItem("weight") || "any") || 15)
        // ) {
        //   console.log("Works");
        //   alert(
        //     `Общий вес всех предметов (${totalWeight} кг) не может превышать веса который вы ввели в посылке или быть более 15 кг!`
        //   );
        //   return; // Прекращаем выполнение, если превышен лимит
        // }
        const newItem: Item = {
          id: generateId(),
          item_name: itemName,
          origin_country: originCountry,
          quantity: quantity,
          weight: weight,
          price: price,
        };
        updatedItems = [...items, newItem];
        setItems(updatedItems);
      }
    }

    const backendItems = updatedItems.map((item) => ({
      name: item.item_name,
      country: item.origin_country,
      quantity: parseInt(item.quantity, 10),
      weight: parseInt(item.weight, 10),
      cost: parseInt(item.price, 10),
    }));

    // console.log("backend items:", backendItems);

    const current_package = await useAddPackage({
      items: backendItems,
      status: "Pending",
    });
    if (current_package) {
      localStorage.setItem("packageId", JSON.stringify(current_package));
    }

    // setItems([]);
    setItemName("");
    setOriginCountry("");
    setQuantity("");
    setWeight("");
    setPrice("");
    window.location.href = "/application";
  };

  const handleSelectItem = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
      setCurrent(item.id);
    }
  };
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {items.map((item) => {
          // Получение данных из localStorage
          const storedPackage = JSON.parse(
            localStorage?.getItem("packageId") || "{}"
          );
          const storedItem =
            storedPackage?.items?.find(
              (stored: { id: number }) => stored.id === item.id
            ) || {};

          return (
            <Box
              key={item.id}
              sx={{
                width: 250,
                borderRadius: 2,
                boxShadow: 3,
                mb: 3,
                backgroundColor: "#fff",
              }}
            >
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {item.item_name || storedItem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Страна: {item.origin_country || storedItem.country}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Количество: {item.quantity || storedItem.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Вес: {item.weight || storedItem.weight} кг
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Цена: {item.price || storedItem.cost} €
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    text="Удалить"
                    buttonType="outline"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 w-full"
                  />
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </div>
      <div className="flex items-center flex-col w-full">
        <div className="flex items-center justify-center mt-4 w-[60%]">
          <select
            value={current || ""}
            onChange={(e) => {
              handleSelectItem(parseInt(e.target.value, 10));
            }}
            className="border px-2 py-1 rounded-md w-full"
          >
            <option value="" disabled>
              Предметы
            </option>
            {items.map((item, index) => (
              <option key={item.id} value={item.id}>
                Предмет {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <AddPackagesFormPC
        item={selectedItem}
        itemName={itemName}
        originCountry={originCountry}
        quantity={quantity}
        weight={weight}
        price={price}
        setItemName={setItemName}
        setOriginCountry={setOriginCountry}
        setQuantity={setQuantity}
        setWeight={setWeight}
        setPrice={setPrice}
        handleAddItem={handleAddItem}
        handleItemChange={handleUpdateItem}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
