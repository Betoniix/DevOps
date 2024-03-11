import { app } from "./app";

const PORT = 80;

app.listen(PORT, () => {
  console.info("Server running on PORT: ", PORT);
});
