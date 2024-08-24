import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-toastify";

const options = {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const FeedbackForm = ({ onClose }) => {
  const [feedback, setFeedback] = useState("");

  const handleSendFeedback = () => {
    console.log("Feedback sent:", feedback);
    toast.success("Thankyou for your feedback! 🙏", options);
    onClose();
  };

  return (
    <div className="fixed bottom-20 right-4 bg-white border border-gray-200 rounded-lg shadow-lg w-80 p-4">
      <h2 className="text-lg font-bold mb-2">Send Feedback</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full border rounded p-2 mb-4"
        placeholder="Tell us what you think and how we can improve..."
      ></textarea>
      <div className="flex justify-between items-center">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          Cancel
        </button>
        <button
          onClick={handleSendFeedback}
          disabled={feedback.trim().length < 5}
          className={`rounded-lg p-2 focus:outline-none ${
            feedback.trim().length < 5
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <Send
            size={16}
            className={`inline-block mr-1 ${
              feedback.trim().length < 5 ? "text-gray-500" : "text-white"
            }`}
          />
          Send
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
