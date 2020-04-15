const { check, validationResult } = require('express-validator');

const userSignupValidationRules = () => {
    return [
        check('name', 'Name is required').notEmpty(),
        check("email", "Email must be between 3 to 32 characters")
            .matches(/.+\@.+\..+/)
            .withMessage("Email must contain @")
            .isLength({
                min: 4,
                max: 32
            }),
        check("password", "Password is required").notEmpty(),
        check("password")
            .isLength({ min: 6 })
            .withMessage("Password must contain at least 6 characters")
            .matches(/\d/)
            .withMessage("Password must contain a number"),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userSignupValidationRules,
    validate
}
