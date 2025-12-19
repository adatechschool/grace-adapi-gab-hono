import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API adapi en marche ! 🚀" });
});

app.listen(3000, () => {
  console.log("🚀 Server on http://localhost:3000");
});

import resourcesRoutes from "./routes/resources.routes.js";
import skillsRoutes from "./routes/skills.routes.js";
import themesRoutes from "./routes/themes.routes.js";


app.use("/resources", resourcesRoutes);
app.use("/skills", skillsRoutes);
app.use("/themes", themesRoutes);