import mongoose from "mongoose";
mongoose.set("debug", false);
import notesSchema from "../schema/notes";

const notesModel = mongoose.model("notes", notesSchema);
export default notesModel;
