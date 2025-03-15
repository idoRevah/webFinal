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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FullPost;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var CommentsSection_1 = require("../components/fullPost/comments/CommentsSection");
function FullPost() {
    var _this = this;
    var id = (0, react_router_dom_1.useParams)().id;
    var _a = (0, react_1.useState)(null), post = _a[0], setPost = _a[1];
    (0, react_1.useEffect)(function () {
        var fetchPost = function () { return __awaiter(_this, void 0, void 0, function () {
            var postResponse, postData, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fetch("http://localhost:3000/posts/".concat(id))];
                    case 1:
                        postResponse = _b.sent();
                        return [4 /*yield*/, postResponse.json()];
                    case 2:
                        postData = _b.sent();
                        _a = postData;
                        return [4 /*yield*/, fetchComments()];
                    case 3:
                        _a.comments = _b.sent();
                        setPost(postData);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error("Failed to fetch post:", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        var fetchComments = function () { return __awaiter(_this, void 0, void 0, function () {
            var commentsResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://localhost:3000/posts/".concat(id, "/comments"))];
                    case 1:
                        commentsResponse = _a.sent();
                        return [4 /*yield*/, commentsResponse.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        fetchPost();
    }, [id]);
    if (!post) {
        return <div className="text-center text-gray-500 mt-10">Loading...</div>;
    }
    return (<div className="min-h-screen flex justify-center bg-gray-950 text-white py-12 px-4">
      <div className="bg-gray-900 shadow-lg rounded-lg w-full max-w-5xl p-8">
        <h1 className="text-3xl font-bold text-center text-white">
          {post.title}
        </h1>
        <h2 className="text-lg text-gray-400 text-center mt-1">
          {post.subtitle}
        </h2>
        <client_1.p className="text-sm text-gray-400 text-center mt-1">
          {post.author} • {new Date(post.createdAt).toLocaleDateString()}
        </client_1.p>
        <div className="my-6">
          <img src={post.imageSrc} alt="Post banner" className="rounded-lg shadow-md w-full h-64 object-cover"/>
        </div>
        <div className="text-lg text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }}/>
        {/* Comments Section */}
        {id && <CommentsSection_1.default comments={post.comments} postId={id}/>}
      </div>
    </div>);
}
