import { useEffect, useState } from "react";
import type { Item } from "./Packages/useAddPackage";

export const useItemsManagement = () => {
  const [items, setItems] = useState<Item[]>([]);

  // Загрузка предметов из localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("packageItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Обновление localStorage при изменении items
  useEffect(() => {
    localStorage.setItem("packageItems", JSON.stringify(items));
  }, [items]);

  // Добавление нового предмета
  const addItem = (newItem: any) => {
    setItems((prevItems: any) => {
      // Проверяем, нет ли уже элемента с таким же ID
      const exists = prevItems.find((item: any) => item.id === newItem.id);
      if (exists) {
        console.error(`Item with id ${newItem.id} already exists!`);
        return prevItems; // Возвращаем старое состояние без изменений
      }

      return [...prevItems, newItem]; // Добавляем новый элемент в конец массива
    });
  };

  // Удаление предмета по ID
  const removeItem = (id: number) => {
    // Получаем текущее состояние `packageID` из localStorage
    const packageData = JSON.parse(localStorage.getItem("packageId") || "{}");

    // Проверяем, есть ли items в packageData
    if (packageData.items) {
      // Удаляем элемент из items в localStorage по ID
      const updatedPackageItems = packageData.items.filter(
        (item: any) => item.id !== id
      );
      packageData.items = updatedPackageItems;

      // Обновляем localStorage с новыми данными
      localStorage.setItem("packageId", JSON.stringify(packageData));
    }

    // Обновляем состояние items, чтобы отразить изменения
    setItems(packageData.items || []);
  };

  return { items, addItem, removeItem };
};
