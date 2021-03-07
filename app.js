// const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { connect } = require("mongoose");
const { getArticles, createArticle, updateArticle } = require('./service/service');
import { CommentService } from './server/comment/service';
const { getList, getListForComments, getListForPage, create } = new CommentService();
import { ApolloServer, gql } from 'apollo-server-express';
connect('mongodb://localhost/process', { useNewUrlParser: true, useUnifiedTopology: true });
// 定义模型
const schema = buildSchema(`
    type Article {
        title: String
        type: String
        category: String
        subtitle: String
        content: String
        sourceUrl: String
        content_html: String
        is_deleted: String
        refers: [String]
        createdAt: Int
        createdBy: String
        publised: Int
        hasReads: Int
        favoriteNums: Int
    }
    type Query aritcle{
        getArticles: [Article]
    }
    input ArticleInput {
        title: String
        type: String
        category: String
        subtitle: String
        content: String
        sourceUrl: String
        content_html: String
        is_deleted: String
        refers: [String]
        createdAt: Int
        createdBy: String
        publised: Int
        hasReads: Int
        favoriteNums: Int
    }
    type Mutation {
        createArticle(input: ArticleInput): Article
    }   
`);
const server = new ApolloServer();
// 定义查询的处理器
const root = {
    getArticles,
    createArticle,
    updateArticle,
    // commentService
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);