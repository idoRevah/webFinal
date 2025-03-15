"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var framer_motion_1 = require("framer-motion");
var react_router_dom_1 = require("react-router-dom");
var BlogGrid = function (_a) {
    var posts = _a.posts;
    var navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <framer_motion_1.AnimatePresence>
        {posts.map(function (post, index) { return (<framer_motion_1.motion.div key={post.id} initial={{ opacity: 0, y: 40 }} onClick={function () { return navigate("/post/".concat(post._id)); }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} // 💨 **Smooth fade out**
         transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeInOut",
            }} whileHover={{ scale: 1.05 }} // 🚀 **Subtle hover effect**
         className="relative overflow-hidden rounded-lg shadow-lg hover:scale-[1.05] transition transform duration-500">
            <img src={post.imageSrc} className="w-full h-64 object-cover opacity-80" alt={post.title}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-2xl font-semibold text-white">
                {post.title}
              </h2>
              <p className="text-gray-300 mt-1 text-sm">{post.subtitle}</p>
              <p className="text-xs text-gray-400 mt-1">
                {post.author} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </framer_motion_1.motion.div>); })}
      </framer_motion_1.AnimatePresence>
    </div>);
};
exports.default = BlogGrid;
