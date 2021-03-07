const { articleModel } = require('./model');

module.exports = {
    async getArticles() {
        console.log('---------------->');
        const result = await articleModel.find();
        return result;
    },

    async createArticle(body) {
        const model = new articleModel(body)
        const result = await model.save();
        return result;
    },

    async updateArticle(query, condition) {
        const result = await articleModel.findOneAndUpdate(query, condition, { new: true });
        return result;
    }
}