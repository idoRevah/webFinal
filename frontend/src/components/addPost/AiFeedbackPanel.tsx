import { ThumbsUpIcon } from "lucide-react";

interface AIFeedbackPanelProps {
  feedback: string[];
  setFeedback: (feedback: string[]) => void;
}

export default function AIFeedbackPanel({
  feedback,
  setFeedback,
}: AIFeedbackPanelProps) {
  const dismissFeedback = (index: number) => {
    setFeedback(feedback.filter((_, i) => i !== index));
  };

  return (
    <div className="col-span-1 p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
        ✨ AI Feedback
      </h2>
      <div className="space-y-3">
        {feedback.length > 0 ? (
          feedback.map((message, index) => (
            <div
              key={index}
              className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
            >
              <span className="text-white">{message}</span>
              <button
                className="text-yellow-400 hover:text-green-500"
                onClick={() => dismissFeedback(index)}
              >
                <ThumbsUpIcon className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">
            No suggestions at the moment. Keep writing!
          </p>
        )}
      </div>
    </div>
  );
}
