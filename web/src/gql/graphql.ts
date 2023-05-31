/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Object: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type Album = {
  __typename?: 'Album';
  album_group?: Maybe<Scalars['String']['output']>;
  album_type?: Maybe<Scalars['String']['output']>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  available_markets?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  copyrights?: Maybe<Copyright>;
  external_ids?: Maybe<ExternalId>;
  external_urls?: Maybe<ExternalUrl>;
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  href?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<Maybe<Image>>>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Int']['output']>;
  release_date?: Maybe<Scalars['String']['output']>;
  release_date_precision?: Maybe<Scalars['String']['output']>;
  total_tracks?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type Artist = {
  __typename?: 'Artist';
  external_urls?: Maybe<ExternalUrl>;
  followers?: Maybe<Follower>;
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  href?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<Maybe<Image>>>;
  name?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type Copyright = {
  __typename?: 'Copyright';
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ExplicitContent = {
  __typename?: 'ExplicitContent';
  filter_enabled?: Maybe<Scalars['Boolean']['output']>;
  filter_locked?: Maybe<Scalars['Boolean']['output']>;
};

export type ExternalId = {
  __typename?: 'ExternalId';
  ean?: Maybe<Scalars['String']['output']>;
  isrc?: Maybe<Scalars['String']['output']>;
  upc?: Maybe<Scalars['String']['output']>;
};

export type ExternalUrl = {
  __typename?: 'ExternalUrl';
  spotify?: Maybe<Scalars['String']['output']>;
};

export type Follower = {
  __typename?: 'Follower';
  href?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Image = {
  __typename?: 'Image';
  height?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<SpotifyUser>;
  topTracks?: Maybe<TopTracksResponse>;
  user?: Maybe<User>;
};


export type QueryTopTracksArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  time_range: TimeRange;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Restriction = {
  __typename?: 'Restriction';
  reason?: Maybe<Scalars['String']['output']>;
};

export type SpotifyUser = {
  __typename?: 'SpotifyUser';
  country?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  explicit_content?: Maybe<ExplicitContent>;
  followers?: Maybe<Follower>;
  href?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<Maybe<Image>>>;
  product?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export enum TimeRange {
  LongTerm = 'long_term',
  MediumTerm = 'medium_term',
  ShortTerm = 'short_term'
}

export type TopTracksResponse = {
  __typename?: 'TopTracksResponse';
  href?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Maybe<Track>>>;
  limit?: Maybe<Scalars['Int']['output']>;
  next?: Maybe<Scalars['String']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  previous?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Track = {
  __typename?: 'Track';
  album?: Maybe<TrackAlbum>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  available_markets?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  disc_number?: Maybe<Scalars['Int']['output']>;
  duration_ms?: Maybe<Scalars['Int']['output']>;
  explicit?: Maybe<Scalars['Boolean']['output']>;
  external_ids?: Maybe<ExternalId>;
  external_urls?: Maybe<ExternalUrl>;
  href?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  is_local?: Maybe<Scalars['Boolean']['output']>;
  is_playable?: Maybe<Scalars['Boolean']['output']>;
  linked_from?: Maybe<Scalars['Object']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Int']['output']>;
  preview_url?: Maybe<Scalars['String']['output']>;
  restrictions?: Maybe<Restriction>;
  track_number?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type TrackAlbum = {
  __typename?: 'TrackAlbum';
  album_group?: Maybe<Scalars['String']['output']>;
  album_type?: Maybe<Scalars['String']['output']>;
  artists?: Maybe<Array<Maybe<TrackAlbumArtist>>>;
  available_markets?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  copyrights?: Maybe<Copyright>;
  external_ids?: Maybe<ExternalId>;
  external_urls?: Maybe<ExternalUrl>;
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  href?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<Maybe<Image>>>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Int']['output']>;
  release_date?: Maybe<Scalars['String']['output']>;
  release_date_precision?: Maybe<Scalars['String']['output']>;
  restrictions?: Maybe<Restriction>;
  total_tracks?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type TrackAlbumArtist = {
  __typename?: 'TrackAlbumArtist';
  external_urls?: Maybe<ExternalUrl>;
  href?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type TopTracksQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  time_range: TimeRange;
}>;


export type TopTracksQuery = { __typename?: 'Query', topTracks?: { __typename?: 'TopTracksResponse', items?: Array<{ __typename?: 'Track', id?: string | null, name?: string | null, uri?: string | null, duration_ms?: number | null, album?: { __typename?: 'TrackAlbum', id?: string | null, name?: string | null, images?: Array<{ __typename?: 'Image', url?: string | null, height?: number | null, width?: number | null } | null> | null } | null, artists?: Array<{ __typename?: 'Artist', id?: string | null, name?: string | null } | null> | null } | null> | null } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: number | null, name?: string | null, createdAt?: any | null, updatedAt?: any | null, image?: string | null, email?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'SpotifyUser', display_name?: string | null, email?: string | null, href?: string | null, id?: string | null, product?: string | null, type?: string | null, uri?: string | null, followers?: { __typename?: 'Follower', total?: number | null } | null, images?: Array<{ __typename?: 'Image', url?: string | null } | null> | null } | null };


export const TopTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"time_range"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TimeRange"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topTracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"time_range"},"value":{"kind":"Variable","name":{"kind":"Name","value":"time_range"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"duration_ms"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TopTracksQuery, TopTracksQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;