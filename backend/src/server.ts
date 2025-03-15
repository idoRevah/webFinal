import app from "./app";
import connectDB from "./config/db";

// Connect to Database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
