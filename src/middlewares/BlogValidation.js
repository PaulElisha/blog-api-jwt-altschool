import joi from 'joi';

class BlogValidation {
    validateBlog = (req, res, next) => {
        try {
            const schema = joi.object({
                title: joi.string().required(),
                slug: joi.string().required(),
                description: joi.string().required(),
                state: joi.string().valid("published", "archived", "draft", "deleted").required(),
                readCount: joi.string().optional(),
                commentCount: joi.string().optional(),
                tags: joi.string().required(),
                body: joi.string().required()
            });
            const { error, } = schema.validate(req.body);
            if (!error) {
                next();
            } else {
                res.status(400).json({
                    status: "error",
                    error: error.details[0].message
                });
            }
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            });
        }

    }
}

export { BlogValidation }