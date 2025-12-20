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

export type ActivateScheduledJobInput = {
  id: Scalars['ID']['input'];
};

export type AddAuthorInput = {
  name: Scalars['String']['input'];
};

export type AddBookInput = {
  authorIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  availableAsEbook: Scalars['Boolean']['input'];
  coverType: BookCoverType;
  description?: InputMaybe<Scalars['String']['input']>;
  numberOfPages: Scalars['Float']['input'];
  publishDate: Scalars['Date']['input'];
  publisherId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type AddPublisherInput = {
  addressPlaceId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type AddViewInput = {
  name: Scalars['String']['input'];
  pathname: Scalars['String']['input'];
  searchParams: Scalars['String']['input'];
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  formattedAddress?: Maybe<Scalars['String']['output']>;
  placeId: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type AddressPropertyFilter = {
  and?: InputMaybe<Array<InputMaybe<AddressPropertyFilter>>>;
  city?: InputMaybe<StringPropertyFilter>;
  country?: InputMaybe<StringPropertyFilter>;
  formattedAddress?: InputMaybe<StringPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<AddressPropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<AddressPropertyFilter>>>;
  placeId?: InputMaybe<StringPropertyFilter>;
  postalCode?: InputMaybe<StringPropertyFilter>;
  street?: InputMaybe<StringPropertyFilter>;
};

export type AddressPropertySortBy = {
  city?: InputMaybe<OrderProperty>;
  country?: InputMaybe<OrderProperty>;
  formattedAddress?: InputMaybe<OrderProperty>;
  placeId?: InputMaybe<OrderProperty>;
  postalCode?: InputMaybe<OrderProperty>;
  street?: InputMaybe<OrderProperty>;
};

export type AfterCursor = {
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AuthorReadModel = {
  __typename?: 'AuthorReadModel';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type AuthorReadModelConnection = {
  __typename?: 'AuthorReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<AuthorReadModel>;
};

export type AuthorReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<AuthorReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<AuthorReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<AuthorReadModelFilter>>>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type AuthorReadModelSortBy = {
  createdAt?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  name?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type AuthorReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<AuthorReadModelSubscriptionFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<AuthorReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<AuthorReadModelSubscriptionFilter>>>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export enum BookCoverType {
  Hardcover = 'Hardcover',
  Paperback = 'Paperback'
}

export type BookCoverTypePropertyFilter = {
  eq?: InputMaybe<BookCoverType>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<BookCoverType>;
};

export type BookReadModel = {
  __typename?: 'BookReadModel';
  authorIds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  authorNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  availableAsEbook: Scalars['Boolean']['output'];
  coverType: BookCoverType;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nested: NestedObject;
  nestedList: Array<NestedObject>;
  numberOfPages: Scalars['Float']['output'];
  publishDate: Scalars['Date']['output'];
  publisherId: Scalars['ID']['output'];
  publisherName: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type BookReadModelConnection = {
  __typename?: 'BookReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<BookReadModel>;
};

export type BookReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<BookReadModelFilter>>>;
  authorIds?: InputMaybe<UuidArrayPropertyFilter>;
  authorNames?: InputMaybe<StringArrayPropertyFilter>;
  availableAsEbook?: InputMaybe<BooleanPropertyFilter>;
  coverType?: InputMaybe<BookCoverTypePropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  nested?: InputMaybe<NestedObjectPropertyFilter>;
  nestedList?: InputMaybe<NestedObjectArrayPropertyFilter>;
  not?: InputMaybe<BookReadModelFilter>;
  numberOfPages?: InputMaybe<NumberPropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<BookReadModelFilter>>>;
  publishDate?: InputMaybe<DatePropertyFilter>;
  publisherId?: InputMaybe<UuidPropertyFilter>;
  publisherName?: InputMaybe<StringPropertyFilter>;
  title?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type BookReadModelSortBy = {
  authorIds?: InputMaybe<OrderProperty>;
  authorNames?: InputMaybe<OrderProperty>;
  availableAsEbook?: InputMaybe<OrderProperty>;
  coverType?: InputMaybe<OrderProperty>;
  createdAt?: InputMaybe<OrderProperty>;
  description?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  nested?: InputMaybe<NestedObjectPropertySortBy>;
  nestedList?: InputMaybe<NestedObjectPropertySortBy>;
  numberOfPages?: InputMaybe<OrderProperty>;
  publishDate?: InputMaybe<OrderProperty>;
  publisherId?: InputMaybe<OrderProperty>;
  publisherName?: InputMaybe<OrderProperty>;
  title?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type BookReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<BookReadModelSubscriptionFilter>>>;
  authorIds?: InputMaybe<UuidArrayPropertyFilter>;
  authorNames?: InputMaybe<StringArrayPropertyFilter>;
  availableAsEbook?: InputMaybe<BooleanPropertyFilter>;
  coverType?: InputMaybe<BookCoverTypePropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  nested?: InputMaybe<NestedObjectPropertyFilter>;
  nestedList?: InputMaybe<NestedObjectArrayPropertyFilter>;
  not?: InputMaybe<BookReadModelSubscriptionFilter>;
  numberOfPages?: InputMaybe<NumberPropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<BookReadModelSubscriptionFilter>>>;
  publishDate?: InputMaybe<DatePropertyFilter>;
  publisherId?: InputMaybe<UuidPropertyFilter>;
  publisherName?: InputMaybe<StringPropertyFilter>;
  title?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type BooleanPropertyFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CalendarEventObject = {
  __typename?: 'CalendarEventObject';
  calendarGroupId?: Maybe<Scalars['ID']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  endDateTime: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  isRecurringCalendarEvent: Scalars['Boolean']['output'];
  recurringCalendarEventData?: Maybe<RecurringCalendarEventData>;
  startDateTime: Scalars['Date']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CalendarEventReadModel = {
  __typename?: 'CalendarEventReadModel';
  calendarGroupId?: Maybe<Scalars['ID']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  endDateTime: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  startDateTime: Scalars['Date']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CalendarEventReadModelConnection = {
  __typename?: 'CalendarEventReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<CalendarEventReadModel>;
};

export type CalendarEventReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<CalendarEventReadModelFilter>>>;
  calendarGroupId?: InputMaybe<UuidPropertyFilter>;
  color?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  displayName?: InputMaybe<StringPropertyFilter>;
  endDateTime?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<CalendarEventReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<CalendarEventReadModelFilter>>>;
  startDateTime?: InputMaybe<DatePropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type CalendarEventReadModelSortBy = {
  calendarGroupId?: InputMaybe<OrderProperty>;
  color?: InputMaybe<OrderProperty>;
  createdAt?: InputMaybe<OrderProperty>;
  description?: InputMaybe<OrderProperty>;
  displayName?: InputMaybe<OrderProperty>;
  endDateTime?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  startDateTime?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type CalendarEventReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<CalendarEventReadModelSubscriptionFilter>>>;
  calendarGroupId?: InputMaybe<UuidPropertyFilter>;
  color?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  displayName?: InputMaybe<StringPropertyFilter>;
  endDateTime?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<CalendarEventReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<CalendarEventReadModelSubscriptionFilter>>>;
  startDateTime?: InputMaybe<DatePropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type CalendarGroupReadModel = {
  __typename?: 'CalendarGroupReadModel';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CalendarGroupReadModelConnection = {
  __typename?: 'CalendarGroupReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<CalendarGroupReadModel>;
};

export type CalendarGroupReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<CalendarGroupReadModelFilter>>>;
  color?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<CalendarGroupReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<CalendarGroupReadModelFilter>>>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type CalendarGroupReadModelSortBy = {
  color?: InputMaybe<OrderProperty>;
  createdAt?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  name?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type CalendarGroupReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<CalendarGroupReadModelSubscriptionFilter>>>;
  color?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<CalendarGroupReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<CalendarGroupReadModelSubscriptionFilter>>>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export enum CalendarWeekday {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type CalendarWeekdayArrayPropertyFilter = {
  includes?: InputMaybe<Scalars['JSON']['input']>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CancelJobInput = {
  id: Scalars['ID']['input'];
};

export type ChangeAuthorInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type ChangeBookInput = {
  authorIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  availableAsEbook: Scalars['Boolean']['input'];
  coverType: BookCoverType;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  numberOfPages: Scalars['Float']['input'];
  publishDate: Scalars['Date']['input'];
  publisherId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type ChangePublisherInput = {
  addressPlaceId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateCalendarEventInput = {
  calendarGroupId?: InputMaybe<Scalars['ID']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  endDateTime: Scalars['Date']['input'];
  fromRecurringEventId?: InputMaybe<Scalars['ID']['input']>;
  startDateTime: Scalars['Date']['input'];
};

export type CreateCalendarGroupInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateFileInput = {
  filename: Scalars['String']['input'];
};

export type CreateRecurringCalendarEventInput = {
  calendarGroupId?: InputMaybe<Scalars['ID']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  durationInMinutes: Scalars['Float']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  every: Scalars['Float']['input'];
  frequency: RecurringCalendarEventFrequency;
  onWeekdays?: InputMaybe<Array<InputMaybe<CalendarWeekday>>>;
  startDate: Scalars['Date']['input'];
  timezone: Scalars['String']['input'];
};

export type CreateScheduledJobInput = {
  jobKey: JobKey;
  name: Scalars['String']['input'];
  schedule: Scalars['String']['input'];
};

export type CreateSignedUrlForFileUploadReturnType = {
  __typename?: 'CreateSignedUrlForFileUploadReturnType';
  contentType?: Maybe<Scalars['String']['output']>;
  createdFileId: Scalars['ID']['output'];
  filename: Scalars['String']['output'];
  signedUrl: Scalars['String']['output'];
};

export type DateArrayPropertyFilter = {
  includes?: InputMaybe<Scalars['JSON']['input']>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
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

export type DeactivateScheduledJobInput = {
  id: Scalars['ID']['input'];
};

export type DeleteCalendarEventInput = {
  calendarEventId: Scalars['ID']['input'];
};

export type DeleteCalendarGroupInput = {
  calendarGroupId: Scalars['ID']['input'];
  keepAndUnlinkEvents: Scalars['Boolean']['input'];
};

export type DeleteEventInput = {
  createdAt: Scalars['String']['input'];
  entityID: Scalars['String']['input'];
  entityTypeName: Scalars['String']['input'];
};

export type DeleteRecurringCalendarEventInput = {
  recurringCalendarEventId: Scalars['ID']['input'];
};

export type DeleteRecurringCalendarEventInstanceInput = {
  instanceDate: Scalars['Date']['input'];
  recurringCalendarEventId: Scalars['ID']['input'];
};

export type EntityHistory = {
  __typename?: 'EntityHistory';
  entityId: Scalars['String']['output'];
  entityTypeName: Scalars['String']['output'];
  events: Array<EntityHistoryEntry>;
};

export type EntityHistoryEntry = {
  __typename?: 'EntityHistoryEntry';
  date: Scalars['Date']['output'];
  diff?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  newSnapshot: Scalars['JSON']['output'];
  oldSnapshot: Scalars['JSON']['output'];
  type: Scalars['String']['output'];
  user: EntityHistoryEntryUser;
  value: Scalars['JSON']['output'];
};

export type EntityHistoryEntryUser = {
  __typename?: 'EntityHistoryEntryUser';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export enum EntityType {
  Author = 'Author',
  Book = 'Book',
  BoosterDataMigrationEntity = 'BoosterDataMigrationEntity',
  CalendarEvent = 'CalendarEvent',
  CalendarGroup = 'CalendarGroup',
  File = 'File',
  JobExecution = 'JobExecution',
  Publisher = 'Publisher',
  RecurringCalendarEvent = 'RecurringCalendarEvent',
  ScheduledJob = 'ScheduledJob',
  View = 'View'
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
  AuthorAdded = 'AuthorAdded',
  AuthorChanged = 'AuthorChanged',
  AuthorRemoved = 'AuthorRemoved',
  BookAdded = 'BookAdded',
  BookChanged = 'BookChanged',
  BookRemoved = 'BookRemoved',
  BoosterDataMigrationFinished = 'BoosterDataMigrationFinished',
  BoosterDataMigrationStarted = 'BoosterDataMigrationStarted',
  CalendarEventCreated = 'CalendarEventCreated',
  CalendarEventDeleted = 'CalendarEventDeleted',
  CalendarEventUnlinkedFromGroup = 'CalendarEventUnlinkedFromGroup',
  CalendarEventUpdated = 'CalendarEventUpdated',
  CalendarGroupCreated = 'CalendarGroupCreated',
  CalendarGroupDeleted = 'CalendarGroupDeleted',
  CalendarGroupUpdated = 'CalendarGroupUpdated',
  DateExcludedFromRecurringCalendarEvent = 'DateExcludedFromRecurringCalendarEvent',
  FileCreated = 'FileCreated',
  JobExecutionCanceled = 'JobExecutionCanceled',
  JobExecutionCreated = 'JobExecutionCreated',
  JobExecutionFailed = 'JobExecutionFailed',
  JobExecutionItemProcessed = 'JobExecutionItemProcessed',
  JobExecutionMessageAdded = 'JobExecutionMessageAdded',
  JobExecutionStarted = 'JobExecutionStarted',
  JobExecutionSucceeded = 'JobExecutionSucceeded',
  JobExecutionTotalItemsUpdated = 'JobExecutionTotalItemsUpdated',
  PublisherAdded = 'PublisherAdded',
  PublisherChanged = 'PublisherChanged',
  PublisherRemoved = 'PublisherRemoved',
  RecurringCalendarEventCreated = 'RecurringCalendarEventCreated',
  RecurringCalendarEventDeleted = 'RecurringCalendarEventDeleted',
  RecurringCalendarEventUnlinkedFromGroup = 'RecurringCalendarEventUnlinkedFromGroup',
  RecurringCalendarEventUpdated = 'RecurringCalendarEventUpdated',
  ScheduledJobActivated = 'ScheduledJobActivated',
  ScheduledJobCreated = 'ScheduledJobCreated',
  ScheduledJobDataUpdated = 'ScheduledJobDataUpdated',
  ScheduledJobDeactivated = 'ScheduledJobDeactivated',
  ScheduledJobRemoved = 'ScheduledJobRemoved',
  ScheduledJobScheduleUpdated = 'ScheduledJobScheduleUpdated',
  ViewAdded = 'ViewAdded',
  ViewRemoved = 'ViewRemoved'
}

export type ExecuteJobInput = {
  data?: InputMaybe<Scalars['String']['input']>;
  jobKey: JobKey;
  name: Scalars['String']['input'];
};

export type FileReadModel = {
  __typename?: 'FileReadModel';
  contentLength?: Maybe<Scalars['Float']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  externalId?: Maybe<Scalars['String']['output']>;
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  signedDownloadUrl: Scalars['String']['output'];
  storageKey: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type FileReadModelConnection = {
  __typename?: 'FileReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<FileReadModel>;
};

export type FileReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<FileReadModelFilter>>>;
  contentType?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  externalId?: InputMaybe<StringPropertyFilter>;
  filename?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<FileReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<FileReadModelFilter>>>;
  storageKey?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type FileReadModelSortBy = {
  contentType?: InputMaybe<OrderProperty>;
  createdAt?: InputMaybe<OrderProperty>;
  externalId?: InputMaybe<OrderProperty>;
  filename?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  storageKey?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type FileReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<FileReadModelSubscriptionFilter>>>;
  contentType?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  externalId?: InputMaybe<StringPropertyFilter>;
  filename?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<FileReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<FileReadModelSubscriptionFilter>>>;
  storageKey?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type GetCalendarEventsBetweenInput = {
  calendarGroupId?: InputMaybe<Scalars['ID']['input']>;
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type GetEntityHistoryInput = {
  entityId: Scalars['String']['input'];
  entityTypeName: Scalars['String']['input'];
};

export type GetMyViewsForPathnameInput = {
  pathname: Scalars['String']['input'];
};

export type JobExecutionReadModel = {
  __typename?: 'JobExecutionReadModel';
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  data?: Maybe<Scalars['String']['output']>;
  durationInSeconds?: Maybe<Scalars['Float']['output']>;
  estimatedSecondsRemaining?: Maybe<Scalars['Float']['output']>;
  failedItems?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  jobKey: JobKey;
  messages: Array<Message>;
  name: Scalars['String']['output'];
  progress: Scalars['Float']['output'];
  scheduledJobId?: Maybe<Scalars['ID']['output']>;
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: JobExecutionStatus;
  successfulItems?: Maybe<Scalars['Float']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type JobExecutionReadModelConnection = {
  __typename?: 'JobExecutionReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<JobExecutionReadModel>;
};

export type JobExecutionReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<JobExecutionReadModelFilter>>>;
  completedAt?: InputMaybe<DatePropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  data?: InputMaybe<StringPropertyFilter>;
  failedItems?: InputMaybe<NumberPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  jobKey?: InputMaybe<JobKeyPropertyFilter>;
  messages?: InputMaybe<MessageArrayPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<JobExecutionReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<JobExecutionReadModelFilter>>>;
  scheduledJobId?: InputMaybe<UuidPropertyFilter>;
  startedAt?: InputMaybe<DatePropertyFilter>;
  status?: InputMaybe<JobExecutionStatusPropertyFilter>;
  successfulItems?: InputMaybe<NumberPropertyFilter>;
  summary?: InputMaybe<StringPropertyFilter>;
  totalItems?: InputMaybe<NumberPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type JobExecutionReadModelSortBy = {
  completedAt?: InputMaybe<OrderProperty>;
  createdAt?: InputMaybe<OrderProperty>;
  data?: InputMaybe<OrderProperty>;
  failedItems?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  jobKey?: InputMaybe<OrderProperty>;
  messages?: InputMaybe<OrderProperty>;
  name?: InputMaybe<OrderProperty>;
  scheduledJobId?: InputMaybe<OrderProperty>;
  startedAt?: InputMaybe<OrderProperty>;
  status?: InputMaybe<OrderProperty>;
  successfulItems?: InputMaybe<OrderProperty>;
  summary?: InputMaybe<OrderProperty>;
  totalItems?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type JobExecutionReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<JobExecutionReadModelSubscriptionFilter>>>;
  completedAt?: InputMaybe<DatePropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  data?: InputMaybe<StringPropertyFilter>;
  failedItems?: InputMaybe<NumberPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  jobKey?: InputMaybe<JobKeyPropertyFilter>;
  messages?: InputMaybe<MessageArrayPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<JobExecutionReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<JobExecutionReadModelSubscriptionFilter>>>;
  scheduledJobId?: InputMaybe<UuidPropertyFilter>;
  startedAt?: InputMaybe<DatePropertyFilter>;
  status?: InputMaybe<JobExecutionStatusPropertyFilter>;
  successfulItems?: InputMaybe<NumberPropertyFilter>;
  summary?: InputMaybe<StringPropertyFilter>;
  totalItems?: InputMaybe<NumberPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export enum JobExecutionStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type JobExecutionStatusPropertyFilter = {
  eq?: InputMaybe<JobExecutionStatus>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<JobExecutionStatus>;
};

export enum JobKey {
  Fibonacci = 'Fibonacci',
  SyncBooks = 'SyncBooks'
}

export type JobKeyPropertyFilter = {
  eq?: InputMaybe<JobKey>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<JobKey>;
};

export type ListAuthorReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListAuthorReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ListAuthorReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListAuthorReadModelFilter>>>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListBookReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListBookReadModelFilter>>>;
  authorIds?: InputMaybe<UuidArrayPropertyFilter>;
  authorNames?: InputMaybe<StringArrayPropertyFilter>;
  availableAsEbook?: InputMaybe<BooleanPropertyFilter>;
  coverType?: InputMaybe<BookCoverTypePropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  nested?: InputMaybe<NestedObjectPropertyFilter>;
  nestedList?: InputMaybe<NestedObjectArrayPropertyFilter>;
  not?: InputMaybe<ListBookReadModelFilter>;
  numberOfPages?: InputMaybe<NumberPropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<ListBookReadModelFilter>>>;
  publishDate?: InputMaybe<DatePropertyFilter>;
  publisherId?: InputMaybe<UuidPropertyFilter>;
  publisherName?: InputMaybe<StringPropertyFilter>;
  title?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListCalendarEventReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListCalendarEventReadModelFilter>>>;
  calendarGroupId?: InputMaybe<UuidPropertyFilter>;
  color?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  displayName?: InputMaybe<StringPropertyFilter>;
  endDateTime?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  not?: InputMaybe<ListCalendarEventReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListCalendarEventReadModelFilter>>>;
  startDateTime?: InputMaybe<DatePropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListCalendarGroupReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListCalendarGroupReadModelFilter>>>;
  color?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ListCalendarGroupReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListCalendarGroupReadModelFilter>>>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListFileReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListFileReadModelFilter>>>;
  contentType?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  externalId?: InputMaybe<StringPropertyFilter>;
  filename?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  not?: InputMaybe<ListFileReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListFileReadModelFilter>>>;
  storageKey?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListJobExecutionReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListJobExecutionReadModelFilter>>>;
  completedAt?: InputMaybe<DatePropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  data?: InputMaybe<StringPropertyFilter>;
  failedItems?: InputMaybe<NumberPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  jobKey?: InputMaybe<JobKeyPropertyFilter>;
  messages?: InputMaybe<MessageArrayPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ListJobExecutionReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListJobExecutionReadModelFilter>>>;
  scheduledJobId?: InputMaybe<UuidPropertyFilter>;
  startedAt?: InputMaybe<DatePropertyFilter>;
  status?: InputMaybe<JobExecutionStatusPropertyFilter>;
  successfulItems?: InputMaybe<NumberPropertyFilter>;
  summary?: InputMaybe<StringPropertyFilter>;
  totalItems?: InputMaybe<NumberPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListPublisherReadModelFilter = {
  address?: InputMaybe<AddressPropertyFilter>;
  and?: InputMaybe<Array<InputMaybe<ListPublisherReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ListPublisherReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListPublisherReadModelFilter>>>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListRecurringCalendarEventReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListRecurringCalendarEventReadModelFilter>>>;
  calendarGroupId?: InputMaybe<UuidPropertyFilter>;
  color?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  displayName?: InputMaybe<StringPropertyFilter>;
  durationInMinutes?: InputMaybe<NumberPropertyFilter>;
  endDate?: InputMaybe<DatePropertyFilter>;
  every?: InputMaybe<NumberPropertyFilter>;
  excludedDates?: InputMaybe<DateArrayPropertyFilter>;
  frequency?: InputMaybe<RecurringCalendarEventFrequencyPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  not?: InputMaybe<ListRecurringCalendarEventReadModelFilter>;
  onWeekdays?: InputMaybe<CalendarWeekdayArrayPropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<ListRecurringCalendarEventReadModelFilter>>>;
  rRuleSetString?: InputMaybe<StringPropertyFilter>;
  startDate?: InputMaybe<DatePropertyFilter>;
  timezone?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListScheduledJobReadModelFilter = {
  active?: InputMaybe<BooleanPropertyFilter>;
  and?: InputMaybe<Array<InputMaybe<ListScheduledJobReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  data?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  jobKey?: InputMaybe<JobKeyPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ListScheduledJobReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListScheduledJobReadModelFilter>>>;
  schedule?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ListViewReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ListViewReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ListViewReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ListViewReadModelFilter>>>;
  pathname?: InputMaybe<StringPropertyFilter>;
  searchParams?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
  userId?: InputMaybe<StringPropertyFilter>;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  timestamp: Scalars['Date']['output'];
};

export type MessageArrayPropertyFilter = {
  includes?: InputMaybe<Scalars['JSON']['input']>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  ActivateScheduledJob: Scalars['ID']['output'];
  AddAuthor: Scalars['ID']['output'];
  AddBook: Scalars['ID']['output'];
  AddPublisher: Scalars['ID']['output'];
  AddView: Scalars['ID']['output'];
  CancelJob: Scalars['ID']['output'];
  ChangeAuthor: Scalars['ID']['output'];
  ChangeBook: Scalars['ID']['output'];
  ChangePublisher: Scalars['ID']['output'];
  CreateCalendarEvent: Scalars['ID']['output'];
  CreateCalendarGroup: Scalars['ID']['output'];
  CreateFile: CreateSignedUrlForFileUploadReturnType;
  CreateRecurringCalendarEvent: Scalars['ID']['output'];
  CreateScheduledJob: Scalars['ID']['output'];
  DeactivateScheduledJob: Scalars['ID']['output'];
  DeleteCalendarEvent: Scalars['ID']['output'];
  DeleteCalendarGroup: Scalars['ID']['output'];
  DeleteEvent: Scalars['Boolean']['output'];
  DeleteRecurringCalendarEvent: Scalars['ID']['output'];
  DeleteRecurringCalendarEventInstance: Scalars['ID']['output'];
  ExecuteJob: Scalars['ID']['output'];
  RemoveAuthor: Scalars['ID']['output'];
  RemoveBook: Scalars['ID']['output'];
  RemovePublisher: Scalars['ID']['output'];
  RemoveScheduledJob: Scalars['ID']['output'];
  RemoveView: Scalars['ID']['output'];
  SyncBooks: Scalars['ID']['output'];
  UpdateCalendarEvent: Scalars['ID']['output'];
  UpdateCalendarGroup: Scalars['ID']['output'];
  UpdateRecurringCalendarEvent: Scalars['ID']['output'];
  UpdateScheduledJobData: Scalars['ID']['output'];
  UpdateScheduledJobSchedule: Scalars['ID']['output'];
};


export type MutationActivateScheduledJobArgs = {
  input: ActivateScheduledJobInput;
};


export type MutationAddAuthorArgs = {
  input: AddAuthorInput;
};


export type MutationAddBookArgs = {
  input: AddBookInput;
};


export type MutationAddPublisherArgs = {
  input: AddPublisherInput;
};


export type MutationAddViewArgs = {
  input: AddViewInput;
};


export type MutationCancelJobArgs = {
  input: CancelJobInput;
};


export type MutationChangeAuthorArgs = {
  input: ChangeAuthorInput;
};


export type MutationChangeBookArgs = {
  input: ChangeBookInput;
};


export type MutationChangePublisherArgs = {
  input: ChangePublisherInput;
};


export type MutationCreateCalendarEventArgs = {
  input: CreateCalendarEventInput;
};


export type MutationCreateCalendarGroupArgs = {
  input: CreateCalendarGroupInput;
};


export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


export type MutationCreateRecurringCalendarEventArgs = {
  input: CreateRecurringCalendarEventInput;
};


export type MutationCreateScheduledJobArgs = {
  input: CreateScheduledJobInput;
};


export type MutationDeactivateScheduledJobArgs = {
  input: DeactivateScheduledJobInput;
};


export type MutationDeleteCalendarEventArgs = {
  input: DeleteCalendarEventInput;
};


export type MutationDeleteCalendarGroupArgs = {
  input: DeleteCalendarGroupInput;
};


export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};


export type MutationDeleteRecurringCalendarEventArgs = {
  input: DeleteRecurringCalendarEventInput;
};


export type MutationDeleteRecurringCalendarEventInstanceArgs = {
  input: DeleteRecurringCalendarEventInstanceInput;
};


export type MutationExecuteJobArgs = {
  input: ExecuteJobInput;
};


export type MutationRemoveAuthorArgs = {
  input: RemoveAuthorInput;
};


export type MutationRemoveBookArgs = {
  input: RemoveBookInput;
};


export type MutationRemovePublisherArgs = {
  input: RemovePublisherInput;
};


export type MutationRemoveScheduledJobArgs = {
  input: RemoveScheduledJobInput;
};


export type MutationRemoveViewArgs = {
  input: RemoveViewInput;
};


export type MutationUpdateCalendarEventArgs = {
  input: UpdateCalendarEventInput;
};


export type MutationUpdateCalendarGroupArgs = {
  input: UpdateCalendarGroupInput;
};


export type MutationUpdateRecurringCalendarEventArgs = {
  input: UpdateRecurringCalendarEventInput;
};


export type MutationUpdateScheduledJobDataArgs = {
  input: UpdateScheduledJobDataInput;
};


export type MutationUpdateScheduledJobScheduleArgs = {
  input: UpdateScheduledJobScheduleInput;
};

export type NestedObject = {
  __typename?: 'NestedObject';
  randomNumber: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type NestedObjectArrayPropertyFilter = {
  includes?: InputMaybe<Scalars['JSON']['input']>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NestedObjectPropertyFilter = {
  and?: InputMaybe<Array<InputMaybe<NestedObjectPropertyFilter>>>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedObjectPropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<NestedObjectPropertyFilter>>>;
  randomNumber?: InputMaybe<NumberPropertyFilter>;
  title?: InputMaybe<StringPropertyFilter>;
};

export type NestedObjectPropertySortBy = {
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

export type PublisherReadModel = {
  __typename?: 'PublisherReadModel';
  address?: Maybe<Address>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type PublisherReadModelConnection = {
  __typename?: 'PublisherReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<PublisherReadModel>;
};

export type PublisherReadModelFilter = {
  address?: InputMaybe<AddressPropertyFilter>;
  and?: InputMaybe<Array<InputMaybe<PublisherReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<PublisherReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<PublisherReadModelFilter>>>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type PublisherReadModelSortBy = {
  address?: InputMaybe<AddressPropertySortBy>;
  createdAt?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  name?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type PublisherReadModelSubscriptionFilter = {
  address?: InputMaybe<AddressPropertyFilter>;
  and?: InputMaybe<Array<InputMaybe<PublisherReadModelSubscriptionFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<PublisherReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<PublisherReadModelSubscriptionFilter>>>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type Query = {
  __typename?: 'Query';
  AuthorReadModel?: Maybe<AuthorReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  AuthorReadModels: Array<AuthorReadModel>;
  BookReadModel?: Maybe<BookReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  BookReadModels: Array<BookReadModel>;
  CalendarEventReadModel?: Maybe<CalendarEventReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  CalendarEventReadModels: Array<CalendarEventReadModel>;
  CalendarGroupReadModel?: Maybe<CalendarGroupReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  CalendarGroupReadModels: Array<CalendarGroupReadModel>;
  FileReadModel?: Maybe<FileReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  FileReadModels: Array<FileReadModel>;
  GetCalendarEventsBetween: Array<CalendarEventObject>;
  GetEntityHistory: EntityHistory;
  GetMyViewsForPathname: Array<ViewReadModel>;
  GetRandomBook?: Maybe<BookReadModel>;
  GetRole: Role;
  GetServiceVersion: ServiceVersionInfo;
  JobExecutionReadModel?: Maybe<JobExecutionReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  JobExecutionReadModels: Array<JobExecutionReadModel>;
  ListAuthorReadModels: AuthorReadModelConnection;
  ListBookReadModels: BookReadModelConnection;
  ListCalendarEventReadModels: CalendarEventReadModelConnection;
  ListCalendarGroupReadModels: CalendarGroupReadModelConnection;
  ListFileReadModels: FileReadModelConnection;
  ListJobExecutionReadModels: JobExecutionReadModelConnection;
  ListPublisherReadModels: PublisherReadModelConnection;
  ListRecurringCalendarEventReadModels: RecurringCalendarEventReadModelConnection;
  ListScheduledJobReadModels: ScheduledJobReadModelConnection;
  ListViewReadModels: ViewReadModelConnection;
  PublisherReadModel?: Maybe<PublisherReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  PublisherReadModels: Array<PublisherReadModel>;
  RecurringCalendarEventReadModel?: Maybe<RecurringCalendarEventReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  RecurringCalendarEventReadModels: Array<RecurringCalendarEventReadModel>;
  ScheduledJobReadModel?: Maybe<ScheduledJobReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  ScheduledJobReadModels: Array<ScheduledJobReadModel>;
  ViewReadModel?: Maybe<ViewReadModel>;
  /** @deprecated Method is deprecated. Use List* methods */
  ViewReadModels: Array<ViewReadModel>;
  eventsByEntity?: Maybe<Array<Maybe<EventQueryResponse>>>;
  eventsByType?: Maybe<Array<Maybe<EventQueryResponse>>>;
};


export type QueryAuthorReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAuthorReadModelsArgs = {
  filter?: InputMaybe<AuthorReadModelFilter>;
};


export type QueryBookReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookReadModelsArgs = {
  filter?: InputMaybe<BookReadModelFilter>;
};


export type QueryCalendarEventReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCalendarEventReadModelsArgs = {
  filter?: InputMaybe<CalendarEventReadModelFilter>;
};


export type QueryCalendarGroupReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCalendarGroupReadModelsArgs = {
  filter?: InputMaybe<CalendarGroupReadModelFilter>;
};


export type QueryFileReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFileReadModelsArgs = {
  filter?: InputMaybe<FileReadModelFilter>;
};


export type QueryGetCalendarEventsBetweenArgs = {
  input: GetCalendarEventsBetweenInput;
};


export type QueryGetEntityHistoryArgs = {
  input: GetEntityHistoryInput;
};


export type QueryGetMyViewsForPathnameArgs = {
  input: GetMyViewsForPathnameInput;
};


export type QueryJobExecutionReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryJobExecutionReadModelsArgs = {
  filter?: InputMaybe<JobExecutionReadModelFilter>;
};


export type QueryListAuthorReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListAuthorReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<AuthorReadModelSortBy>;
};


export type QueryListBookReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListBookReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<BookReadModelSortBy>;
};


export type QueryListCalendarEventReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListCalendarEventReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<CalendarEventReadModelSortBy>;
};


export type QueryListCalendarGroupReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListCalendarGroupReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<CalendarGroupReadModelSortBy>;
};


export type QueryListFileReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListFileReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<FileReadModelSortBy>;
};


export type QueryListJobExecutionReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListJobExecutionReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<JobExecutionReadModelSortBy>;
};


export type QueryListPublisherReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListPublisherReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<PublisherReadModelSortBy>;
};


export type QueryListRecurringCalendarEventReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListRecurringCalendarEventReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<RecurringCalendarEventReadModelSortBy>;
};


export type QueryListScheduledJobReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListScheduledJobReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ScheduledJobReadModelSortBy>;
};


export type QueryListViewReadModelsArgs = {
  afterCursor?: InputMaybe<AfterCursor>;
  filter?: InputMaybe<ListViewReadModelFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ViewReadModelSortBy>;
};


export type QueryPublisherReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPublisherReadModelsArgs = {
  filter?: InputMaybe<PublisherReadModelFilter>;
};


export type QueryRecurringCalendarEventReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRecurringCalendarEventReadModelsArgs = {
  filter?: InputMaybe<RecurringCalendarEventReadModelFilter>;
};


export type QueryScheduledJobReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryScheduledJobReadModelsArgs = {
  filter?: InputMaybe<ScheduledJobReadModelFilter>;
};


export type QueryViewReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryViewReadModelsArgs = {
  filter?: InputMaybe<ViewReadModelFilter>;
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

export type RecurringCalendarEventData = {
  __typename?: 'RecurringCalendarEventData';
  createdAt: Scalars['Date']['output'];
  durationInMinutes: Scalars['Float']['output'];
  endDate?: Maybe<Scalars['Date']['output']>;
  every: Scalars['Float']['output'];
  frequency: RecurringCalendarEventFrequency;
  id: Scalars['ID']['output'];
  onWeekdays?: Maybe<Array<Maybe<CalendarWeekday>>>;
  rRuleSetString: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  timezone: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export enum RecurringCalendarEventFrequency {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type RecurringCalendarEventFrequencyPropertyFilter = {
  eq?: InputMaybe<RecurringCalendarEventFrequency>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<RecurringCalendarEventFrequency>;
};

export type RecurringCalendarEventReadModel = {
  __typename?: 'RecurringCalendarEventReadModel';
  calendarGroupId?: Maybe<Scalars['ID']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  durationInMinutes: Scalars['Float']['output'];
  endDate?: Maybe<Scalars['Date']['output']>;
  every: Scalars['Float']['output'];
  excludedDates: Array<Scalars['Date']['output']>;
  frequency: RecurringCalendarEventFrequency;
  id: Scalars['ID']['output'];
  onWeekdays?: Maybe<Array<Maybe<CalendarWeekday>>>;
  rRuleSetString: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  timezone: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type RecurringCalendarEventReadModelConnection = {
  __typename?: 'RecurringCalendarEventReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<RecurringCalendarEventReadModel>;
};

export type RecurringCalendarEventReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<RecurringCalendarEventReadModelFilter>>>;
  calendarGroupId?: InputMaybe<UuidPropertyFilter>;
  color?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  displayName?: InputMaybe<StringPropertyFilter>;
  durationInMinutes?: InputMaybe<NumberPropertyFilter>;
  endDate?: InputMaybe<DatePropertyFilter>;
  every?: InputMaybe<NumberPropertyFilter>;
  excludedDates?: InputMaybe<DateArrayPropertyFilter>;
  frequency?: InputMaybe<RecurringCalendarEventFrequencyPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<RecurringCalendarEventReadModelFilter>;
  onWeekdays?: InputMaybe<CalendarWeekdayArrayPropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<RecurringCalendarEventReadModelFilter>>>;
  rRuleSetString?: InputMaybe<StringPropertyFilter>;
  startDate?: InputMaybe<DatePropertyFilter>;
  timezone?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type RecurringCalendarEventReadModelSortBy = {
  calendarGroupId?: InputMaybe<OrderProperty>;
  color?: InputMaybe<OrderProperty>;
  createdAt?: InputMaybe<OrderProperty>;
  description?: InputMaybe<OrderProperty>;
  displayName?: InputMaybe<OrderProperty>;
  durationInMinutes?: InputMaybe<OrderProperty>;
  endDate?: InputMaybe<OrderProperty>;
  every?: InputMaybe<OrderProperty>;
  excludedDates?: InputMaybe<OrderProperty>;
  frequency?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  onWeekdays?: InputMaybe<OrderProperty>;
  rRuleSetString?: InputMaybe<OrderProperty>;
  startDate?: InputMaybe<OrderProperty>;
  timezone?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type RecurringCalendarEventReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<RecurringCalendarEventReadModelSubscriptionFilter>>>;
  calendarGroupId?: InputMaybe<UuidPropertyFilter>;
  color?: InputMaybe<StringPropertyFilter>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  description?: InputMaybe<StringPropertyFilter>;
  displayName?: InputMaybe<StringPropertyFilter>;
  durationInMinutes?: InputMaybe<NumberPropertyFilter>;
  endDate?: InputMaybe<DatePropertyFilter>;
  every?: InputMaybe<NumberPropertyFilter>;
  excludedDates?: InputMaybe<DateArrayPropertyFilter>;
  frequency?: InputMaybe<RecurringCalendarEventFrequencyPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<RecurringCalendarEventReadModelSubscriptionFilter>;
  onWeekdays?: InputMaybe<CalendarWeekdayArrayPropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<RecurringCalendarEventReadModelSubscriptionFilter>>>;
  rRuleSetString?: InputMaybe<StringPropertyFilter>;
  startDate?: InputMaybe<DatePropertyFilter>;
  timezone?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type RemoveAuthorInput = {
  id: Scalars['ID']['input'];
};

export type RemoveBookInput = {
  id: Scalars['ID']['input'];
};

export type RemovePublisherInput = {
  id: Scalars['ID']['input'];
};

export type RemoveScheduledJobInput = {
  id: Scalars['ID']['input'];
};

export type RemoveViewInput = {
  id: Scalars['ID']['input'];
};

export enum Role {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  User = 'User'
}

export type ScheduledJobReadModel = {
  __typename?: 'ScheduledJobReadModel';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['Date']['output'];
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jobKey: JobKey;
  name: Scalars['String']['output'];
  schedule: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type ScheduledJobReadModelConnection = {
  __typename?: 'ScheduledJobReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<ScheduledJobReadModel>;
};

export type ScheduledJobReadModelFilter = {
  active?: InputMaybe<BooleanPropertyFilter>;
  and?: InputMaybe<Array<InputMaybe<ScheduledJobReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  data?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  jobKey?: InputMaybe<JobKeyPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ScheduledJobReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ScheduledJobReadModelFilter>>>;
  schedule?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ScheduledJobReadModelSortBy = {
  active?: InputMaybe<OrderProperty>;
  createdAt?: InputMaybe<OrderProperty>;
  data?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  jobKey?: InputMaybe<OrderProperty>;
  name?: InputMaybe<OrderProperty>;
  schedule?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
};

export type ScheduledJobReadModelSubscriptionFilter = {
  active?: InputMaybe<BooleanPropertyFilter>;
  and?: InputMaybe<Array<InputMaybe<ScheduledJobReadModelSubscriptionFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  data?: InputMaybe<StringPropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  jobKey?: InputMaybe<JobKeyPropertyFilter>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ScheduledJobReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<ScheduledJobReadModelSubscriptionFilter>>>;
  schedule?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
};

export type ServiceVersionInfo = {
  __typename?: 'ServiceVersionInfo';
  version: Scalars['String']['output'];
};

export type StringArrayPropertyFilter = {
  includes?: InputMaybe<Scalars['String']['input']>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
};

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
  AuthorReadModel?: Maybe<AuthorReadModel>;
  AuthorReadModels?: Maybe<AuthorReadModel>;
  BookReadModel?: Maybe<BookReadModel>;
  BookReadModels?: Maybe<BookReadModel>;
  CalendarEventReadModel?: Maybe<CalendarEventReadModel>;
  CalendarEventReadModels?: Maybe<CalendarEventReadModel>;
  CalendarGroupReadModel?: Maybe<CalendarGroupReadModel>;
  CalendarGroupReadModels?: Maybe<CalendarGroupReadModel>;
  FileReadModel?: Maybe<FileReadModel>;
  FileReadModels?: Maybe<FileReadModel>;
  JobExecutionReadModel?: Maybe<JobExecutionReadModel>;
  JobExecutionReadModels?: Maybe<JobExecutionReadModel>;
  PublisherReadModel?: Maybe<PublisherReadModel>;
  PublisherReadModels?: Maybe<PublisherReadModel>;
  RecurringCalendarEventReadModel?: Maybe<RecurringCalendarEventReadModel>;
  RecurringCalendarEventReadModels?: Maybe<RecurringCalendarEventReadModel>;
  ScheduledJobReadModel?: Maybe<ScheduledJobReadModel>;
  ScheduledJobReadModels?: Maybe<ScheduledJobReadModel>;
  ViewReadModel?: Maybe<ViewReadModel>;
  ViewReadModels?: Maybe<ViewReadModel>;
};


export type SubscriptionAuthorReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionAuthorReadModelsArgs = {
  filter?: InputMaybe<AuthorReadModelSubscriptionFilter>;
};


export type SubscriptionBookReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionBookReadModelsArgs = {
  filter?: InputMaybe<BookReadModelSubscriptionFilter>;
};


export type SubscriptionCalendarEventReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionCalendarEventReadModelsArgs = {
  filter?: InputMaybe<CalendarEventReadModelSubscriptionFilter>;
};


export type SubscriptionCalendarGroupReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionCalendarGroupReadModelsArgs = {
  filter?: InputMaybe<CalendarGroupReadModelSubscriptionFilter>;
};


export type SubscriptionFileReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionFileReadModelsArgs = {
  filter?: InputMaybe<FileReadModelSubscriptionFilter>;
};


export type SubscriptionJobExecutionReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionJobExecutionReadModelsArgs = {
  filter?: InputMaybe<JobExecutionReadModelSubscriptionFilter>;
};


export type SubscriptionPublisherReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionPublisherReadModelsArgs = {
  filter?: InputMaybe<PublisherReadModelSubscriptionFilter>;
};


export type SubscriptionRecurringCalendarEventReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionRecurringCalendarEventReadModelsArgs = {
  filter?: InputMaybe<RecurringCalendarEventReadModelSubscriptionFilter>;
};


export type SubscriptionScheduledJobReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionScheduledJobReadModelsArgs = {
  filter?: InputMaybe<ScheduledJobReadModelSubscriptionFilter>;
};


export type SubscriptionViewReadModelArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionViewReadModelsArgs = {
  filter?: InputMaybe<ViewReadModelSubscriptionFilter>;
};

export type UuidArrayPropertyFilter = {
  includes?: InputMaybe<Scalars['ID']['input']>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UuidPropertyFilter = {
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateCalendarEventInput = {
  calendarEventId: Scalars['ID']['input'];
  calendarGroupId?: InputMaybe<Scalars['ID']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  endDateTime: Scalars['Date']['input'];
  startDateTime: Scalars['Date']['input'];
};

export type UpdateCalendarGroupInput = {
  calendarGroupId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateRecurringCalendarEventInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  durationInMinutes: Scalars['Float']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  every: Scalars['Float']['input'];
  frequency: RecurringCalendarEventFrequency;
  onWeekdays?: InputMaybe<Array<InputMaybe<CalendarWeekday>>>;
  recurringCalendarEventId: Scalars['ID']['input'];
  startDate: Scalars['Date']['input'];
  timezone: Scalars['String']['input'];
};

export type UpdateScheduledJobDataInput = {
  data: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateScheduledJobScheduleInput = {
  id: Scalars['ID']['input'];
  schedule: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  username: Scalars['String']['output'];
};

export type ViewReadModel = {
  __typename?: 'ViewReadModel';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pathname: Scalars['String']['output'];
  searchParams: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  userId: Scalars['String']['output'];
};

export type ViewReadModelConnection = {
  __typename?: 'ViewReadModelConnection';
  count: Scalars['Int']['output'];
  items: Array<ViewReadModel>;
};

export type ViewReadModelFilter = {
  and?: InputMaybe<Array<InputMaybe<ViewReadModelFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ViewReadModelFilter>;
  or?: InputMaybe<Array<InputMaybe<ViewReadModelFilter>>>;
  pathname?: InputMaybe<StringPropertyFilter>;
  searchParams?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
  userId?: InputMaybe<StringPropertyFilter>;
};

export type ViewReadModelSortBy = {
  createdAt?: InputMaybe<OrderProperty>;
  id?: InputMaybe<OrderProperty>;
  name?: InputMaybe<OrderProperty>;
  pathname?: InputMaybe<OrderProperty>;
  searchParams?: InputMaybe<OrderProperty>;
  updatedAt?: InputMaybe<OrderProperty>;
  userId?: InputMaybe<OrderProperty>;
};

export type ViewReadModelSubscriptionFilter = {
  and?: InputMaybe<Array<InputMaybe<ViewReadModelSubscriptionFilter>>>;
  createdAt?: InputMaybe<DatePropertyFilter>;
  id?: InputMaybe<UuidPropertyFilter>;
  isDefined?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringPropertyFilter>;
  not?: InputMaybe<ViewReadModelSubscriptionFilter>;
  or?: InputMaybe<Array<InputMaybe<ViewReadModelSubscriptionFilter>>>;
  pathname?: InputMaybe<StringPropertyFilter>;
  searchParams?: InputMaybe<StringPropertyFilter>;
  updatedAt?: InputMaybe<DatePropertyFilter>;
  userId?: InputMaybe<StringPropertyFilter>;
};

export enum OrderProperty {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type CancelJobMutationVariables = Exact<{
  input: CancelJobInput;
}>;


export type CancelJobMutation = { __typename?: 'Mutation', CancelJob: string };

export type JobExecutionReadModelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type JobExecutionReadModelQuery = { __typename?: 'Query', JobExecutionReadModel?: { __typename?: 'JobExecutionReadModel', id: string, name: string, startedAt?: Date | null, completedAt?: Date | null, status: JobExecutionStatus, totalItems?: number | null, successfulItems?: number | null, failedItems?: number | null, summary?: string | null, durationInSeconds?: number | null, estimatedSecondsRemaining?: number | null, progress: number, jobKey: JobKey, scheduledJobId?: string | null, data?: string | null, createdAt: Date, updatedAt: Date, messages: Array<{ __typename?: 'Message', message: string, timestamp: Date }> } | null };

export type JobExecutionReadModelSubscriptionSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type JobExecutionReadModelSubscriptionSubscription = { __typename?: 'Subscription', JobExecutionReadModel?: { __typename?: 'JobExecutionReadModel', id: string, name: string, startedAt?: Date | null, completedAt?: Date | null, status: JobExecutionStatus, totalItems?: number | null, successfulItems?: number | null, failedItems?: number | null, summary?: string | null, durationInSeconds?: number | null, progress: number, createdAt: Date, updatedAt: Date, messages: Array<{ __typename?: 'Message', message: string, timestamp: Date }> } | null };

export type ListJobExecutionReadModelsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ListJobExecutionReadModelFilter>;
  sort?: InputMaybe<JobExecutionReadModelSortBy>;
}>;


export type ListJobExecutionReadModelsQuery = { __typename?: 'Query', ListJobExecutionReadModels: { __typename?: 'JobExecutionReadModelConnection', count: number, items: Array<{ __typename?: 'JobExecutionReadModel', id: string, name: string, startedAt?: Date | null, completedAt?: Date | null, status: JobExecutionStatus, totalItems?: number | null, successfulItems?: number | null, failedItems?: number | null, summary?: string | null, durationInSeconds?: number | null, progress: number, jobKey: JobKey, scheduledJobId?: string | null, createdAt: Date, updatedAt: Date }> } };

export type ExecuteJobMutationVariables = Exact<{
  input: ExecuteJobInput;
}>;


export type ExecuteJobMutation = { __typename?: 'Mutation', ExecuteJob: string };

export type ActivateScheduledJobMutationVariables = Exact<{
  input: ActivateScheduledJobInput;
}>;


export type ActivateScheduledJobMutation = { __typename?: 'Mutation', ActivateScheduledJob: string };

export type DeactivateScheduledJobMutationVariables = Exact<{
  input: DeactivateScheduledJobInput;
}>;


export type DeactivateScheduledJobMutation = { __typename?: 'Mutation', DeactivateScheduledJob: string };

export type RemoveScheduledJobMutationVariables = Exact<{
  input: RemoveScheduledJobInput;
}>;


export type RemoveScheduledJobMutation = { __typename?: 'Mutation', RemoveScheduledJob: string };

export type UpdateScheduledJobDataMutationVariables = Exact<{
  input: UpdateScheduledJobDataInput;
}>;


export type UpdateScheduledJobDataMutation = { __typename?: 'Mutation', UpdateScheduledJobData: string };

export type UpdateScheduledJobScheduleMutationVariables = Exact<{
  input: UpdateScheduledJobScheduleInput;
}>;


export type UpdateScheduledJobScheduleMutation = { __typename?: 'Mutation', UpdateScheduledJobSchedule: string };

export type ScheduledJobReadModelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ScheduledJobReadModelQuery = { __typename?: 'Query', ScheduledJobReadModel?: { __typename?: 'ScheduledJobReadModel', id: string, name: string, schedule: string, jobKey: JobKey, active: boolean, data?: string | null, createdAt: Date, updatedAt: Date } | null };

export type ListScheduledJobReadModelsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ListScheduledJobReadModelFilter>;
  sort?: InputMaybe<ScheduledJobReadModelSortBy>;
}>;


export type ListScheduledJobReadModelsQuery = { __typename?: 'Query', ListScheduledJobReadModels: { __typename?: 'ScheduledJobReadModelConnection', count: number, items: Array<{ __typename?: 'ScheduledJobReadModel', id: string, name: string, schedule: string, jobKey: JobKey, active: boolean }> } };

export type CreateScheduledJobMutationVariables = Exact<{
  input: CreateScheduledJobInput;
}>;


export type CreateScheduledJobMutation = { __typename?: 'Mutation', CreateScheduledJob: string };

export type ChangeAuthorMutationVariables = Exact<{
  input: ChangeAuthorInput;
}>;


export type ChangeAuthorMutation = { __typename?: 'Mutation', ChangeAuthor: string };

export type AuthorReadModelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AuthorReadModelQuery = { __typename?: 'Query', AuthorReadModel?: { __typename?: 'AuthorReadModel', id: string, name: string, createdAt: Date, updatedAt: Date } | null };

export type ListBookReadModelsForAuthorQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ListBookReadModelFilter>;
  sort?: InputMaybe<BookReadModelSortBy>;
}>;


export type ListBookReadModelsForAuthorQuery = { __typename?: 'Query', ListBookReadModels: { __typename?: 'BookReadModelConnection', count: number, items: Array<{ __typename?: 'BookReadModel', id: string, title: string, publishDate: Date }> } };

export type ListAuthorReadModelsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ListAuthorReadModelFilter>;
  sort?: InputMaybe<AuthorReadModelSortBy>;
}>;


export type ListAuthorReadModelsQuery = { __typename?: 'Query', ListAuthorReadModels: { __typename?: 'AuthorReadModelConnection', count: number, items: Array<{ __typename?: 'AuthorReadModel', id: string, name: string, createdAt: Date, updatedAt: Date }> } };

export type AddAuthorMutationVariables = Exact<{
  input: AddAuthorInput;
}>;


export type AddAuthorMutation = { __typename?: 'Mutation', AddAuthor: string };

export type ChangeBookMutationVariables = Exact<{
  input: ChangeBookInput;
}>;


export type ChangeBookMutation = { __typename?: 'Mutation', ChangeBook: string };

export type BookReadModelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type BookReadModelQuery = { __typename?: 'Query', BookReadModel?: { __typename?: 'BookReadModel', id: string, title: string, description?: string | null, publishDate: Date, numberOfPages: number, availableAsEbook: boolean, coverType: BookCoverType, authorIds?: Array<string | null> | null, publisherId: string, createdAt: Date, updatedAt: Date } | null };

export type SyncBooksMutationVariables = Exact<{ [key: string]: never; }>;


export type SyncBooksMutation = { __typename?: 'Mutation', SyncBooks: string };

export type GetAuthorReadModelsQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type GetAuthorReadModelsQuery = { __typename?: 'Query', ListAuthorReadModels: { __typename?: 'AuthorReadModelConnection', count: number, items: Array<{ __typename?: 'AuthorReadModel', id: string, name: string }> } };

export type ListBookReadModelsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ListBookReadModelFilter>;
  sort?: InputMaybe<BookReadModelSortBy>;
}>;


export type ListBookReadModelsQuery = { __typename?: 'Query', ListBookReadModels: { __typename?: 'BookReadModelConnection', count: number, items: Array<{ __typename?: 'BookReadModel', id: string, title: string, publishDate: Date, authorNames?: Array<string | null> | null, publisherName: string }> } };

export type GetPublisherReadModelsQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type GetPublisherReadModelsQuery = { __typename?: 'Query', ListPublisherReadModels: { __typename?: 'PublisherReadModelConnection', count: number, items: Array<{ __typename?: 'PublisherReadModel', id: string, name: string }> } };

export type SearchAuthorReadModelsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type SearchAuthorReadModelsQuery = { __typename?: 'Query', ListAuthorReadModels: { __typename?: 'AuthorReadModelConnection', count: number, items: Array<{ __typename?: 'AuthorReadModel', id: string, name: string }> } };

export type SearchPublisherReadModelsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type SearchPublisherReadModelsQuery = { __typename?: 'Query', ListPublisherReadModels: { __typename?: 'PublisherReadModelConnection', count: number, items: Array<{ __typename?: 'PublisherReadModel', id: string, name: string }> } };

export type AddBookMutationVariables = Exact<{
  input: AddBookInput;
}>;


export type AddBookMutation = { __typename?: 'Mutation', AddBook: string };

export type DeleteCalendarGroupMutationVariables = Exact<{
  input: DeleteCalendarGroupInput;
}>;


export type DeleteCalendarGroupMutation = { __typename?: 'Mutation', DeleteCalendarGroup: string };

export type UpdateCalendarGroupMutationVariables = Exact<{
  input: UpdateCalendarGroupInput;
}>;


export type UpdateCalendarGroupMutation = { __typename?: 'Mutation', UpdateCalendarGroup: string };

export type GetCalendarGroupQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCalendarGroupQuery = { __typename?: 'Query', CalendarGroupReadModel?: { __typename?: 'CalendarGroupReadModel', id: string, name: string, color?: string | null, createdAt: Date, updatedAt: Date } | null };

export type GetCalendarGroupsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ListCalendarGroupReadModelFilter>;
  sort?: InputMaybe<CalendarGroupReadModelSortBy>;
}>;


export type GetCalendarGroupsQuery = { __typename?: 'Query', ListCalendarGroupReadModels: { __typename?: 'CalendarGroupReadModelConnection', count: number, items: Array<{ __typename?: 'CalendarGroupReadModel', id: string, name: string, color?: string | null }> } };

export type CreateCalendarGroupMutationVariables = Exact<{
  input: CreateCalendarGroupInput;
}>;


export type CreateCalendarGroupMutation = { __typename?: 'Mutation', CreateCalendarGroup: string };

export type ChangePublisherMutationVariables = Exact<{
  input: ChangePublisherInput;
}>;


export type ChangePublisherMutation = { __typename?: 'Mutation', ChangePublisher: string };

export type PublisherReadModelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PublisherReadModelQuery = { __typename?: 'Query', PublisherReadModel?: { __typename?: 'PublisherReadModel', id: string, name: string, createdAt: Date, updatedAt: Date, address?: { __typename?: 'Address', placeId: string } | null } | null };

export type ListPublisherReadModelsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ListPublisherReadModelFilter>;
  sort?: InputMaybe<PublisherReadModelSortBy>;
}>;


export type ListPublisherReadModelsQuery = { __typename?: 'Query', ListPublisherReadModels: { __typename?: 'PublisherReadModelConnection', count: number, items: Array<{ __typename?: 'PublisherReadModel', id: string, name: string, createdAt: Date, updatedAt: Date }> } };

export type AddPublisherMutationVariables = Exact<{
  input: AddPublisherInput;
}>;


export type AddPublisherMutation = { __typename?: 'Mutation', AddPublisher: string };

export type CreateFileMutationVariables = Exact<{
  input: CreateFileInput;
}>;


export type CreateFileMutation = { __typename?: 'Mutation', CreateFile: { __typename?: 'CreateSignedUrlForFileUploadReturnType', createdFileId: string, filename: string, signedUrl: string, contentType?: string | null } };

export type ListFileReadModelsQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type ListFileReadModelsQuery = { __typename?: 'Query', ListFileReadModels: { __typename?: 'FileReadModelConnection', items: Array<{ __typename?: 'FileReadModel', id: string, filename: string, contentType?: string | null, createdAt: Date, signedDownloadUrl: string, contentLength?: number | null }> } };

export type ListJobExecutionStatusQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ListJobExecutionReadModelFilter>;
  sort?: InputMaybe<JobExecutionReadModelSortBy>;
}>;


export type ListJobExecutionStatusQuery = { __typename?: 'Query', ListJobExecutionReadModels: { __typename?: 'JobExecutionReadModelConnection', count: number, items: Array<{ __typename?: 'JobExecutionReadModel', id: string, status: JobExecutionStatus }> } };

export type JobExecutionStatusSubscriptionSubscriptionVariables = Exact<{
  filter?: InputMaybe<JobExecutionReadModelSubscriptionFilter>;
}>;


export type JobExecutionStatusSubscriptionSubscription = { __typename?: 'Subscription', JobExecutionReadModels?: { __typename?: 'JobExecutionReadModel', id: string, status: JobExecutionStatus } | null };

export type GetEntityHistoryQueryVariables = Exact<{
  entityTypeName: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
}>;


export type GetEntityHistoryQuery = { __typename?: 'Query', GetEntityHistory: { __typename?: 'EntityHistory', entityTypeName: string, entityId: string, events: Array<{ __typename?: 'EntityHistoryEntry', type: string, date: Date, id?: string | null, value: any, diff?: any | null, user: { __typename?: 'EntityHistoryEntryUser', id?: string | null, email?: string | null } }> } };

export type GetAvailableCalendarGroupsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type GetAvailableCalendarGroupsQuery = { __typename?: 'Query', ListCalendarGroupReadModels: { __typename?: 'CalendarGroupReadModelConnection', count: number, items: Array<{ __typename?: 'CalendarGroupReadModel', id: string, name: string }> } };

export type GetCalendarGroupForComboBoxQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCalendarGroupForComboBoxQuery = { __typename?: 'Query', CalendarGroupReadModel?: { __typename?: 'CalendarGroupReadModel', id: string, name: string } | null };

export type GetCalendarGroupsForComboBoxQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type GetCalendarGroupsForComboBoxQuery = { __typename?: 'Query', ListCalendarGroupReadModels: { __typename?: 'CalendarGroupReadModelConnection', count: number, items: Array<{ __typename?: 'CalendarGroupReadModel', id: string, name: string }> } };

export type CreateCalendarEventMutationVariables = Exact<{
  input: CreateCalendarEventInput;
}>;


export type CreateCalendarEventMutation = { __typename?: 'Mutation', CreateCalendarEvent: string };

export type CreateRecurringCalendarEventMutationVariables = Exact<{
  input: CreateRecurringCalendarEventInput;
}>;


export type CreateRecurringCalendarEventMutation = { __typename?: 'Mutation', CreateRecurringCalendarEvent: string };

export type DeleteCalendarEventMutationVariables = Exact<{
  input: DeleteCalendarEventInput;
}>;


export type DeleteCalendarEventMutation = { __typename?: 'Mutation', DeleteCalendarEvent: string };

export type DeleteRecurringCalendarEventMutationVariables = Exact<{
  input: DeleteRecurringCalendarEventInput;
}>;


export type DeleteRecurringCalendarEventMutation = { __typename?: 'Mutation', DeleteRecurringCalendarEvent: string };

export type DeleteRecurringCalendarEventInstanceMutationVariables = Exact<{
  input: DeleteRecurringCalendarEventInstanceInput;
}>;


export type DeleteRecurringCalendarEventInstanceMutation = { __typename?: 'Mutation', DeleteRecurringCalendarEventInstance: string };

export type UpdateCalendarEventMutationVariables = Exact<{
  input: UpdateCalendarEventInput;
}>;


export type UpdateCalendarEventMutation = { __typename?: 'Mutation', UpdateCalendarEvent: string };

export type UpdateRecurringCalendarEventMutationVariables = Exact<{
  input: UpdateRecurringCalendarEventInput;
}>;


export type UpdateRecurringCalendarEventMutation = { __typename?: 'Mutation', UpdateRecurringCalendarEvent: string };

export type GetCalendarEventReadModelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCalendarEventReadModelQuery = { __typename?: 'Query', CalendarEventReadModel?: { __typename?: 'CalendarEventReadModel', id: string, calendarGroupId?: string | null, displayName: string, description?: string | null, startDateTime: Date, endDateTime: Date, color?: string | null, createdAt: Date, updatedAt: Date } | null };

export type GetCalendarEventsBetweenQueryVariables = Exact<{
  input: GetCalendarEventsBetweenInput;
}>;


export type GetCalendarEventsBetweenQuery = { __typename?: 'Query', GetCalendarEventsBetween: Array<{ __typename?: 'CalendarEventObject', id: string, isRecurringCalendarEvent: boolean, displayName: string, description?: string | null, startDateTime: Date, endDateTime: Date, color?: string | null, createdAt: Date, updatedAt: Date, recurringCalendarEventData?: { __typename?: 'RecurringCalendarEventData', id: string, timezone: string, rRuleSetString: string, durationInMinutes: number, frequency: RecurringCalendarEventFrequency, every: number, onWeekdays?: Array<CalendarWeekday | null> | null, startDate: Date, endDate?: Date | null, createdAt: Date, updatedAt: Date } | null }> };

export type GetRecurringCalendarEventReadModelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRecurringCalendarEventReadModelQuery = { __typename?: 'Query', RecurringCalendarEventReadModel?: { __typename?: 'RecurringCalendarEventReadModel', id: string, calendarGroupId?: string | null, timezone: string, displayName: string, description?: string | null, rRuleSetString: string, durationInMinutes: number, frequency: RecurringCalendarEventFrequency, every: number, onWeekdays?: Array<CalendarWeekday | null> | null, startDate: Date, endDate?: Date | null, color?: string | null, excludedDates: Array<Date>, createdAt: Date, updatedAt: Date } | null };

export type GetServiceVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServiceVersionQuery = { __typename?: 'Query', GetServiceVersion: { __typename?: 'ServiceVersionInfo', version: string } };

export type AddViewMutationVariables = Exact<{
  input: AddViewInput;
}>;


export type AddViewMutation = { __typename?: 'Mutation', AddView: string };

export type RemoveViewMutationVariables = Exact<{
  input: RemoveViewInput;
}>;


export type RemoveViewMutation = { __typename?: 'Mutation', RemoveView: string };

export type GetMyViewsForPathnameQueryVariables = Exact<{
  pathname: Scalars['String']['input'];
}>;


export type GetMyViewsForPathnameQuery = { __typename?: 'Query', GetMyViewsForPathname: Array<{ __typename?: 'ViewReadModel', id: string, name: string, pathname: string, searchParams: string }> };


export const CancelJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CancelJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CancelJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CancelJobMutation, CancelJobMutationVariables>;
export const JobExecutionReadModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobExecutionReadModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"JobExecutionReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"successfulItems"}},{"kind":"Field","name":{"kind":"Name","value":"failedItems"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"durationInSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedSecondsRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"jobKey"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledJobId"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<JobExecutionReadModelQuery, JobExecutionReadModelQueryVariables>;
export const JobExecutionReadModelSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"JobExecutionReadModelSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"JobExecutionReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"successfulItems"}},{"kind":"Field","name":{"kind":"Name","value":"failedItems"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"durationInSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<JobExecutionReadModelSubscriptionSubscription, JobExecutionReadModelSubscriptionSubscriptionVariables>;
export const ListJobExecutionReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListJobExecutionReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListJobExecutionReadModelFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobExecutionReadModelSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListJobExecutionReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterCursor"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"successfulItems"}},{"kind":"Field","name":{"kind":"Name","value":"failedItems"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"durationInSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"jobKey"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledJobId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListJobExecutionReadModelsQuery, ListJobExecutionReadModelsQueryVariables>;
export const ExecuteJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExecuteJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExecuteJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ExecuteJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ExecuteJobMutation, ExecuteJobMutationVariables>;
export const ActivateScheduledJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateScheduledJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivateScheduledJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ActivateScheduledJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ActivateScheduledJobMutation, ActivateScheduledJobMutationVariables>;
export const DeactivateScheduledJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeactivateScheduledJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeactivateScheduledJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeactivateScheduledJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeactivateScheduledJobMutation, DeactivateScheduledJobMutationVariables>;
export const RemoveScheduledJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveScheduledJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveScheduledJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"RemoveScheduledJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RemoveScheduledJobMutation, RemoveScheduledJobMutationVariables>;
export const UpdateScheduledJobDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScheduledJobData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateScheduledJobDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdateScheduledJobData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateScheduledJobDataMutation, UpdateScheduledJobDataMutationVariables>;
export const UpdateScheduledJobScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScheduledJobSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateScheduledJobScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdateScheduledJobSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateScheduledJobScheduleMutation, UpdateScheduledJobScheduleMutationVariables>;
export const ScheduledJobReadModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScheduledJobReadModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ScheduledJobReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"jobKey"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ScheduledJobReadModelQuery, ScheduledJobReadModelQueryVariables>;
export const ListScheduledJobReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListScheduledJobReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListScheduledJobReadModelFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduledJobReadModelSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListScheduledJobReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterCursor"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"jobKey"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]} as unknown as DocumentNode<ListScheduledJobReadModelsQuery, ListScheduledJobReadModelsQueryVariables>;
export const CreateScheduledJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScheduledJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScheduledJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateScheduledJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateScheduledJobMutation, CreateScheduledJobMutationVariables>;
export const ChangeAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeAuthorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChangeAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ChangeAuthorMutation, ChangeAuthorMutationVariables>;
export const AuthorReadModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthorReadModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AuthorReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AuthorReadModelQuery, AuthorReadModelQueryVariables>;
export const ListBookReadModelsForAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListBookReadModelsForAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListBookReadModelFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BookReadModelSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListBookReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterCursor"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"publishDate"}}]}}]}}]}}]} as unknown as DocumentNode<ListBookReadModelsForAuthorQuery, ListBookReadModelsForAuthorQueryVariables>;
export const ListAuthorReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListAuthorReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListAuthorReadModelFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorReadModelSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListAuthorReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterCursor"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListAuthorReadModelsQuery, ListAuthorReadModelsQueryVariables>;
export const AddAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddAuthorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddAuthorMutation, AddAuthorMutationVariables>;
export const ChangeBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeBookInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChangeBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ChangeBookMutation, ChangeBookMutationVariables>;
export const BookReadModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BookReadModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publishDate"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfPages"}},{"kind":"Field","name":{"kind":"Name","value":"availableAsEbook"}},{"kind":"Field","name":{"kind":"Name","value":"coverType"}},{"kind":"Field","name":{"kind":"Name","value":"authorIds"}},{"kind":"Field","name":{"kind":"Name","value":"publisherId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<BookReadModelQuery, BookReadModelQueryVariables>;
export const SyncBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SyncBooks"}}]}}]} as unknown as DocumentNode<SyncBooksMutation, SyncBooksMutationVariables>;
export const GetAuthorReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthorReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListAuthorReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAuthorReadModelsQuery, GetAuthorReadModelsQueryVariables>;
export const ListBookReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListBookReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListBookReadModelFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BookReadModelSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListBookReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterCursor"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"publishDate"}},{"kind":"Field","name":{"kind":"Name","value":"authorNames"}},{"kind":"Field","name":{"kind":"Name","value":"publisherName"}}]}}]}}]}}]} as unknown as DocumentNode<ListBookReadModelsQuery, ListBookReadModelsQueryVariables>;
export const GetPublisherReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublisherReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListPublisherReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetPublisherReadModelsQuery, GetPublisherReadModelsQueryVariables>;
export const SearchAuthorReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchAuthorReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListAuthorReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SearchAuthorReadModelsQuery, SearchAuthorReadModelsQueryVariables>;
export const SearchPublisherReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchPublisherReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListPublisherReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SearchPublisherReadModelsQuery, SearchPublisherReadModelsQueryVariables>;
export const AddBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddBookInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddBookMutation, AddBookMutationVariables>;
export const DeleteCalendarGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCalendarGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCalendarGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeleteCalendarGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteCalendarGroupMutation, DeleteCalendarGroupMutationVariables>;
export const UpdateCalendarGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCalendarGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCalendarGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdateCalendarGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateCalendarGroupMutation, UpdateCalendarGroupMutationVariables>;
export const GetCalendarGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCalendarGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CalendarGroupReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCalendarGroupQuery, GetCalendarGroupQueryVariables>;
export const GetCalendarGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCalendarGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListCalendarGroupReadModelFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CalendarGroupReadModelSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListCalendarGroupReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterCursor"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<GetCalendarGroupsQuery, GetCalendarGroupsQueryVariables>;
export const CreateCalendarGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCalendarGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCalendarGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateCalendarGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateCalendarGroupMutation, CreateCalendarGroupMutationVariables>;
export const ChangePublisherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePublisher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePublisherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ChangePublisher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ChangePublisherMutation, ChangePublisherMutationVariables>;
export const PublisherReadModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublisherReadModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PublisherReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PublisherReadModelQuery, PublisherReadModelQueryVariables>;
export const ListPublisherReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPublisherReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPublisherReadModelFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublisherReadModelSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListPublisherReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterCursor"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListPublisherReadModelsQuery, ListPublisherReadModelsQueryVariables>;
export const AddPublisherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPublisher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPublisherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddPublisher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddPublisherMutation, AddPublisherMutationVariables>;
export const CreateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdFileId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]}}]} as unknown as DocumentNode<CreateFileMutation, CreateFileMutationVariables>;
export const ListFileReadModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFileReadModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListFileReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"signedDownloadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"contentLength"}}]}}]}}]}}]} as unknown as DocumentNode<ListFileReadModelsQuery, ListFileReadModelsQueryVariables>;
export const ListJobExecutionStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListJobExecutionStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListJobExecutionReadModelFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobExecutionReadModelSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListJobExecutionReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterCursor"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<ListJobExecutionStatusQuery, ListJobExecutionStatusQueryVariables>;
export const JobExecutionStatusSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"JobExecutionStatusSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobExecutionReadModelSubscriptionFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"JobExecutionReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<JobExecutionStatusSubscriptionSubscription, JobExecutionStatusSubscriptionSubscriptionVariables>;
export const GetEntityHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEntityHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetEntityHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityTypeName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityTypeName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"entityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entityTypeName"}},{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"diff"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEntityHistoryQuery, GetEntityHistoryQueryVariables>;
export const GetAvailableCalendarGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAvailableCalendarGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListCalendarGroupReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetAvailableCalendarGroupsQuery, GetAvailableCalendarGroupsQueryVariables>;
export const GetCalendarGroupForComboBoxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCalendarGroupForComboBox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CalendarGroupReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCalendarGroupForComboBoxQuery, GetCalendarGroupForComboBoxQueryVariables>;
export const GetCalendarGroupsForComboBoxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCalendarGroupsForComboBox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListCalendarGroupReadModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetCalendarGroupsForComboBoxQuery, GetCalendarGroupsForComboBoxQueryVariables>;
export const CreateCalendarEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCalendarEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCalendarEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateCalendarEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateCalendarEventMutation, CreateCalendarEventMutationVariables>;
export const CreateRecurringCalendarEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRecurringCalendarEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRecurringCalendarEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateRecurringCalendarEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateRecurringCalendarEventMutation, CreateRecurringCalendarEventMutationVariables>;
export const DeleteCalendarEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCalendarEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCalendarEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeleteCalendarEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteCalendarEventMutation, DeleteCalendarEventMutationVariables>;
export const DeleteRecurringCalendarEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRecurringCalendarEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteRecurringCalendarEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeleteRecurringCalendarEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteRecurringCalendarEventMutation, DeleteRecurringCalendarEventMutationVariables>;
export const DeleteRecurringCalendarEventInstanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRecurringCalendarEventInstance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteRecurringCalendarEventInstanceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeleteRecurringCalendarEventInstance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteRecurringCalendarEventInstanceMutation, DeleteRecurringCalendarEventInstanceMutationVariables>;
export const UpdateCalendarEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCalendarEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCalendarEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdateCalendarEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateCalendarEventMutation, UpdateCalendarEventMutationVariables>;
export const UpdateRecurringCalendarEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecurringCalendarEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRecurringCalendarEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdateRecurringCalendarEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateRecurringCalendarEventMutation, UpdateRecurringCalendarEventMutationVariables>;
export const GetCalendarEventReadModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCalendarEventReadModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CalendarEventReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"calendarGroupId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCalendarEventReadModelQuery, GetCalendarEventReadModelQueryVariables>;
export const GetCalendarEventsBetweenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCalendarEventsBetween"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCalendarEventsBetweenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetCalendarEventsBetween"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isRecurringCalendarEvent"}},{"kind":"Field","name":{"kind":"Name","value":"recurringCalendarEventData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"rRuleSetString"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"every"}},{"kind":"Field","name":{"kind":"Name","value":"onWeekdays"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCalendarEventsBetweenQuery, GetCalendarEventsBetweenQueryVariables>;
export const GetRecurringCalendarEventReadModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecurringCalendarEventReadModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"RecurringCalendarEventReadModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"calendarGroupId"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rRuleSetString"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"every"}},{"kind":"Field","name":{"kind":"Name","value":"onWeekdays"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"excludedDates"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetRecurringCalendarEventReadModelQuery, GetRecurringCalendarEventReadModelQueryVariables>;
export const GetServiceVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getServiceVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetServiceVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<GetServiceVersionQuery, GetServiceVersionQueryVariables>;
export const AddViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddViewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddView"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddViewMutation, AddViewMutationVariables>;
export const RemoveViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveViewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"RemoveView"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RemoveViewMutation, RemoveViewMutationVariables>;
export const GetMyViewsForPathnameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyViewsForPathname"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pathname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetMyViewsForPathname"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pathname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pathname"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pathname"}},{"kind":"Field","name":{"kind":"Name","value":"searchParams"}}]}}]}}]} as unknown as DocumentNode<GetMyViewsForPathnameQuery, GetMyViewsForPathnameQueryVariables>;