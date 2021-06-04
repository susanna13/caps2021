import { SchemaComposer } from 'graphql-compose';

const schemaComposer = new SchemaComposer();

import { FruitQuery, FruitMutation } from './fruits/FruitGraphQLController.js';
import { CarQuery, CarMutation } from './cars/CarsGraphQLController.js';
import { graphqlHTTP } from 'express-graphql';

schemaComposer.Query.addFields({
    ...FruitQuery,
    ...CarQuery,
});

schemaComposer.Mutation.addFields({
    ...FruitMutation,
    ...CarMutation,
});

export default (app) => {
    const schema = schemaComposer.buildSchema();

    app.use(
        "/graphql",
        graphqlHTTP({
            schema,
            graphql: true,
        })
    );
};