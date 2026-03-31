const { body, validationResult } = require("express-validator");

exports.validateProduct = [
    body("nameEn").notEmpty().withMessage("English name is required"),
    body("namePa").notEmpty().withMessage("Punjabi name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("qtyValue").isNumeric().withMessage("Quantity value is required"),
    body("qtyUnit").isIn(['kg', 'g', 'ml', 'l', 'pcs', 'packet']).withMessage("Invalid unit"),
    body("category").notEmpty().withMessage("Category is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];