export class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create (body) {
        const model = new this.model(body);
        return await model.save();
    }

    async update (query, condition) {
        return await this.model.findOneAndUpdate(query, condition);
    }

    async getList (query) {
        return await this.model.findOneAndUpdate(query);
        // const model = this.model.find(query);
    }

    async getListForPage () {
        
    }
}