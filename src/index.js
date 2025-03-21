const app = require("./src/app");
const dotenv = require("dotenv");
dotenv.config();
require("../dbConnect");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
