import cors from "cors";
import express from "express";
import supabase from "./supabase.js";

const app = express();

const tableName = "words2";

app.use(cors());
app.use(express.json());

//app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// GET /api/items
app.get("/api/items", async (req, res, next) => {
  try {
    let query = supabase.from(tableName).select("*");

    const { data, error } = await query;

    if (error) {
      return next(error);
    }

    res.json(data);
  } catch (err) {
    console.log("ERROR:", JSON.stringify(err, null, 2));
    next(err);
  }
});

// POST /api/items
app.post("/api/items", async (req, res, next) => {
  try {
    const { word, meaning } = req.body;
    const { data, error } = await supabase
      .from(tableName)
      .insert([{ word, meaning }])
      .select();
    if (error) {
      return next(error);
    }
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/items/:id
app.delete("/api/items/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", id);
    if (error) {
      return next(error);
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default app;
