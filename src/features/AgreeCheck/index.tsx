export const ConsentCheckbox = ({ checked, handleCheck }: any) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="consentCheckbox"
        className="mr-2 h-4 w-4 accent-blue-600 border-gray-300 rounded"
        checked={checked}
        onChange={handleCheck}
      />

      <label htmlFor="consentCheckbox" className="text-sm">
        Согласен на обработку персональных данных
      </label>
    </div>
  );
};

export default ConsentCheckbox;
