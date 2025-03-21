import { Button, TextField, Avatar } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config/config";
import FileUploader from "@/components/addPost/PostImageInput";

export default function Profile(): JSX.Element {
    const navigate = useNavigate();
    const { user, logout, token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(user?.username || "");
    const [editedImageUrl, setEditedImageUrl] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(user?.imageUrl || null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!user?.id) return;
            try {
                const response = await fetch(`${API_BASE_URL}/posts`);
                const data = await response.json();
                const userPosts = data.filter((p) => p.author === user.username);
                setPosts(userPosts);
            } catch (error) {
                console.error("Failed to fetch user posts:", error);
            }
        };
        fetchUserPosts();
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!user?.id) return;

        const formData = new FormData();
        formData.append("username", editedUsername);
        if (editedImageUrl) {
            formData.append("imageUrl", editedImageUrl);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/${user.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }
            //Update local storage
            const updatedUser = { ...user };
            updatedUser.username = editedUsername;
            if (preview) updatedUser.imageUrl = preview;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.location.reload();

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleFileSelect = (file: File | null) => {
        setEditedImageUrl(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181A23] to-[#1F2230] overflow-hidden p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 bg-white/10 backdrop-blur-lg p-14 rounded-3xl shadow-lg border border-white/15 hover:scale-105 transition-all duration-500 w-[480px] text-center"
            >
                {isEditing ? (
                    <>
                        <TextField
                            label="Username"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <div className="flex flex-col items-center">
                            <Avatar
                                src={preview || "/placeholder-profile.png"}
                                sx={{ width: 90, height: 90, mb: 2, bgcolor: "#4A90E2" }}
                            />
                            <FileUploader onFileSelect={handleFileSelect} />
                        </div>
                        <Button
                            variant="contained"
                            onClick={handleUpdateProfile}
                            className="bg-blue-500 text-white w-full mt-6 py-3 text-lg rounded-xl hover:bg-blue-600 transition-all"
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setIsEditing(false)}
                            className="text-white w-full mt-2 py-3 text-lg rounded-xl transition-all"
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl font-bold text-white">
                            Hello, {user?.username || "Guest"}! 👋
                        </h2>
                        <img
                            src={user?.imageUrl || "https://via.placeholder.com/100"}
                            alt="Profile"
                            className="w-28 h-28 rounded-full mx-auto mt-6 shadow-lg border-4 border-white"
                        />
                        <Button
                            variant="contained"
                            onClick={() => setIsEditing(true)}
                            className="bg-green-500 text-white w-full mt-6 py-3 text-lg rounded-xl hover:bg-green-600 transition-all"
                        >
                            Edit Profile
                        </Button>
                        <Button
                            variant="contained"
                            className="bg-red-500 text-white w-full mt-8 py-3 text-lg rounded-xl hover:bg-red-600 transition-all" // Increased margin-top to mt-8
                            onClick={logout}
                        >
                            Sign Out
                        </Button>
                    </>
                )}
            </motion.div>

            <div className="mt-12 w-full max-w-4xl">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Your Posts
                </h3>

                {posts.length === 0 ? (
                    <p className="text-gray-400 text-center">No posts yet.</p>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {posts.map((post) => (
                            <div key={post._id} onClick={() => navigate(`/post/${post._id}`)}>
                                <motion.div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={post.imageSrc}
                                        alt={post.title}
                                        className="w-full h-40 object-cover rounded-md mb-3"
                                    />
                                    <h4 className="text-lg font-semibold text-white">
                                        {post.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm mt-1">{post.subtitle}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}