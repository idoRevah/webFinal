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
exports.default = CommentsSection;
var AuthContext_1 = require("@/context/AuthContext");
var react_1 = require("react");
var fa_1 = require("react-icons/fa"); // Like icons
function CommentsSection(_a) {
    var _this = this;
    var comments = _a.comments, postId = _a.postId;
    var _b = (0, react_1.useState)(comments), commentList = _b[0], setCommentList = _b[1];
    var _c = (0, react_1.useState)(""), newComment = _c[0], setNewComment = _c[1];
    var _d = (0, AuthContext_1.useAuth)(), user = _d.user, token = _d.token;
    // Handle like action
    // TODO: backend
    var handleLike = function (index) {
        var updatedComments = __spreadArray([], commentList, true);
        updatedComments[index].likes += 1;
        setCommentList(updatedComments);
    };
    // Handle adding a new comment
    var handleAddComment = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, newCommentObject, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(postId);
                    return [4 /*yield*/, fetch("http://localhost:3000/posts/".concat(postId, "/comments"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(token),
                            },
                            body: JSON.stringify({ content: newComment }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to create comment");
                    }
                    setNewComment(""); // Clear input field
                    return [4 /*yield*/, response.json()];
                case 2:
                    newCommentObject = _a.sent();
                    setCommentList(__spreadArray([newCommentObject], commentList, true));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log("error");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="mt-10">
      <h2 className="text-2xl font-semibold">Comments</h2>

      {/* Add New Comment Box */}
      <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        <textarea className="w-full p-2 text-gray-300 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Write a comment..." value={newComment} onChange={function (e) { return setNewComment(e.target.value); }}/>
        <button onClick={handleAddComment} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md">
          Add Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="mt-4 space-y-4">
        {commentList.length > 0 ? (commentList.map(function (comment, index) { return (<div key={index} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 flex flex-col">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{comment.author}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {/* Like Button */}
                <div className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-blue-400 transition-all" onClick={function () { return handleLike(index); }}>
                  {comment.likes > 0 ? <fa_1.FaThumbsUp /> : <fa_1.FaRegThumbsUp />}
                  <span>{comment.likes}</span>
                </div>
              </div>
              <p className="text-gray-300 mt-2">{comment.content}</p>
            </div>); })) : (<p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>)}
      </div>
    </div>);
}
