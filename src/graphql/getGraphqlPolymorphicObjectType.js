const { GraphQLUnionType } = require('graphql');
const { rdfsResource } = require('../constants');
const getGraphqlObjectType = require('./getGraphqlObjectType');
const getGraphqlName = require('./getGraphqlName');
const getGraphqlDescription = require('./getGraphqlDescription');

function getGraphqlPolymorphicObjectType(g, ranges) {
  const types = ranges.map(iri => getGraphqlObjectType(g, iri));
  const names = ranges.map(iri => getGraphqlName(g, iri));

  const name = `${names.join('')}Union`;
  const description = `Union type for: ${ranges.join(', ')}`;

  return new GraphQLUnionType({
    name,
    types,
    resolveType: () => types[0],
    description
  });
}

module.exports = getGraphqlPolymorphicObjectType;
