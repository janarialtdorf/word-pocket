import app from "./app.js";
import supabase from "./supabase.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server töötab pordil http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    error: err.message,
  });
});
