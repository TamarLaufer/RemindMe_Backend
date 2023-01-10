const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

dotenv.config();

const port = process.env.PORT || 3000;
mongoose.set("strictQuery", true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const registerRoute = require("./Routes/register");
// const loginRoute = require("./Routes/login");
const childRoute = require("./Routes/childRoute");
const groupRoute = require("./Routes/groupRoute");
const Group = require("./models/group");
const Child = require("./models/child");

app.use("/group", groupRoute);
app.use("/child", childRoute);
// app.use("/register", registerRoute);
// app.use("/login", loginRoute);

console.log(process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("DB connected");
    app.listen(port, function () {
      console.log(`App is listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Group.insertMany([
//   { groupName: "תינוקות", assistantName: "חנה", childrenList: [] },
//   { groupName: "בוגרים", assistantName: "לאה", childrenList: [] },
//   { groupName: "פעוטות", assistantName: "שרה", childrenList: [] },
// ])
//   .then(function () {
//     console.log("Data inserted"); // Success
//   })
//   .catch(function (error) {
//     console.log(error); // Failure
//   });

// Child.insertMany([
//   {
//     firstName: "טל",
//     lastName: "רמון",
//     address: "הזיתים 5",
//     parentPhone: "0526548759",
//     parent2Phone: "0626958475",
//     isArrived: "true",
//   },
//   {
//     firstName: "לינוי",
//     lastName: "אשרם",
//     address: "יהלום 10",
//     parentPhone: "0528989898",
//     parent2Phone: "0523636363",
//     isArrived: "true",
//   },
//   {
//     firstName: "רחלי",
//     lastName: "אברהם",
//     address: "רמב'ם 11",
//     parentPhone: "0527778889",
//     parent2Phone: "",
//     isArrived: "false",
//   },
//   {
//     firstName: "רוני",
//     lastName: "בירן",
//     address: "הרא'ה 14",
//     parentPhone: "0526789878",
//     parent2Phone: "",
//     isArrived: "true",
//   },
//   {
//     firstName: "מאיה",
//     lastName: "לאופר",
//     address: "ביאליק 5",
//     parentPhone: "05265552452",
//     parent2Phone: "",
//     isArrived: "false",
//   },
//   {
//     firstName: "עידן",
//     lastName: "יהלום",
//     address: "הרצל 105",
//     parentPhone: "0524545454",
//     parent2Phone: "",
//     isArrived: "true",
//   },
//   {
//     firstName: "ליה",
//     lastName: "לוי",
//     address: "בן גוריון 65",
//     parentPhone: "0542323225",
//     parent2Phone: "0505212325",
//     isArrived: "false",
//   },
//   {
//     firstName: "נתנאל",
//     lastName: "מלול",
//     address: "מוסטבוי 48",
//     parentPhone: "0549856521",
//     parent2Phone: "",
//     isArrived: "true",
//   },
//   {
//     firstName: "ליבי",
//     lastName: "אברמוביץ'",
//     address: "ביאליק 29",
//     parentPhone: "0528745454",
//     parent2Phone: "0547777777",
//     isArrived: "true",
//   },
// ])
//   .then(function () {
//     console.log("Data inserted"); // Success
//   })
//   .catch(function (error) {
//     console.log(error); // Failure
//   });
