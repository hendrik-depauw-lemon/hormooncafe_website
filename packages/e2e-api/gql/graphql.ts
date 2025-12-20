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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: Date; output: Date; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type AddExampleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type AfterCursor = {
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeExampleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type DatePropertyFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  ne?: InputMaybe<Scalars['Date']['input']>;
};

export enum EntityType {
  BoosterDataMigrationEntity = 'BoosterDataMigrationEntity',
  Example = 'Example'
}

export type EventQueryResponse = {
  __typename?: 'EventQueryResponse';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  entity: Scalars['String']['output'];
  entityID: Scalars['ID']['output'];
  requestID: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  user?: Maybe<User>;
  value: Scalars['JSON']['output'];
};

export enum EventType {
  BoosterDataMigrationFinished = 'BoosterDataMigrationFinished',
  BoosterDataMigrationStarted = 'BoosterDataMigrationStarted',
  ExampleAdded = 'ExampleAdded',
  ExampleChanged = 'ExampleChanged'
}

export type Example1ReadModel = {
  __typename?: 'Example1ReadModel';
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nested: NestedExample;
  nestedList: Array<NestedExample>;
  test: Array<UnionExample>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Example1ReadModelConnection = {
  __typename?: 'Example1ReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<Example1ReadModel>;
};

export type Example1ReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<Example1ReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  nested?: InputMaybe<NestedExamplePropertyFilter>;
  nestedList?: InputMaybe<NestedExampleArrayPropertyFilter>;
  not?: InputMaybe<Example1ReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<Example1ReadModelFilter>>>;
  title?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type Example1ReadModelSortBy = {
  createdAt?: InputMaybe<OrderProperty>;
  description?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  nested?: InputMaybe<NestedExamplePropertySortBy>;
  nestedList?: InputMaybe<NestedExamplePropertySortBy>;
  title?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type Example1ReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<Example1ReadModelSubscriptionFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  nested?: InputMaybe<NestedExamplePropertyFilter>;
  nestedList?: InputMaybe<NestedExampleArrayPropertyFilter>;
  not?: InputMaybe<Example1ReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<Example1ReadModelSubscriptionFilter>>>;
  title?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type Example2ReadModel = {
  __typename?: 'Example2ReadModel';
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  test: Array<Example1ReadModel>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Example2ReadModelConnection = {
  __typename?: 'Example2ReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<Example2ReadModel>;
};

export type Example2ReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<Example2ReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<Example2ReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<Example2ReadModelFilter>>>;
  title?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type Example2ReadModelSortBy = {
  createdAt?: InputMaybe<OrderProperty>;
  description?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  title?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type Example2ReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<Example2ReadModelSubscriptionFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<Example2ReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<Example2ReadModelSubscriptionFilter>>>;
  title?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListExample1ReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListExample1ReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  nested?: InputMaybe<NestedExamplePropertyFilter>;
  nestedList?: InputMaybe<NestedExampleArrayPropertyFilter>;
  not?: InputMaybe<ListExample1ReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListExample1ReadModelFilter>>>;
  title?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListExample2ReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListExample2ReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  not?: InputMaybe<ListExample2ReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListExample2ReadModelFilter>>>;
  title?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddExample: Scalars['ID']['output'];
  ChangeExample: Scalars['ID']['output'];
};


export type MutationAddExampleArgs = {
  input: AddExampleInput;
};


export type MutationChangeExampleArgs = {
  input: ChangeExampleInput;
};

export type NestedExample = {
  __typename?: 'NestedExample';
  randomNumber: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type NestedExampleArrayPropertyFilter = {
  includes?: InputMaybe<Scalars['JSON']['input']>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NestedExamplePropertyFilter = {
  and?: InputMaybe<Array<InputMaybe<NestedExamplePropertyFilter>>>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedExamplePropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<NestedExamplePropertyFilter>>>;
  randomNumber?: InputMaybe<NumberPropertyFilter>;
  title?: InputMaybe<StringPropertyFilter>;
};

export type NestedExamplePropertySortBy = {
  randomNumber?: InputMaybe<OrderProperty>;
  title?: InputMaybe<OrderProperty>;
};

export type NumberPropertyFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  Example1ReadModel?: Maybe<Example1ReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  Example1ReadModels: Array<Example1ReadModel>;
  Example2ReadModel?: Maybe<Example2ReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  Example2ReadModels: Array<Example2ReadModel>;
  GetRandomExample?: Maybe<Example1ReadModel>;
  GetRole: Role;
  ListExample1ReadModels: Example1ReadModelConnection;
  ListExample2ReadModels: Example2ReadModelConnection;
  eventsByEntity?: Maybe<Array<Maybe<EventQueryResponse>>>;
  eventsByType?: Maybe<Array<Maybe<EventQueryResponse>>>;
};


export type QueryExample1ReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExample1ReadModelsArgs = {
  filter?: InputMaybe<Example1ReadModelFilter>;
};


export type QueryExample2ReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExample2ReadModelsArgs = {
  filter?: InputMaybe<Example2ReadModelFilter>;
};


export type QueryListExample1ReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListExample1ReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Example1ReadModelSortBy>;
};


export type QueryListExample2ReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListExample2ReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Example2ReadModelSortBy>;
};


export type QueryEventsByEntityArgs = {
  entity: EntityType;
  entityID?: InputMaybe<Scalars['ID']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEventsByTypeArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  type: EventType;
};

export enum Role {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  User = 'User'
}

export type StringPropertyFilter = {
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iRegex?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  Example1ReadModel?: Maybe<Example1ReadModel>;
  Example1ReadModels?: Maybe<Example1ReadModel>;
  Example2ReadModel?: Maybe<Example2ReadModel>;
  Example2ReadModels?: Maybe<Example2ReadModel>;
};


export type SubscriptionExample1ReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionExample1ReadModelsArgs = {
  filter?: InputMaybe<Example1ReadModelSubscriptionFilter>;
};


export type SubscriptionExample2ReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionExample2ReadModelsArgs = {
  filter?: InputMaybe<Example2ReadModelSubscriptionFilter>;
};

export type UuidPropertyFilter = {
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
};

export type UnionExample = Example1ReadModel | Example2ReadModel;

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  username: Scalars['String']['output'];
};

export enum OrderProperty {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type AddExampleMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddExampleMutation = { __typename?: 'Mutation', AddExample: string };

export type ListExample2ReadModelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListExample2ReadModelsQuery = { __typename?: 'Query', ListExample2ReadModels: { __typename?: 'Example2ReadModelConnection', items: Array<{ __typename?: 'Example2ReadModel', id: string, title: string, description?: string | null }> } };


export const AddExampleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddExample"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddExample"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}]}]}}]} as unknown as DocumentNode<AddExampleMutation, AddExampleMutationVariables>;
export const ListExample2ReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListExample2ReadModels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListExample2ReadModels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<ListExample2ReadModelsQuery, ListExample2ReadModelsQueryVariables>;