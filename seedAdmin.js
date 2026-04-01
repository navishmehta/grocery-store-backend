require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // Path to your User model

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const adminExists = await User.findOne({ email: "admin@grocery.com" });
        if (adminExists) {
            console.log("Admin already exists!");
            process.exit();
        }

        const admin = new User({
            email: "admin@grocery.com",
            password: "12345"
        });

        await admin.save();
        console.log("Admin user created successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();