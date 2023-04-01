type Props = {
  isAutoGenerating: boolean;
  setIsAutoGenerating: (active: boolean) => void;
};

const CoverLetterGenerator = ({
  isAutoGenerating,
  setIsAutoGenerating,
}: Props) => {
  const handleToggle = (): void => {
    setIsAutoGenerating(!isAutoGenerating);
  };

  return (
    <div className="flex items-center justify-between h-10 rounded-md pl-3">
      <span className="text-sm font-bold text-gray-800 items-center">
        Auto generate cover letter
      </span>
      <div
        className="relative w-12 h-6 bg-gray-400 cursor-pointer min-w-[50px] rounded-xl"
        onClick={handleToggle}
      >
        <div
          className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow ${
            isAutoGenerating
              ? "transform translate-x-7 transition"
              : "transition"
          }`}
        />
      </div>
      <span className="text-sm font-bold text-gray-800 items-center ml-3 sm:ml-0">
        Generate by using job details
      </span>
    </div>
  );
};

export default CoverLetterGenerator;
