const SuggestionBox = ({ suggestion, onClick }) => {
  return (
    <div
      onClick={() => onClick(suggestion)}
      className="cursor-pointer bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200"
    >
      {suggestion}
    </div>
  );
};

export default SuggestionBox;
