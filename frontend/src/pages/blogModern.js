"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.default = BlogPage;
var react_1 = require("react");
var SerachBar_1 = require("../components/blogPosts/SerachBar");
var BlogGrid_1 = require("../components/blogPosts/BlogGrid");
var FeaturedPost_1 = require("../components/blogPosts/FeaturedPost");
function BlogPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), posts = _a[0], setPosts = _a[1];
    var _b = (0, react_1.useState)([]), filteredPosts = _b[0], setFilteredPosts = _b[1];
    (0, react_1.useEffect)(function () {
        var fetchPosts = function () { return __awaiter(_this, void 0, void 0, function () {
            var postsDataResponse, data, formattedPosts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://localhost:3000/posts")];
                    case 1:
                        postsDataResponse = _a.sent();
                        return [4 /*yield*/, postsDataResponse.json()];
                    case 2:
                        data = _a.sent();
                        formattedPosts = data.map(function (p) { return (__assign(__assign({}, p), { id: p._id })); });
                        setPosts(formattedPosts);
                        setFilteredPosts(formattedPosts);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchPosts();
    }, []);
    var handleSearch = function (query) {
        var filtered = posts.filter(function (post) {
            return post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.subtitle.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredPosts(filtered);
    };
    return (<div className="min-h-screen bg-gray-950 text-white py-12 px-6">
      {/* Search Bar */}
      <SerachBar_1.default onSearch={handleSearch}/>

      {/* Featured Post */}
      <FeaturedPost_1.default post={filteredPosts.length > 0 ? filteredPosts[0] : null}/>

      {/* Blog Grid with Animations */}
      <BlogGrid_1.default posts={filteredPosts.slice(1)}/>

      {/* No Results Found Message */}
      {filteredPosts.length === 0 && (<div className="text-center text-gray-500 mt-10">
          No posts found. Try a different search!
        </div>)}
    </div>);
}
