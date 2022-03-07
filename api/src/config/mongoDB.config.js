import config from "./default.config";
import mongoose from "mongoose";
const { IP_ROUTE, DB_NAME } = config;
const connectionString = `mongodb://${IP_ROUTE}/${DB_NAME}`;
const connect = mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`Established a connection to the ${DB_NAME} database`)
  )
  .catch((err) =>
    console.log(
      `Something went wrong when connecting to the ${DB_NAME} database`,
      err
    )
  );
export default connect;
