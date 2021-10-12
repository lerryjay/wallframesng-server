const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    amount: Number,
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        vendor_id: {
          type: ObjectId,
          ref: "User",
        },
        color: String,
      },
    ],
    payment: {
      reference: String,
      amount: Number,
      currency: {
        type: String,
        default: "NGN"
      },
      method: {
        type: String,
        default: "Cash",
        enum: ["Cash", "Interswitch"]
      },
      createdAt: String,
      updatedAt: String,
      status: {
        type: String,
        enum: [
          "Pending",
          "Paid",
        ],
      }
    },

    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
