import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

export interface IDialog extends Document {
    author: {
        type: Schema.Types.ObjectId,
        ref: String,
        require: true
    };
    partner: {
        type: Schema.Types.ObjectId,
        ref: String,
        require: true
    };
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: String
    };
}

const DialogSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" }
}, {
    timestamps: true
});

const DialogModel = mongoose.model<IDialog>("Dialog", DialogSchema);

export default DialogModel;
