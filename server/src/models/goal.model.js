import mongoose, { Schema } from "mongoose";

const modelSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    savedAlready: {
      type: Number,
      default: 0,
    },
    goalDeadline: {
      type: String,
      validate: {
        validator: function (date) {
          return new Date(date) > new Date();
        },
        message: "Goal deadline date cannot be in the past.",
      },
    },
    goalColor: {
      type: String,
      validate: {
        validator: function (color) {
          return /^#([0-9A-F]{3}){1,2}$/i.test(color);
        },
        message: (props) => `${props.value} is not a valid color`,
      },
    },
    note: {
      type: String,
    },
    goalReached: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.pre("save", function (next) {
  if (!this.isModified("savedAlready")) return next();

  if (this.savedAlready >= this.targetAmount) {
    this.goalReached = true;
  } else {
    this.goalReached = false;
  }
  next();
});

export const Goal = mongoose.model("Goal", modelSchema);
