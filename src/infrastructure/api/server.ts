import { app } from "./express";
import { configDotenv } from "dotenv";

configDotenv();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
