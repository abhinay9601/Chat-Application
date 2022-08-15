import mongoose from "mongoose";
mongoose.set("debug", false);
import departmentsSchema from "../schema/departments";

const departmentsModel = mongoose.model("departments", departmentsSchema);
export default departmentsModel;
