import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  Object: Object;
  Void: void;
};

export type Album = {
  __typename?: 'Album';
  album_group?: Maybe<Scalars['String']>;
  album_type?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  available_markets?: Maybe<Array<Maybe<Scalars['String']>>>;
  copyrights?: Maybe<Copyright>;
  external_ids?: Maybe<ExternalId>;
  external_urls?: Maybe<ExternalUrl>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
  href?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  release_date?: Maybe<Scalars['String']>;
  release_date_precision?: Maybe<Scalars['String']>;
  total_tracks?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type Artist = {
  __typename?: 'Artist';
  external_urls?: Maybe<ExternalUrl>;
  followers?: Maybe<Follower>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
  href?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  name?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type Copyright = {
  __typename?: 'Copyright';
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ExplicitContent = {
  __typename?: 'ExplicitContent';
  filter_enabled?: Maybe<Scalars['Boolean']>;
  filter_locked?: Maybe<Scalars['Boolean']>;
};

export type ExternalId = {
  __typename?: 'ExternalId';
  ean?: Maybe<Scalars['String']>;
  isrc?: Maybe<Scalars['String']>;
  upc?: Maybe<Scalars['String']>;
};

export type ExternalUrl = {
  __typename?: 'ExternalUrl';
  spotify?: Maybe<Scalars['String']>;
};

export type Follower = {
  __typename?: 'Follower';
  href?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Image = {
  __typename?: 'Image';
  height?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<SpotifyUser>;
  topTracks?: Maybe<TopTracksResponse>;
  user?: Maybe<User>;
};


export type QueryTopTracksArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  time_range: TimeRange;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Restriction = {
  __typename?: 'Restriction';
  reason?: Maybe<Scalars['String']>;
};

export type SpotifyUser = {
  __typename?: 'SpotifyUser';
  country?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  explicit_content?: Maybe<ExplicitContent>;
  followers?: Maybe<Follower>;
  href?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  product?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export enum TimeRange {
  LongTerm = 'long_term',
  MediumTerm = 'medium_term',
  ShortTerm = 'short_term'
}

export type TopTracksResponse = {
  __typename?: 'TopTracksResponse';
  href?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<Track>>>;
  limit?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  previous?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Track = {
  __typename?: 'Track';
  album?: Maybe<TrackAlbum>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  available_markets?: Maybe<Array<Maybe<Scalars['String']>>>;
  disc_number?: Maybe<Scalars['Int']>;
  duration_ms?: Maybe<Scalars['Int']>;
  explicit?: Maybe<Scalars['Boolean']>;
  external_ids?: Maybe<ExternalId>;
  external_urls?: Maybe<ExternalUrl>;
  href?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  is_local?: Maybe<Scalars['Boolean']>;
  is_playable?: Maybe<Scalars['Boolean']>;
  linked_from?: Maybe<Scalars['Object']>;
  name?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  preview_url?: Maybe<Scalars['String']>;
  restrictions?: Maybe<Restriction>;
  track_number?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type TrackAlbum = {
  __typename?: 'TrackAlbum';
  album_group?: Maybe<Scalars['String']>;
  album_type?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Maybe<TrackAlbumArtist>>>;
  available_markets?: Maybe<Array<Maybe<Scalars['String']>>>;
  copyrights?: Maybe<Copyright>;
  external_ids?: Maybe<ExternalId>;
  external_urls?: Maybe<ExternalUrl>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
  href?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  release_date?: Maybe<Scalars['String']>;
  release_date_precision?: Maybe<Scalars['String']>;
  restrictions?: Maybe<Restriction>;
  total_tracks?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type TrackAlbumArtist = {
  __typename?: 'TrackAlbumArtist';
  external_urls?: Maybe<ExternalUrl>;
  href?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Album: ResolverTypeWrapper<Album>;
  Artist: ResolverTypeWrapper<Artist>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Copyright: ResolverTypeWrapper<Copyright>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ExplicitContent: ResolverTypeWrapper<ExplicitContent>;
  ExternalId: ResolverTypeWrapper<ExternalId>;
  ExternalUrl: ResolverTypeWrapper<ExternalUrl>;
  Follower: ResolverTypeWrapper<Follower>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Object: ResolverTypeWrapper<Scalars['Object']>;
  Query: ResolverTypeWrapper<{}>;
  Restriction: ResolverTypeWrapper<Restriction>;
  SpotifyUser: ResolverTypeWrapper<SpotifyUser>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TimeRange: TimeRange;
  TopTracksResponse: ResolverTypeWrapper<TopTracksResponse>;
  Track: ResolverTypeWrapper<Track>;
  TrackAlbum: ResolverTypeWrapper<TrackAlbum>;
  TrackAlbumArtist: ResolverTypeWrapper<TrackAlbumArtist>;
  User: ResolverTypeWrapper<User>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Album: Album;
  Artist: Artist;
  Boolean: Scalars['Boolean'];
  Copyright: Copyright;
  Date: Scalars['Date'];
  ExplicitContent: ExplicitContent;
  ExternalId: ExternalId;
  ExternalUrl: ExternalUrl;
  Follower: Follower;
  Image: Image;
  Int: Scalars['Int'];
  Mutation: {};
  Object: Scalars['Object'];
  Query: {};
  Restriction: Restriction;
  SpotifyUser: SpotifyUser;
  String: Scalars['String'];
  TopTracksResponse: TopTracksResponse;
  Track: Track;
  TrackAlbum: TrackAlbum;
  TrackAlbumArtist: TrackAlbumArtist;
  User: User;
  Void: Scalars['Void'];
}>;

export type AlbumResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']> = ResolversObject<{
  album_group?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  album_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artists?: Resolver<Maybe<Array<Maybe<ResolversTypes['Artist']>>>, ParentType, ContextType>;
  available_markets?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  copyrights?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>;
  external_ids?: Resolver<Maybe<ResolversTypes['ExternalId']>, ParentType, ContextType>;
  external_urls?: Resolver<Maybe<ResolversTypes['ExternalUrl']>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date_precision?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total_tracks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtistResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = ResolversObject<{
  external_urls?: Resolver<Maybe<ResolversTypes['ExternalUrl']>, ParentType, ContextType>;
  followers?: Resolver<Maybe<ResolversTypes['Follower']>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CopyrightResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Copyright'] = ResolversParentTypes['Copyright']> = ResolversObject<{
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ExplicitContentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ExplicitContent'] = ResolversParentTypes['ExplicitContent']> = ResolversObject<{
  filter_enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  filter_locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExternalIdResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ExternalId'] = ResolversParentTypes['ExternalId']> = ResolversObject<{
  ean?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isrc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  upc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExternalUrlResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ExternalUrl'] = ResolversParentTypes['ExternalUrl']> = ResolversObject<{
  spotify?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowerResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Follower'] = ResolversParentTypes['Follower']> = ResolversObject<{
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'image' | 'name'>>;
}>;

export interface ObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Object'], any> {
  name: 'Object';
}

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<Maybe<ResolversTypes['SpotifyUser']>, ParentType, ContextType>;
  topTracks?: Resolver<Maybe<ResolversTypes['TopTracksResponse']>, ParentType, ContextType, RequireFields<QueryTopTracksArgs, 'limit' | 'offset' | 'time_range'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type RestrictionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Restriction'] = ResolversParentTypes['Restriction']> = ResolversObject<{
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyUserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SpotifyUser'] = ResolversParentTypes['SpotifyUser']> = ResolversObject<{
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  explicit_content?: Resolver<Maybe<ResolversTypes['ExplicitContent']>, ParentType, ContextType>;
  followers?: Resolver<Maybe<ResolversTypes['Follower']>, ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopTracksResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TopTracksResponse'] = ResolversParentTypes['TopTracksResponse']> = ResolversObject<{
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Track']>>>, ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  offset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  previous?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Track'] = ResolversParentTypes['Track']> = ResolversObject<{
  album?: Resolver<Maybe<ResolversTypes['TrackAlbum']>, ParentType, ContextType>;
  artists?: Resolver<Maybe<Array<Maybe<ResolversTypes['Artist']>>>, ParentType, ContextType>;
  available_markets?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  disc_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  duration_ms?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  explicit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  external_ids?: Resolver<Maybe<ResolversTypes['ExternalId']>, ParentType, ContextType>;
  external_urls?: Resolver<Maybe<ResolversTypes['ExternalUrl']>, ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  is_local?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  is_playable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  linked_from?: Resolver<Maybe<ResolversTypes['Object']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  preview_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  restrictions?: Resolver<Maybe<ResolversTypes['Restriction']>, ParentType, ContextType>;
  track_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackAlbumResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TrackAlbum'] = ResolversParentTypes['TrackAlbum']> = ResolversObject<{
  album_group?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  album_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artists?: Resolver<Maybe<Array<Maybe<ResolversTypes['TrackAlbumArtist']>>>, ParentType, ContextType>;
  available_markets?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  copyrights?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>;
  external_ids?: Resolver<Maybe<ResolversTypes['ExternalId']>, ParentType, ContextType>;
  external_urls?: Resolver<Maybe<ResolversTypes['ExternalUrl']>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date_precision?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  restrictions?: Resolver<Maybe<ResolversTypes['Restriction']>, ParentType, ContextType>;
  total_tracks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackAlbumArtistResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TrackAlbumArtist'] = ResolversParentTypes['TrackAlbumArtist']> = ResolversObject<{
  external_urls?: Resolver<Maybe<ResolversTypes['ExternalUrl']>, ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Album?: AlbumResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  Copyright?: CopyrightResolvers<ContextType>;
  Date?: GraphQLScalarType;
  ExplicitContent?: ExplicitContentResolvers<ContextType>;
  ExternalId?: ExternalIdResolvers<ContextType>;
  ExternalUrl?: ExternalUrlResolvers<ContextType>;
  Follower?: FollowerResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Object?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Restriction?: RestrictionResolvers<ContextType>;
  SpotifyUser?: SpotifyUserResolvers<ContextType>;
  TopTracksResponse?: TopTracksResponseResolvers<ContextType>;
  Track?: TrackResolvers<ContextType>;
  TrackAlbum?: TrackAlbumResolvers<ContextType>;
  TrackAlbumArtist?: TrackAlbumArtistResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Void?: GraphQLScalarType;
}>;

