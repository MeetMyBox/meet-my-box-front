interface IBurgerButton {
  onClick: () => void;
}

export const BurgerButton: React.FC<IBurgerButton> = ({ onClick }) => {
  return (
    <button
      className="w-[32px] flex flex-col items-start gap-2"
      onClick={onClick}
    >
      <span className="rounded-full bg-main w-full h-[2px]" />
      <span className="rounded-full bg-main w-full h-[2px]" />
      <span className="rounded-full bg-main w-full h-[2px]" />
    </button>
  );
};
