"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNewComment = exports.getPostComments = void 0;
var getPostComments = function (postId) {
    var postComments = [
        { id: 1, username: "JaneDoe", text: "Great post!", date: "Sep 10, 2025" },
        {
            id: 2,
            username: "John Smith",
            text: "Very helpful, thanks!",
            date: "Sep 11, 2025",
        },
    ];
    return postComments;
};
exports.getPostComments = getPostComments;
var saveNewComment = function (postId, comment) {
    console.log(comment);
};
exports.saveNewComment = saveNewComment;
