import mongoose, { Schema, Document } from "mongoose";
import { generatePasswordHash } from "../utils";
import validator from "validator";

export interface IUser extends Document {
    email: string;
    fullname: string;
    password: string;
    confirmed: boolean;
    avatar?: string;
    confirm_hash?: string;
    last_seen?: Date;
    data?: IUser;
}

const UserSchema = new Schema({
    email: {
        type: String,
        require: "E-mail address is required",
        validate: [validator.isEmail, "Invalid E-mail"],
        unique: true
    },
    fullname: {
        type: String,
        required: "Fullname is required"
    },
    password: {
        type: String,
        required: "Password is required"
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    avatar: String,
    confirm_hash: Boolean,
    last_seen: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
});

UserSchema.pre<IUser>("save", async function (next: any) {
    
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    user.password = await generatePasswordHash(user.password);
    user.confirm_hash = await generatePasswordHash(new Date().toString());
})

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
