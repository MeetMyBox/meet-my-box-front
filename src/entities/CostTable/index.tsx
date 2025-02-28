import { useState } from "react";

// Компонент для таблицы со стандартной и экспресс доставкой
const PricingTable = ({ cost1, cost2 }: any) => {
  const [tableState, setTableState] = useState<"Стандарт" | "Экспресс">(
    "Стандарт"
  );

  // Данные таблицы
  // const pricingData = {
  //   standard: [
  //     { weight: "1", price: "36€" },
  //     { weight: "2", price: "38€" },
  //     { weight: "3", price: "42€" },
  //     { weight: "4", price: "44€" },
  //     { weight: "5", price: "47€" },
  //     { weight: "6", price: "48€" },
  //     { weight: "7", price: "51€" },
  //     { weight: "8", price: "54€" },
  //     { weight: "9", price: "56€" },
  //     { weight: "10", price: "58€" },
  //     { weight: "11", price: "63€" },
  //     { weight: "12", price: "66€" },
  //     { weight: "13", price: "68€" },
  //     { weight: "14", price: "71€" },
  //     { weight: "15", price: "73€" },
  //   ],
  //   express: [
  //     { weight: "1", price: "39€" },
  //     { weight: "2", price: "43€" },
  //     { weight: "3", price: "50€" },
  //     { weight: "4", price: "57€" },
  //     { weight: "5", price: "60€" },
  //     { weight: "6", price: "65€" },
  //     { weight: "7", price: "70€" },
  //     { weight: "8", price: "75€" },
  //     { weight: "9", price: "79€" },
  //     { weight: "10", price: "82€" },
  //     { weight: "11", price: "90€" },
  //     { weight: "12", price: "94€" },
  //     { weight: "13", price: "99€" },
  //     { weight: "14", price: "104€" },
  //     { weight: "15", price: "108€" },
  //   ],
  // };

  // Обработчик переключения таблицы
  const handleTableSwitch = (type: "Стандарт" | "Экспресс") => {
    setTableState(type);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {/* Кнопки переключения таблицы */}
      <div className="flex mb-4 space-x-2">
        <button
          className={`px-3 py-1 rounded-md text-sm ${
            tableState === "Стандарт" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => handleTableSwitch("Стандарт")}
        >
          Стандарт
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm ${
            tableState === "Экспресс"
              ? "bg-yellow-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => handleTableSwitch("Экспресс")}
        >
          Экспресс
        </button>
      </div>

      {/* Подсказки для сроков доставки */}
      {tableState === "Стандарт" ? (
        <div className="text-xs text-gray-600 mb-3">{cost1.info}</div>
      ) : (
        <div className="text-xs text-gray-600 mb-3">{cost2.info}</div>
      )}

      {/* Таблица с данными */}
      <div className="overflow-x-auto w-full max-w-2xl">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead>
            <tr
              className={`  ${tableState === "Стандарт" ? "bg-blue-600" : "bg-yellow-500"} text-white`}
            >
              <th className="py-2 px-2 border">
                {tableState === "Стандарт"
                  ? cost1.table_heading.heading1
                  : cost2.table_heading.heading1}
              </th>
              <th className="py-2 px-2 border">
                {tableState === "Стандарт"
                  ? cost1.table_heading.heading2
                  : cost2.table_heading.heading2}
              </th>
            </tr>
          </thead>
          <tbody>
            {(tableState === "Стандарт" ? cost1.values : cost2.values).map(
              (item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-1 px-2 border text-center">
                    {item.value1}
                  </td>
                  <td className="py-1 px-2 border text-center">
                    {item.value2}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
