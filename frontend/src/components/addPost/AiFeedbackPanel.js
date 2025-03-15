"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AIFeedbackPanel;
var lucide_react_1 = require("lucide-react");
function AIFeedbackPanel(_a) {
    var feedback = _a.feedback, setFeedback = _a.setFeedback;
    var dismissFeedback = function (index) {
        setFeedback(feedback.filter(function (_, i) { return i !== index; }));
    };
    return (<div className="col-span-1 p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
        ✨ AI Feedback
      </h2>
      <div className="space-y-3">
        {feedback.length > 0 ? (feedback.map(function (message, index) { return (<div key={index} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
              <span className="text-white">{message}</span>
              <button className="text-yellow-400 hover:text-green-500" onClick={function () { return dismissFeedback(index); }}>
                <lucide_react_1.ThumbsUpIcon className="w-5 h-5"/>
              </button>
            </div>); })) : (<p className="text-gray-400 text-sm">
            No suggestions at the moment. Keep writing!
          </p>)}
      </div>
    </div>);
}
