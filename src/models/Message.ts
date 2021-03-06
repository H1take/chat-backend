import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

export interface IMessage extends Document {
    text: {
        type: string,
        require: boolean
    };
    dialog: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: true
    };
    user: {
        type: string,
        ref: string,
        require: true
    }
    unread: {
        type: boolean,
        default: boolean
    }
}

    // TODO create attachments
    // attachments: {}

const MessageSchema = new Schema({
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialog", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true},
    unread: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
