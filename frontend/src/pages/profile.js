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
exports.default = Profile;
var material_1 = require("@mui/material");
var AuthContext_1 = require("@/context/AuthContext");
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
function Profile() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, logout = _a.logout;
    var _b = (0, react_1.useState)([]), posts = _b[0], setPosts = _b[1];
    (0, react_1.useEffect)(function () {
        var fetchUserPosts = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, userPosts, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user === null || user === void 0 ? void 0 : user.id))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("http://localhost:3000/posts")];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        console.log(user);
                        console.log(data);
                        userPosts = data.filter(function (p) { return p.author == user.username; });
                        setPosts(userPosts);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Failed to fetch user posts:", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchUserPosts();
    }, [user]);
    return (<div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181A23] to-[#1F2230] overflow-hidden p-6">
      {/* Background Lighting Effect */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-white opacity-5 blur-[160px] rounded-full top-[-200px] left-[-200px]"></div>
      </div>

      {/* Floating Glassmorphism Profile Card */}
      <framer_motion_1.motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-10 bg-white/10 backdrop-blur-lg p-14 rounded-3xl 
        shadow-lg border border-white/15 hover:scale-105 transition-all duration-500 w-[480px] text-center">
        <h2 className="text-3xl font-bold text-white">
          Hello, {(user === null || user === void 0 ? void 0 : user.username) || "Guest"}! 👋
        </h2>
        <img src={(user === null || user === void 0 ? void 0 : user.imageUrl) || "https://via.placeholder.com/100"} alt="Profile" className="w-28 h-28 rounded-full mx-auto mt-6 shadow-lg border-4 border-white"/>
        <material_1.Button variant="contained" className="bg-red-500 text-white w-full mt-6 py-3 text-lg rounded-xl hover:bg-red-600 transition-all" onClick={logout}>
          Sign Out
        </material_1.Button>
      </framer_motion_1.motion.div>

      {/* User's Posts */}
      <div className="mt-12 w-full max-w-4xl">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Your Posts
        </h3>

        {posts.length === 0 ? (<p className="text-gray-400 text-center">No posts yet.</p>) : (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map(function (post) { return (<framer_motion_1.motion.div key={post._id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:scale-105 transition-transform duration-300" onClick={function () { return navigate("/post/".concat(post._id)); }}>
                <img src={post.imageSrc} alt={post.title} className="w-full h-40 object-cover rounded-md mb-3"/>
                <h4 className="text-lg font-semibold text-white">
                  {post.title}
                </h4>
                <p className="text-gray-400 text-sm mt-1">{post.subtitle}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </framer_motion_1.motion.div>); })}
          </framer_motion_1.motion.div>)}
      </div>
    </div>);
}
