"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Blog;
var react_1 = require("react");
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
var PostTitleInput_1 = require("@/components/addPost/PostTitleInput");
var PostSubtitleInput_1 = require("@/components/addPost/PostSubtitleInput");
var PostCatagorySelector_1 = require("@/components/addPost/PostCatagorySelector");
var PostContentEditor_1 = require("@/components/addPost/PostContentEditor");
var PostImageInput_1 = require("@/components/addPost/PostImageInput");
var AiFeedbackPanel_1 = require("@/components/addPost/AiFeedbackPanel");
var AuthContext_1 = require("@/context/AuthContext");
var lucide_react_1 = require("lucide-react");
var lottie_react_1 = require("lottie-react");
var loading_json_1 = require("@/assets/loading.json");
var success_json_1 = require("@/assets/success.json");
function Blog() {
    var _this = this;
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, token = _a.token;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = (0, react_1.useState)(""), title = _b[0], setTitle = _b[1];
    var _c = (0, react_1.useState)(""), subtitle = _c[0], setSubtitle = _c[1];
    var _d = (0, react_1.useState)(""), category = _d[0], setCategory = _d[1];
    var _e = (0, react_1.useState)(""), content = _e[0], setContent = _e[1];
    var _f = (0, react_1.useState)(null), imageSrc = _f[0], setImage = _f[1];
    var _g = (0, react_1.useState)([]), aiFeedback = _g[0], setAiFeedback = _g[1];
    var _h = (0, react_1.useState)([]), feedback = _h[0], setFeedback = _h[1];
    var _j = (0, react_1.useState)(false), openSnackbar = _j[0], setOpenSnackbar = _j[1];
    var _k = (0, react_1.useState)(""), alertMessage = _k[0], setAlertMessage = _k[1];
    var _l = (0, react_1.useState)(""), severity = _l[0], setSeverity = _l[1];
    var _m = (0, react_1.useState)(false), isLoading = _m[0], setIsLoading = _m[1];
    var _o = (0, react_1.useState)(false), isSuccess = _o[0], setIsSuccess = _o[1];
    var displayMessage = function (message, isError) {
        setSeverity(isError ? "error" : "success");
        setAlertMessage(message);
        setOpenSnackbar(true);
    };
    // AI Analysis Placeholder
    (0, react_1.useEffect)(function () {
        var analyzeContent = function () {
            var feedbackMessages = __spreadArray([], aiFeedback, true);
            if (content.length < 50)
                feedbackMessages.push("Your content is too short.");
            if (!content.match(/[.!?]$/))
                feedbackMessages.push("Ensure sentences end with proper punctuation.");
            if (/[^a-zA-Z0-9.,!?\s]/.test(content))
                feedbackMessages.push("Detected non-English characters.");
            setFeedback(feedbackMessages);
        };
        analyzeContent();
    }, [content]);
    var analyzeWithAI = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, aiResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!content.trim() || !title.trim()) {
                        displayMessage("Please write something before checking with AI.", true);
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("http://localhost:3000/llm/send", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ text: "".concat(title, "\n\n").concat(content) }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("AI feedback request failed");
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log(data);
                    aiResponse = JSON.parse(data.suggestions.replace(/```json|```/g, "").trim());
                    console.log(aiResponse);
                    setAiFeedback(aiResponse.suggestions);
                    setContent(content + ".");
                    displayMessage("AI feedback generated successfully!", false);
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error("AI Analysis error:", error_1);
                    displayMessage("Failed to analyze with AI.", true);
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handlePublish = function () { return __awaiter(_this, void 0, void 0, function () {
        var formData, response, data_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!imageSrc)
                        return [2 /*return*/, displayMessage("Please upload an image.", true)];
                    if (!(user === null || user === void 0 ? void 0 : user.id))
                        return [2 /*return*/, displayMessage("Please sign in first.", true)];
                    setIsLoading(true);
                    setIsSuccess(false); // Reset success animation
                    formData = new FormData();
                    formData.append("title", title);
                    formData.append("subtitle", subtitle);
                    formData.append("content", content);
                    formData.append("category", category);
                    formData.append("userId", user.id);
                    formData.append("imageSrc", imageSrc);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:3000/posts", {
                            method: "POST",
                            headers: { Authorization: "Bearer ".concat(token) },
                            body: formData,
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to publish post");
                    return [4 /*yield*/, response.json()];
                case 3:
                    data_1 = _a.sent();
                    setIsLoading(false);
                    setIsSuccess(true);
                    displayMessage("Post Created Successfully!", false);
                    console.log(data_1);
                    setTimeout(function () {
                        navigate("/post/".concat(data_1._id));
                    }, 2000);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    setIsLoading(false);
                    setIsSuccess(false);
                    displayMessage("Failed to publish post.", true);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      {/*Lottie Loading Animation */}
      {isLoading && (<div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <lottie_react_1.default animationData={loading_json_1.default} className="w-32 h-32"/>
        </div>)}

      {/* Lottie Success Animation */}
      {isSuccess && (<div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <lottie_react_1.default animationData={success_json_1.default} className="w-48 h-48"/>
        </div>)}

      <div className="bg-gray-800 p-10 rounded-xl w-full max-w-5xl shadow-lg border border-gray-700">
        <h1 className="text-4xl font-extrabold text-white text-center">
          ✍ Create Your Masterpiece
        </h1>
        <p className="text-lg text-gray-400 text-center mt-2">
          AI-powered assistant to refine your content.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="col-span-2 space-y-6">
            <PostTitleInput_1.default title={title} onChange={setTitle}/>
            <PostSubtitleInput_1.default subTitle={subtitle} onChange={setSubtitle}/>
            <PostImageInput_1.default onFileSelect={setImage}/>
            <PostCatagorySelector_1.default category={category} onChange={setCategory}/>
            <PostContentEditor_1.default content={content} onChange={setContent}/>
            <material_1.Button variant="outlined" className="text-green-400 hover:text-green-500 w-full mt-3" onClick={analyzeWithAI} disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Check with AI 🤖"}
            </material_1.Button>

            <div className="flex justify-between mt-4">
              <material_1.Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg" startIcon={<lucide_react_1.Rocket />} onClick={handlePublish} disabled={isLoading}>
                {isLoading ? "Posting..." : "Publish"}
              </material_1.Button>
              <material_1.Button variant="outlined" className="text-red-400 hover:text-red-500" startIcon={<lucide_react_1.XCircle />}>
                Cancel
              </material_1.Button>
            </div>
          </div>
          <AiFeedbackPanel_1.default feedback={feedback} setFeedback={setFeedback}/>
        </div>
      </div>

      <material_1.Snackbar open={openSnackbar} autoHideDuration={3000} onClose={function () { return setOpenSnackbar(false); }}>
        <material_1.Alert onClose={function () { return setOpenSnackbar(false); }} severity={severity} sx={{ width: "100%" }}>
          {alertMessage}
        </material_1.Alert>
      </material_1.Snackbar>
    </div>);
}
