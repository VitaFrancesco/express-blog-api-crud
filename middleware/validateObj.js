// ************validazione ***********
function validateObj (req, res, next) {
	const { title, slug, content, image, tags } = req.body;
	const errors = [];

	if (!title) {
		errors.push('Title is required');
	};
    if (!slug) {
        errors.push('Slug is required');
    };
    if (!content) {
        errors.push('Content is required');
    };
	if (!image) {
		errors.push('Image is required');
	};
	if (!tags) {
		errors.push('Tags is required');
	};

    if (errors.length) {
		res.status(400);
		return res.json({
			error: 'Invalid request',
			messages: errors,
		});
	};

    next();
};

module.exports = validateObj;