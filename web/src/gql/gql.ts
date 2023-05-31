/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query TopTracks($limit: Int!, $offset: Int!, $time_range: TimeRange!) {\n    topTracks(limit: $limit, offset: $offset, time_range: $time_range) {\n      items {\n        id\n        name\n        uri\n        duration_ms\n        album {\n          id\n          name\n          images {\n            url\n            height\n            width\n          }\n        }\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.TopTracksDocument,
    "\n  query User($id: Int!) {\n    user(id: $id) {\n      id\n      name\n      createdAt\n      updatedAt\n      image\n      email\n    }\n  }\n": types.UserDocument,
    "\n  query Me {\n    me {\n      display_name\n      email\n      followers {\n        total\n      }\n      href\n      id\n      images {\n        url\n      }\n      product\n      type\n      uri\n    }\n  }\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TopTracks($limit: Int!, $offset: Int!, $time_range: TimeRange!) {\n    topTracks(limit: $limit, offset: $offset, time_range: $time_range) {\n      items {\n        id\n        name\n        uri\n        duration_ms\n        album {\n          id\n          name\n          images {\n            url\n            height\n            width\n          }\n        }\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query TopTracks($limit: Int!, $offset: Int!, $time_range: TimeRange!) {\n    topTracks(limit: $limit, offset: $offset, time_range: $time_range) {\n      items {\n        id\n        name\n        uri\n        duration_ms\n        album {\n          id\n          name\n          images {\n            url\n            height\n            width\n          }\n        }\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User($id: Int!) {\n    user(id: $id) {\n      id\n      name\n      createdAt\n      updatedAt\n      image\n      email\n    }\n  }\n"): (typeof documents)["\n  query User($id: Int!) {\n    user(id: $id) {\n      id\n      name\n      createdAt\n      updatedAt\n      image\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      display_name\n      email\n      followers {\n        total\n      }\n      href\n      id\n      images {\n        url\n      }\n      product\n      type\n      uri\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      display_name\n      email\n      followers {\n        total\n      }\n      href\n      id\n      images {\n        url\n      }\n      product\n      type\n      uri\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;