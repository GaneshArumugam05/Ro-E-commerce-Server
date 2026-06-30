const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true, trim: true },
    modelName: { type: String, required: true, trim: true },
    genericName: { type: String, default: "Water Purifier" },
    description: { type: String, required: true },

    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: "INR" },
    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },

    capacityLitres: { type: Number, required: true, min: 1 },
    purificationTechnology: { type: String, required: true },
    stages: { type: Number, default: 7 },
    tdsLimit: { type: Number, default: 1500 },
    filtrationCapacityLph: { type: Number, default: 0 },
    mountType: { type: String, enum: ["wall", "table-top"], required: true },
    storageType: { type: String, default: "" },
    tankMaterial: { type: String, default: "" },
    powerConsumption: { type: Number, default: 0 },
    features: [{ type: String }],

    // dimensions: { type: dimensionsSchema, default: () => ({}) },
    weightKg: { type: Number, default: 0 },

    warrantyYears: { type: Number, default: 1 },
    warrantySummary: { type: String, default: "" },
    serviceType: { type: String, default: "On-site service" },
    countryOfOrigin: { type: String, default: "India" },

    images: [{ type: String }],
    thumbnail: { type: String, default: "" },

    ratingsAverage: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Products", productsSchema);
