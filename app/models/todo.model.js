const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    level: { type: String },
    status: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

dataSchema.pre("save", function (next) {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("Todo", dataSchema);
