import { createConnection } from "typeorm";
import app from "./app";

createConnection().catch(err => {
  console.log(`Error connecting to database ${err}`);
  process.exit();
}).then(() => {
  const port = 8080;
  
  app.listen(port, () => {
    console.log(`Server listening on: ${port}`);
  });
});