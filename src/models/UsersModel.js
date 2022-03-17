import mongoose from "mongoose";
import { createHmac } from "crypto";

const userSchema = new mongoose.Schema(
   {
      email: { type: String, trim: true, required: true, unique: true },
      password: { type: String, required: true },
      fullname: { type: String, trim: true, required: true, maxlength: 100 },
      firstName: { type: String },
      lastName: { type: String },
      phoneNumber: { type: String, trim: true, maxlength: 20 },
      address: { type: String },
      role: { type: Number, default: 0 }
   },
   { timestamps: true }
);

userSchema.methods = {
   getFirstName(fullname) {
      const nameArr = fullname.split(" ");
      return nameArr[nameArr.length - 1];
   },
   getLastName(fullname) {
      const nameArr = fullname.split(" ");
      nameArr.pop();
      return nameArr.join(" ");
   },
};

userSchema.pre("save", async function save(next) {
   try {

      this.password = this.encrytPassword(this.password);
      this.firstName = this.getFirstName(this.fullname);
      this.lastName = this.getLastName(this.fullname);
      this.address = this.setAddress(this.password);
      return next();
   } catch (err) {
      return next(err);
   }
});

export default mongoose.model("User", userSchema);