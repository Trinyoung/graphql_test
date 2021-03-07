export class BaseMutationService {
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
}


export class BaseQueryService {
    constructor (model) {
        this.model = model;
    }

    async getList (query) {
        return await this.model.findOneAndUpdate(query);
    }

    async getListForPage () {
        
    }
}