import { FaArrowLeft } from "react-icons/fa";
const BackArrow = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => window.history.back()}
        className="p-2 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 focus:outline-none"
        aria-label="Go Back"
      >
        <FaArrowLeft className="w-6 h-6" />
      </button>
    </div>
  );
};

export default BackArrow;
