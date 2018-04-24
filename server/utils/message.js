var generateMessage = (body, authorUsername, createdAt, id) => {
    return {
        body, authorUsername, createdAt, id
    }
};

module.exports = { generateMessage };
