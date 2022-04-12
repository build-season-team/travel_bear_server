const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "A user must have a first name"],
      maxlength: [40, "Name must be less than 40 characters"],
      minlength: [3, "Name must be more than 3 characters"],
    },
    lastName: {
      type: String,
      required: [true, "A user must have a last name"],
      maxlength: [40, "Name must be less than 40 characters"],
      minlength: [3, "Name must be more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "A user must have anemail"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Enter a valid email"],
    },phone: {
        type: String,
        required : [true, 'A user must have phone number'],
        maxlength: [14, 'Enter a valid phone number'],
        minlength: [7, 'Enter a valid number'],
        validate: {
            validator: function (el) {
                const values = ['+', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
                const elements = el.split('');
                elements.forEach(element => {
                    if (!values.includes(element)) return false;
                });
            },
            message: 'Enter a valid phone number'
        }
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "landlord", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was modified
  if (!this.isModified("password")) return next();
  //Hash password
  this.password = await bcrypt.hash(this.password, 12);
  // delete passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(this.passwordChangedAt, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  // False means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log({resetToken}, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
