export const InfoScreen: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Детали о посылке</h3>
        <div className="flex items-start">
          <ul className="text-sm">
            <li>
              Максимальный вес: <strong>25 кг</strong>
            </li>
            <li>
              Максимальный объемный вес: <strong>67 кг</strong>
            </li>
            <li>
              Длина + Высота + Ширина: <strong>&lt; 170 см</strong>
            </li>
            <li>
              Самая длинная сторона не должна превышать: <strong>120 см</strong>
            </li>
            <li className="text-main mt-2">
              Пожалуйста, тщательно упакуйте посылку во избежание повреждения.
            </li>
          </ul>
        </div>
      </div>

      {/* ДЕТАЛИ УСЛУГИ */}
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Детали услуги</h3>
        <ul className="text-sm">
          <li>
            <strong>Забор:</strong> курьер заберет посылку в назначенный день
          </li>
          <li>
            <strong>Полное страхование:</strong> за 2% от ценности
          </li>
          <li>
            <strong>Лейбл:</strong> вам необходимо самостоятельно распечатать
            лейбл
          </li>
          <li className="text-gray-600 mt-2">
            Сроки доставки примерные и рассчитываются с учетом только рабочих
            дней.
          </li>
        </ul>
      </div>

      {/* ПОЛЕЗНАЯ ИНФОРМАЦИЯ */}
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Полезная информация</h3>
        <ul className="text-sm text-blue-600">
          <li>
            <a href="#" className="hover:underline">
              Товары запрещенные к пересылке
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Правила упаковки посылок
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
