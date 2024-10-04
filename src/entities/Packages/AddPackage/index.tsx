import { AddPackagesForm, AddPackagesFormPC } from "@features/AddPackagesForm";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [counter, setCounter] = useState(1);
  const [current, setCurrent] = useState(1);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { addItem, removeItem } = useItemsManagement();

  const handleAddItem = () => {
    if (!itemName || !originCountry || !quantity || !weight || !price) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    let updatedItems: Item[] = [];

    // Если редактируем существующий предмет
    if (selectedItem) {
      const updatedItem: Item = {
        ...selectedItem,
        item_name: itemName,
        origin_country: originCountry,
        quantity: quantity,
        weight: weight,
        price: price,
      };

      // Удаляем старую версию и добавляем обновленную версию предмета
      updatedItems = items.map((item) =>
        item.id === selectedItem.id ? updatedItem : item
      ); // Обновляем локальный массив
      addItem(updatedItem); // Добавляем обновленный элемент в `items` из `useItemsManagement`
      setSelectedItem(null); // Сбрасываем состояние редактируемого элемента
      setCurrent(updatedItem.id); // Устанавливаем текущий элемент
    } else {
      // Добавление нового элемента
      const newItem: Item = {
        id: counter, // Используем внутренний счетчик для ID
        item_name: itemName,
        origin_country: originCountry,
        quantity: quantity,
        weight: weight,
        price: price,
      };

      addItem(newItem); // Добавляем новый элемент в `items` из `useItemsManagement`
      updatedItems = [...items, newItem]; // Обновляем локальный массив предметов

      // Обновление счетчика для следующего элемента
      setCounter((prevCounter) => {
        const newCounter = prevCounter + 1;
        setCurrent(newCounter); // Устанавливаем текущий элемент
        return newCounter;
      });
    }

    // Сохранение предметов в localStorage как packageId
    saveItemsToPackage(updatedItems);

    clearForm(); // Очищаем поля формы после добавления или редактирования
  };

  // Функция для сохранения предметов в packageId внутри localStorage
  const saveItemsToPackage = (updatedItems: Item[]) => {
    const packageData = JSON.parse(localStorage.getItem("packageId") || "{}");
    const updatedPackageData = {
      ...packageData,
      items: updatedItems,
    };

    localStorage.setItem("packageId", JSON.stringify(updatedPackageData));
  };

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
      setCurrent(counter);
    } else {
      if (
        itemName !== "" &&
        originCountry !== "" &&
        quantity !== "" &&
        weight !== "" &&
        price !== ""
      ) {
        const newItem: Item = {
          id: counter,
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

    console.log(backendItems);

    const current_package = await useAddPackage({
      items: backendItems,
      status: "Pending",
    });
    if (current_package) {
      localStorage.setItem("packageId", JSON.stringify(current_package));
    }

    setItems([]);
    setItemName("");
    setOriginCountry("");
    setQuantity("");
    setWeight("");
    setPrice("");
    window.location.href = "/application";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectItem = (index: number) => {
    setSelectedItem(items[index]);
    setCurrent(items[index].id);
    setIsMenuOpen(false);
  };

  return (
    <>
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
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                Предмет {item.id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex max-w-fit items-center justify-center">
          <Button
            text={`Предмет ${current}`}
            buttonType="filled"
            onClick={toggleMenu}
          />
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
  const [counter, setCounter] = useState(1);
  const [current, setCurrent] = useState(1);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { addItem, removeItem } = useItemsManagement();

  // Загрузка предметов из localStorage при загрузке компонента
  useEffect(() => {
    const packageData = localStorage.getItem("packageId");
    if (packageData) {
      const parsedPackage = JSON.parse(packageData);
      if (parsedPackage && parsedPackage.items) {
        setItems(parsedPackage.items);
        setCounter(
          parsedPackage.items.length > 0
            ? parsedPackage.items[parsedPackage.items.length - 1].id + 1
            : 1
        );
      }
    }
  }, []);

  // Обновление предметов и сохранение в localStorage
  useEffect(() => {
    const packageData = localStorage.getItem("packageId");
    if (packageData) {
      const parsedPackage = JSON.parse(packageData);
      const updatedPackage = {
        ...parsedPackage,
        items,
      };
      localStorage.setItem("packageId", JSON.stringify(updatedPackage));
    }
  }, [items]);

  const handleAddItem = () => {
    if (!itemName || !originCountry || !quantity || !weight || !price) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    let updatedItems: Item[] = [];

    // Если редактируем существующий предмет
    if (selectedItem) {
      const updatedItem: Item = {
        ...selectedItem,
        item_name: itemName,
        origin_country: originCountry,
        quantity: quantity,
        weight: weight,
        price: price,
      };

      // Обновляем предметы, заменяя отредактированный элемент
      updatedItems = items.map((item) =>
        item.id === selectedItem.id ? updatedItem : item
      );
    } else {
      // Добавление нового элемента
      const newItem: Item = {
        id: counter, // Используем внутренний счетчик для ID
        item_name: itemName,
        origin_country: originCountry,
        quantity: quantity,
        weight: weight,
        price: price,
      };

      // Обновляем массив с новым элементом
      updatedItems = [...items, newItem];
    }

    // Проверяем, не превышает ли общий вес 15 кг после добавления или изменения предмета
    const totalWeight = updatedItems.reduce(
      (sum, item) => sum + parseInt(item.weight),
      0
    );

    if (totalWeight > 15) {
      alert(
        `Общий вес всех предметов (${totalWeight} кг) не может превышать 15 кг!`
      );
      return; // Прекращаем выполнение, если превышен лимит
    }

    // Обновляем состояние items только если общий вес допустим
    const newItem: Item = {
      id: counter, // Используем внутренний счетчик для ID
      item_name: itemName,
      origin_country: originCountry,
      quantity: quantity,
      weight: weight,
      price: price,
    };
    setItems(updatedItems);
    addItem(newItem);
    saveItemsToPackage(updatedItems);

    // Если это был новый элемент, обновляем счетчик
    if (!selectedItem) {
      setCounter((prevCounter) => {
        const newCounter = prevCounter + 1;
        setCurrent(newCounter); // Устанавливаем текущий элемент
        return newCounter;
      });
    }

    setSelectedItem(null); // Сбрасываем состояние редактируемого элемента
    clearForm(); // Очищаем поля формы после добавления или редактирования
  };

  const checkTotalWeight = (newItemWeight: number) => {
    const packageData = localStorage.getItem("packageId");
    if (packageData) {
      const parsedPackage = JSON.parse(packageData);
      if (parsedPackage && parsedPackage.items) {
        // Вычисляем общий вес предметов
        const totalWeight = parsedPackage.items.reduce(
          (sum: number, item: Item) => sum + item.weight,
          0
        );
        // Добавляем вес нового предмета
        const newTotalWeight = totalWeight + newItemWeight;
        // Проверяем, меньше ли общий вес 15 кг
        return newTotalWeight <= 15;
      }
    }
    return true; // Если нет данных в localStorage, то проверка пройдена
  };
  // Функция для сохранения предметов в packageId внутри localStorage

  const saveItemsToPackage = (updatedItems: Item[]) => {
    const packageData = JSON.parse(localStorage.getItem("packageId") || "{}");
    const updatedPackageData = {
      ...packageData,
      items: updatedItems,
    };

    localStorage.setItem("packageId", JSON.stringify(updatedPackageData));
  };

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
      setCurrent(counter);
    } else {
      if (
        itemName !== "" &&
        originCountry !== "" &&
        quantity !== "" &&
        weight !== "" &&
        price !== ""
      ) {
        const newItem: Item = {
          id: counter,
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

    console.log("backend items:", backendItems);

    const current_package = await useAddPackage({
      items: backendItems,
      status: "Pending",
    });
    if (current_package) {
      localStorage.setItem("packageId", JSON.stringify(current_package));
    }

    setItems([]);
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
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 w-full"
                />
              </CardActions>
            </Card>
          </Box>
        ))}
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
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                Предмет {item.id}
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
        handleSubmit={handleSubmit}
      />
    </>
  );
};
