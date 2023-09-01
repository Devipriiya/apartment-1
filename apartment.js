import express from "express";

import bills from "./bills.js";
import services from "./services.js";
import connectDB from "./db.js";
import apartment from "./a105.js";
import gate from "./gate.js";
import quick from "./quick.js";
import facility from "./facilities.js";

import security from "./security.js";
import billdetails from "./billdetails.js";
import activities from "./activities.js";
connectDB();

const app = express();
app.use(express.json());
app.use('/bills', bills);
app.use('/services', services);
app.use('/apartment',apartment);
app.use('/gate',gate);
app.use('/quick',quick);
app.use('/facility',facility);

app.use('/security',security);
app.use('/billdetails',billdetails);
app.use('/activities',activities);

const port = 5000;
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
