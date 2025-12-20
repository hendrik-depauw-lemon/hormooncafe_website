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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation CancelJob($input: CancelJobInput!) {\n        CancelJob(input: $input)\n    }\n": typeof types.CancelJobDocument,
    "\n    query JobExecutionReadModel($id: ID!) {\n        JobExecutionReadModel(id: $id) {\n            id\n            name\n            startedAt\n            completedAt\n            status\n            totalItems\n            successfulItems\n            failedItems\n            summary\n            durationInSeconds\n            estimatedSecondsRemaining\n            progress\n            messages {\n                message\n                timestamp\n            }\n            jobKey\n            scheduledJobId\n            data\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.JobExecutionReadModelDocument,
    "\n    subscription JobExecutionReadModelSubscription($id: ID!) {\n        JobExecutionReadModel(id: $id) {\n            id\n            name\n            startedAt\n            completedAt\n            status\n            totalItems\n            successfulItems\n            failedItems\n            summary\n            durationInSeconds\n            progress\n            messages {\n                message\n                timestamp\n            }\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.JobExecutionReadModelSubscriptionDocument,
    "\n    query ListJobExecutionReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListJobExecutionReadModelFilter\n        $sort: JobExecutionReadModelSortBy\n    ) {\n        ListJobExecutionReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                startedAt\n                completedAt\n                status\n                totalItems\n                successfulItems\n                failedItems\n                summary\n                durationInSeconds\n                progress\n                jobKey\n                scheduledJobId\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": typeof types.ListJobExecutionReadModelsDocument,
    "\n    mutation ExecuteJob($input: ExecuteJobInput!) {\n        ExecuteJob(input: $input)\n    }\n": typeof types.ExecuteJobDocument,
    "\n    mutation ActivateScheduledJob($input: ActivateScheduledJobInput!) {\n        ActivateScheduledJob(input: $input)\n    }\n": typeof types.ActivateScheduledJobDocument,
    "\n    mutation DeactivateScheduledJob($input: DeactivateScheduledJobInput!) {\n        DeactivateScheduledJob(input: $input)\n    }\n": typeof types.DeactivateScheduledJobDocument,
    "\n    mutation RemoveScheduledJob($input: RemoveScheduledJobInput!) {\n        RemoveScheduledJob(input: $input)\n    }\n": typeof types.RemoveScheduledJobDocument,
    "\n    mutation UpdateScheduledJobData($input: UpdateScheduledJobDataInput!) {\n        UpdateScheduledJobData(input: $input)\n    }\n": typeof types.UpdateScheduledJobDataDocument,
    "\n    mutation UpdateScheduledJobSchedule($input: UpdateScheduledJobScheduleInput!) {\n        UpdateScheduledJobSchedule(input: $input)\n    }\n": typeof types.UpdateScheduledJobScheduleDocument,
    "\n    query ScheduledJobReadModel($id: ID!) {\n        ScheduledJobReadModel(id: $id) {\n            id\n            name\n            schedule\n            jobKey\n            active\n            data\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.ScheduledJobReadModelDocument,
    "\n    query ListScheduledJobReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListScheduledJobReadModelFilter\n        $sort: ScheduledJobReadModelSortBy\n    ) {\n        ListScheduledJobReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                schedule\n                jobKey\n                active\n            }\n        }\n    }\n": typeof types.ListScheduledJobReadModelsDocument,
    "\n    mutation CreateScheduledJob($input: CreateScheduledJobInput!) {\n        CreateScheduledJob(input: $input)\n    }\n": typeof types.CreateScheduledJobDocument,
    "\n    mutation ChangeAuthor($input: ChangeAuthorInput!) {\n        ChangeAuthor(input: $input)\n    }\n": typeof types.ChangeAuthorDocument,
    "\n    query AuthorReadModel($id: ID!) {\n        AuthorReadModel(id: $id) {\n            id\n            name\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.AuthorReadModelDocument,
    "\n    query ListBookReadModelsForAuthor(\n        $limit: Int\n        $skip: Int\n        $filter: ListBookReadModelFilter\n        $sort: BookReadModelSortBy\n    ) {\n        ListBookReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                title\n                publishDate\n            }\n        }\n    }\n": typeof types.ListBookReadModelsForAuthorDocument,
    "\n    query ListAuthorReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListAuthorReadModelFilter\n        $sort: AuthorReadModelSortBy\n    ) {\n        ListAuthorReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": typeof types.ListAuthorReadModelsDocument,
    "\n    mutation AddAuthor($input: AddAuthorInput!) {\n        AddAuthor(input: $input)\n    }\n": typeof types.AddAuthorDocument,
    "\n    mutation ChangeBook($input: ChangeBookInput!) {\n        ChangeBook(input: $input)\n    }\n": typeof types.ChangeBookDocument,
    "\n    query BookReadModel($id: ID!) {\n        BookReadModel(id: $id) {\n            id\n            title\n            description\n            publishDate\n            numberOfPages\n            availableAsEbook\n            coverType\n            authorIds\n            publisherId\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.BookReadModelDocument,
    "\n    mutation SyncBooks {\n        SyncBooks\n    }\n": typeof types.SyncBooksDocument,
    "\n    query GetAuthorReadModels($ids: [ID!]!) {\n        ListAuthorReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": typeof types.GetAuthorReadModelsDocument,
    "\n    query ListBookReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListBookReadModelFilter\n        $sort: BookReadModelSortBy\n    ) {\n        ListBookReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                title\n                publishDate\n                authorNames\n                publisherName\n            }\n        }\n    }\n": typeof types.ListBookReadModelsDocument,
    "\n    query GetPublisherReadModels($ids: [ID!]!) {\n        ListPublisherReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": typeof types.GetPublisherReadModelsDocument,
    "\n    query SearchAuthorReadModels($searchTerm: String!) {\n        ListAuthorReadModels(\n            limit: 20\n            filter: { name: { contains: $searchTerm } }\n            sortBy: { name: ASC }\n        ) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": typeof types.SearchAuthorReadModelsDocument,
    "\n    query SearchPublisherReadModels($searchTerm: String!) {\n        ListPublisherReadModels(\n            limit: 20\n            filter: { name: { contains: $searchTerm } }\n            sortBy: { name: ASC }\n        ) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": typeof types.SearchPublisherReadModelsDocument,
    "\n    mutation AddBook($input: AddBookInput!) {\n        AddBook(input: $input)\n    }\n": typeof types.AddBookDocument,
    "\n    mutation DeleteCalendarGroup($input: DeleteCalendarGroupInput!) {\n        DeleteCalendarGroup(input: $input)\n    }\n": typeof types.DeleteCalendarGroupDocument,
    "\n    mutation UpdateCalendarGroup($input: UpdateCalendarGroupInput!) {\n        UpdateCalendarGroup(input: $input)\n    }\n": typeof types.UpdateCalendarGroupDocument,
    "\n    query GetCalendarGroup($id: ID!) {\n        CalendarGroupReadModel(id: $id) {\n            id\n            name\n            color\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GetCalendarGroupDocument,
    "\n    query GetCalendarGroups(\n        $limit: Int\n        $skip: Int\n        $filter: ListCalendarGroupReadModelFilter\n        $sort: CalendarGroupReadModelSortBy\n    ) {\n        ListCalendarGroupReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                color\n            }\n        }\n    }\n": typeof types.GetCalendarGroupsDocument,
    "\n    mutation CreateCalendarGroup($input: CreateCalendarGroupInput!) {\n        CreateCalendarGroup(input: $input)\n    }\n": typeof types.CreateCalendarGroupDocument,
    "\n    mutation ChangePublisher($input: ChangePublisherInput!) {\n        ChangePublisher(input: $input)\n    }\n": typeof types.ChangePublisherDocument,
    "\n    query PublisherReadModel($id: ID!) {\n        PublisherReadModel(id: $id) {\n            id\n            name\n            address {\n                placeId\n            }\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.PublisherReadModelDocument,
    "\n    query ListPublisherReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListPublisherReadModelFilter\n        $sort: PublisherReadModelSortBy\n    ) {\n        ListPublisherReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": typeof types.ListPublisherReadModelsDocument,
    "\n    mutation AddPublisher($input: AddPublisherInput!) {\n        AddPublisher(input: $input)\n    }\n": typeof types.AddPublisherDocument,
    "\n    mutation CreateFile($input: CreateFileInput!) {\n        CreateFile(input: $input) {\n            createdFileId\n            filename\n            signedUrl\n            contentType\n        }\n    }\n": typeof types.CreateFileDocument,
    "\n    query ListFileReadModels($ids: [ID!]!) {\n        ListFileReadModels(filter: { id: { in: $ids } }) {\n            items {\n                id\n                filename\n                contentType\n                createdAt\n                signedDownloadUrl\n                contentLength\n            }\n        }\n    }\n": typeof types.ListFileReadModelsDocument,
    "\n    query ListJobExecutionStatus(\n        $limit: Int\n        $skip: Int\n        $filter: ListJobExecutionReadModelFilter\n        $sort: JobExecutionReadModelSortBy\n    ) {\n        ListJobExecutionReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                status\n            }\n        }\n    }\n": typeof types.ListJobExecutionStatusDocument,
    "\n    subscription JobExecutionStatusSubscription($filter: JobExecutionReadModelSubscriptionFilter) {\n        JobExecutionReadModels(filter: $filter) {\n            id\n            status\n        }\n    }\n": typeof types.JobExecutionStatusSubscriptionDocument,
    "\n    query GetEntityHistory($entityTypeName: String!, $entityId: String!) {\n        GetEntityHistory(input: { entityTypeName: $entityTypeName, entityId: $entityId }) {\n            entityTypeName\n            entityId\n            events {\n                type\n                date\n                id\n                value\n                diff\n                user {\n                    id\n                    email\n                }\n            }\n        }\n    }\n": typeof types.GetEntityHistoryDocument,
    "\n    query GetAvailableCalendarGroups($searchTerm: String!) {\n        ListCalendarGroupReadModels(\n            limit: 20\n            filter: { or: [{ name: { contains: $searchTerm } }] }\n            sortBy: { name: ASC }\n        ) {\n            items {\n                id\n                name\n            }\n            count\n        }\n    }\n": typeof types.GetAvailableCalendarGroupsDocument,
    "\n    query GetCalendarGroupForComboBox($id: ID!) {\n        CalendarGroupReadModel(id: $id) {\n            id\n            name\n        }\n    }\n": typeof types.GetCalendarGroupForComboBoxDocument,
    "\n    query GetCalendarGroupsForComboBox($ids: [ID!]!) {\n        ListCalendarGroupReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": typeof types.GetCalendarGroupsForComboBoxDocument,
    "\n    mutation CreateCalendarEvent($input: CreateCalendarEventInput!) {\n        CreateCalendarEvent(input: $input)\n    }\n": typeof types.CreateCalendarEventDocument,
    "\n    mutation CreateRecurringCalendarEvent($input: CreateRecurringCalendarEventInput!) {\n        CreateRecurringCalendarEvent(input: $input)\n    }\n": typeof types.CreateRecurringCalendarEventDocument,
    "\n    mutation DeleteCalendarEvent($input: DeleteCalendarEventInput!) {\n        DeleteCalendarEvent(input: $input)\n    }\n": typeof types.DeleteCalendarEventDocument,
    "\n    mutation DeleteRecurringCalendarEvent($input: DeleteRecurringCalendarEventInput!) {\n        DeleteRecurringCalendarEvent(input: $input)\n    }\n": typeof types.DeleteRecurringCalendarEventDocument,
    "\n    mutation DeleteRecurringCalendarEventInstance(\n        $input: DeleteRecurringCalendarEventInstanceInput!\n    ) {\n        DeleteRecurringCalendarEventInstance(input: $input)\n    }\n": typeof types.DeleteRecurringCalendarEventInstanceDocument,
    "\n    mutation UpdateCalendarEvent($input: UpdateCalendarEventInput!) {\n        UpdateCalendarEvent(input: $input)\n    }\n": typeof types.UpdateCalendarEventDocument,
    "\n    mutation UpdateRecurringCalendarEvent($input: UpdateRecurringCalendarEventInput!) {\n        UpdateRecurringCalendarEvent(input: $input)\n    }\n": typeof types.UpdateRecurringCalendarEventDocument,
    "\n    query GetCalendarEventReadModel($id: ID!) {\n        CalendarEventReadModel(id: $id) {\n            id\n            calendarGroupId\n            displayName\n            description\n            startDateTime\n            endDateTime\n            color\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GetCalendarEventReadModelDocument,
    "\n    query GetCalendarEventsBetween($input: GetCalendarEventsBetweenInput!) {\n        GetCalendarEventsBetween(input: $input) {\n            id\n            isRecurringCalendarEvent\n            recurringCalendarEventData {\n                id\n                timezone\n                rRuleSetString\n                durationInMinutes\n                frequency\n                every\n                onWeekdays\n                startDate\n                endDate\n                createdAt\n                updatedAt\n            }\n            displayName\n            description\n            startDateTime\n            endDateTime\n            color\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GetCalendarEventsBetweenDocument,
    "\n    query GetRecurringCalendarEventReadModel($id: ID!) {\n        RecurringCalendarEventReadModel(id: $id) {\n            id\n            calendarGroupId\n            timezone\n            displayName\n            description\n            rRuleSetString\n            durationInMinutes\n            frequency\n            every\n            onWeekdays\n            startDate\n            endDate\n            color\n            excludedDates\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GetRecurringCalendarEventReadModelDocument,
    "\n    query getServiceVersion {\n        GetServiceVersion {\n            version\n        }\n    }\n": typeof types.GetServiceVersionDocument,
    "\n    mutation AddView($input: AddViewInput!) {\n        AddView(input: $input)\n    }\n": typeof types.AddViewDocument,
    "\n    mutation RemoveView($input: RemoveViewInput!) {\n        RemoveView(input: $input)\n    }\n": typeof types.RemoveViewDocument,
    "\n    query GetMyViewsForPathname($pathname: String!) {\n        GetMyViewsForPathname(input: { pathname: $pathname }) {\n            id\n            name\n            pathname\n            searchParams\n        }\n    }\n": typeof types.GetMyViewsForPathnameDocument,
};
const documents: Documents = {
    "\n    mutation CancelJob($input: CancelJobInput!) {\n        CancelJob(input: $input)\n    }\n": types.CancelJobDocument,
    "\n    query JobExecutionReadModel($id: ID!) {\n        JobExecutionReadModel(id: $id) {\n            id\n            name\n            startedAt\n            completedAt\n            status\n            totalItems\n            successfulItems\n            failedItems\n            summary\n            durationInSeconds\n            estimatedSecondsRemaining\n            progress\n            messages {\n                message\n                timestamp\n            }\n            jobKey\n            scheduledJobId\n            data\n            createdAt\n            updatedAt\n        }\n    }\n": types.JobExecutionReadModelDocument,
    "\n    subscription JobExecutionReadModelSubscription($id: ID!) {\n        JobExecutionReadModel(id: $id) {\n            id\n            name\n            startedAt\n            completedAt\n            status\n            totalItems\n            successfulItems\n            failedItems\n            summary\n            durationInSeconds\n            progress\n            messages {\n                message\n                timestamp\n            }\n            createdAt\n            updatedAt\n        }\n    }\n": types.JobExecutionReadModelSubscriptionDocument,
    "\n    query ListJobExecutionReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListJobExecutionReadModelFilter\n        $sort: JobExecutionReadModelSortBy\n    ) {\n        ListJobExecutionReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                startedAt\n                completedAt\n                status\n                totalItems\n                successfulItems\n                failedItems\n                summary\n                durationInSeconds\n                progress\n                jobKey\n                scheduledJobId\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": types.ListJobExecutionReadModelsDocument,
    "\n    mutation ExecuteJob($input: ExecuteJobInput!) {\n        ExecuteJob(input: $input)\n    }\n": types.ExecuteJobDocument,
    "\n    mutation ActivateScheduledJob($input: ActivateScheduledJobInput!) {\n        ActivateScheduledJob(input: $input)\n    }\n": types.ActivateScheduledJobDocument,
    "\n    mutation DeactivateScheduledJob($input: DeactivateScheduledJobInput!) {\n        DeactivateScheduledJob(input: $input)\n    }\n": types.DeactivateScheduledJobDocument,
    "\n    mutation RemoveScheduledJob($input: RemoveScheduledJobInput!) {\n        RemoveScheduledJob(input: $input)\n    }\n": types.RemoveScheduledJobDocument,
    "\n    mutation UpdateScheduledJobData($input: UpdateScheduledJobDataInput!) {\n        UpdateScheduledJobData(input: $input)\n    }\n": types.UpdateScheduledJobDataDocument,
    "\n    mutation UpdateScheduledJobSchedule($input: UpdateScheduledJobScheduleInput!) {\n        UpdateScheduledJobSchedule(input: $input)\n    }\n": types.UpdateScheduledJobScheduleDocument,
    "\n    query ScheduledJobReadModel($id: ID!) {\n        ScheduledJobReadModel(id: $id) {\n            id\n            name\n            schedule\n            jobKey\n            active\n            data\n            createdAt\n            updatedAt\n        }\n    }\n": types.ScheduledJobReadModelDocument,
    "\n    query ListScheduledJobReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListScheduledJobReadModelFilter\n        $sort: ScheduledJobReadModelSortBy\n    ) {\n        ListScheduledJobReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                schedule\n                jobKey\n                active\n            }\n        }\n    }\n": types.ListScheduledJobReadModelsDocument,
    "\n    mutation CreateScheduledJob($input: CreateScheduledJobInput!) {\n        CreateScheduledJob(input: $input)\n    }\n": types.CreateScheduledJobDocument,
    "\n    mutation ChangeAuthor($input: ChangeAuthorInput!) {\n        ChangeAuthor(input: $input)\n    }\n": types.ChangeAuthorDocument,
    "\n    query AuthorReadModel($id: ID!) {\n        AuthorReadModel(id: $id) {\n            id\n            name\n            createdAt\n            updatedAt\n        }\n    }\n": types.AuthorReadModelDocument,
    "\n    query ListBookReadModelsForAuthor(\n        $limit: Int\n        $skip: Int\n        $filter: ListBookReadModelFilter\n        $sort: BookReadModelSortBy\n    ) {\n        ListBookReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                title\n                publishDate\n            }\n        }\n    }\n": types.ListBookReadModelsForAuthorDocument,
    "\n    query ListAuthorReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListAuthorReadModelFilter\n        $sort: AuthorReadModelSortBy\n    ) {\n        ListAuthorReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": types.ListAuthorReadModelsDocument,
    "\n    mutation AddAuthor($input: AddAuthorInput!) {\n        AddAuthor(input: $input)\n    }\n": types.AddAuthorDocument,
    "\n    mutation ChangeBook($input: ChangeBookInput!) {\n        ChangeBook(input: $input)\n    }\n": types.ChangeBookDocument,
    "\n    query BookReadModel($id: ID!) {\n        BookReadModel(id: $id) {\n            id\n            title\n            description\n            publishDate\n            numberOfPages\n            availableAsEbook\n            coverType\n            authorIds\n            publisherId\n            createdAt\n            updatedAt\n        }\n    }\n": types.BookReadModelDocument,
    "\n    mutation SyncBooks {\n        SyncBooks\n    }\n": types.SyncBooksDocument,
    "\n    query GetAuthorReadModels($ids: [ID!]!) {\n        ListAuthorReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": types.GetAuthorReadModelsDocument,
    "\n    query ListBookReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListBookReadModelFilter\n        $sort: BookReadModelSortBy\n    ) {\n        ListBookReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                title\n                publishDate\n                authorNames\n                publisherName\n            }\n        }\n    }\n": types.ListBookReadModelsDocument,
    "\n    query GetPublisherReadModels($ids: [ID!]!) {\n        ListPublisherReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": types.GetPublisherReadModelsDocument,
    "\n    query SearchAuthorReadModels($searchTerm: String!) {\n        ListAuthorReadModels(\n            limit: 20\n            filter: { name: { contains: $searchTerm } }\n            sortBy: { name: ASC }\n        ) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": types.SearchAuthorReadModelsDocument,
    "\n    query SearchPublisherReadModels($searchTerm: String!) {\n        ListPublisherReadModels(\n            limit: 20\n            filter: { name: { contains: $searchTerm } }\n            sortBy: { name: ASC }\n        ) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": types.SearchPublisherReadModelsDocument,
    "\n    mutation AddBook($input: AddBookInput!) {\n        AddBook(input: $input)\n    }\n": types.AddBookDocument,
    "\n    mutation DeleteCalendarGroup($input: DeleteCalendarGroupInput!) {\n        DeleteCalendarGroup(input: $input)\n    }\n": types.DeleteCalendarGroupDocument,
    "\n    mutation UpdateCalendarGroup($input: UpdateCalendarGroupInput!) {\n        UpdateCalendarGroup(input: $input)\n    }\n": types.UpdateCalendarGroupDocument,
    "\n    query GetCalendarGroup($id: ID!) {\n        CalendarGroupReadModel(id: $id) {\n            id\n            name\n            color\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetCalendarGroupDocument,
    "\n    query GetCalendarGroups(\n        $limit: Int\n        $skip: Int\n        $filter: ListCalendarGroupReadModelFilter\n        $sort: CalendarGroupReadModelSortBy\n    ) {\n        ListCalendarGroupReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                color\n            }\n        }\n    }\n": types.GetCalendarGroupsDocument,
    "\n    mutation CreateCalendarGroup($input: CreateCalendarGroupInput!) {\n        CreateCalendarGroup(input: $input)\n    }\n": types.CreateCalendarGroupDocument,
    "\n    mutation ChangePublisher($input: ChangePublisherInput!) {\n        ChangePublisher(input: $input)\n    }\n": types.ChangePublisherDocument,
    "\n    query PublisherReadModel($id: ID!) {\n        PublisherReadModel(id: $id) {\n            id\n            name\n            address {\n                placeId\n            }\n            createdAt\n            updatedAt\n        }\n    }\n": types.PublisherReadModelDocument,
    "\n    query ListPublisherReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListPublisherReadModelFilter\n        $sort: PublisherReadModelSortBy\n    ) {\n        ListPublisherReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": types.ListPublisherReadModelsDocument,
    "\n    mutation AddPublisher($input: AddPublisherInput!) {\n        AddPublisher(input: $input)\n    }\n": types.AddPublisherDocument,
    "\n    mutation CreateFile($input: CreateFileInput!) {\n        CreateFile(input: $input) {\n            createdFileId\n            filename\n            signedUrl\n            contentType\n        }\n    }\n": types.CreateFileDocument,
    "\n    query ListFileReadModels($ids: [ID!]!) {\n        ListFileReadModels(filter: { id: { in: $ids } }) {\n            items {\n                id\n                filename\n                contentType\n                createdAt\n                signedDownloadUrl\n                contentLength\n            }\n        }\n    }\n": types.ListFileReadModelsDocument,
    "\n    query ListJobExecutionStatus(\n        $limit: Int\n        $skip: Int\n        $filter: ListJobExecutionReadModelFilter\n        $sort: JobExecutionReadModelSortBy\n    ) {\n        ListJobExecutionReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                status\n            }\n        }\n    }\n": types.ListJobExecutionStatusDocument,
    "\n    subscription JobExecutionStatusSubscription($filter: JobExecutionReadModelSubscriptionFilter) {\n        JobExecutionReadModels(filter: $filter) {\n            id\n            status\n        }\n    }\n": types.JobExecutionStatusSubscriptionDocument,
    "\n    query GetEntityHistory($entityTypeName: String!, $entityId: String!) {\n        GetEntityHistory(input: { entityTypeName: $entityTypeName, entityId: $entityId }) {\n            entityTypeName\n            entityId\n            events {\n                type\n                date\n                id\n                value\n                diff\n                user {\n                    id\n                    email\n                }\n            }\n        }\n    }\n": types.GetEntityHistoryDocument,
    "\n    query GetAvailableCalendarGroups($searchTerm: String!) {\n        ListCalendarGroupReadModels(\n            limit: 20\n            filter: { or: [{ name: { contains: $searchTerm } }] }\n            sortBy: { name: ASC }\n        ) {\n            items {\n                id\n                name\n            }\n            count\n        }\n    }\n": types.GetAvailableCalendarGroupsDocument,
    "\n    query GetCalendarGroupForComboBox($id: ID!) {\n        CalendarGroupReadModel(id: $id) {\n            id\n            name\n        }\n    }\n": types.GetCalendarGroupForComboBoxDocument,
    "\n    query GetCalendarGroupsForComboBox($ids: [ID!]!) {\n        ListCalendarGroupReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n": types.GetCalendarGroupsForComboBoxDocument,
    "\n    mutation CreateCalendarEvent($input: CreateCalendarEventInput!) {\n        CreateCalendarEvent(input: $input)\n    }\n": types.CreateCalendarEventDocument,
    "\n    mutation CreateRecurringCalendarEvent($input: CreateRecurringCalendarEventInput!) {\n        CreateRecurringCalendarEvent(input: $input)\n    }\n": types.CreateRecurringCalendarEventDocument,
    "\n    mutation DeleteCalendarEvent($input: DeleteCalendarEventInput!) {\n        DeleteCalendarEvent(input: $input)\n    }\n": types.DeleteCalendarEventDocument,
    "\n    mutation DeleteRecurringCalendarEvent($input: DeleteRecurringCalendarEventInput!) {\n        DeleteRecurringCalendarEvent(input: $input)\n    }\n": types.DeleteRecurringCalendarEventDocument,
    "\n    mutation DeleteRecurringCalendarEventInstance(\n        $input: DeleteRecurringCalendarEventInstanceInput!\n    ) {\n        DeleteRecurringCalendarEventInstance(input: $input)\n    }\n": types.DeleteRecurringCalendarEventInstanceDocument,
    "\n    mutation UpdateCalendarEvent($input: UpdateCalendarEventInput!) {\n        UpdateCalendarEvent(input: $input)\n    }\n": types.UpdateCalendarEventDocument,
    "\n    mutation UpdateRecurringCalendarEvent($input: UpdateRecurringCalendarEventInput!) {\n        UpdateRecurringCalendarEvent(input: $input)\n    }\n": types.UpdateRecurringCalendarEventDocument,
    "\n    query GetCalendarEventReadModel($id: ID!) {\n        CalendarEventReadModel(id: $id) {\n            id\n            calendarGroupId\n            displayName\n            description\n            startDateTime\n            endDateTime\n            color\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetCalendarEventReadModelDocument,
    "\n    query GetCalendarEventsBetween($input: GetCalendarEventsBetweenInput!) {\n        GetCalendarEventsBetween(input: $input) {\n            id\n            isRecurringCalendarEvent\n            recurringCalendarEventData {\n                id\n                timezone\n                rRuleSetString\n                durationInMinutes\n                frequency\n                every\n                onWeekdays\n                startDate\n                endDate\n                createdAt\n                updatedAt\n            }\n            displayName\n            description\n            startDateTime\n            endDateTime\n            color\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetCalendarEventsBetweenDocument,
    "\n    query GetRecurringCalendarEventReadModel($id: ID!) {\n        RecurringCalendarEventReadModel(id: $id) {\n            id\n            calendarGroupId\n            timezone\n            displayName\n            description\n            rRuleSetString\n            durationInMinutes\n            frequency\n            every\n            onWeekdays\n            startDate\n            endDate\n            color\n            excludedDates\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetRecurringCalendarEventReadModelDocument,
    "\n    query getServiceVersion {\n        GetServiceVersion {\n            version\n        }\n    }\n": types.GetServiceVersionDocument,
    "\n    mutation AddView($input: AddViewInput!) {\n        AddView(input: $input)\n    }\n": types.AddViewDocument,
    "\n    mutation RemoveView($input: RemoveViewInput!) {\n        RemoveView(input: $input)\n    }\n": types.RemoveViewDocument,
    "\n    query GetMyViewsForPathname($pathname: String!) {\n        GetMyViewsForPathname(input: { pathname: $pathname }) {\n            id\n            name\n            pathname\n            searchParams\n        }\n    }\n": types.GetMyViewsForPathnameDocument,
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
export function graphql(source: "\n    mutation CancelJob($input: CancelJobInput!) {\n        CancelJob(input: $input)\n    }\n"): (typeof documents)["\n    mutation CancelJob($input: CancelJobInput!) {\n        CancelJob(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query JobExecutionReadModel($id: ID!) {\n        JobExecutionReadModel(id: $id) {\n            id\n            name\n            startedAt\n            completedAt\n            status\n            totalItems\n            successfulItems\n            failedItems\n            summary\n            durationInSeconds\n            estimatedSecondsRemaining\n            progress\n            messages {\n                message\n                timestamp\n            }\n            jobKey\n            scheduledJobId\n            data\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query JobExecutionReadModel($id: ID!) {\n        JobExecutionReadModel(id: $id) {\n            id\n            name\n            startedAt\n            completedAt\n            status\n            totalItems\n            successfulItems\n            failedItems\n            summary\n            durationInSeconds\n            estimatedSecondsRemaining\n            progress\n            messages {\n                message\n                timestamp\n            }\n            jobKey\n            scheduledJobId\n            data\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription JobExecutionReadModelSubscription($id: ID!) {\n        JobExecutionReadModel(id: $id) {\n            id\n            name\n            startedAt\n            completedAt\n            status\n            totalItems\n            successfulItems\n            failedItems\n            summary\n            durationInSeconds\n            progress\n            messages {\n                message\n                timestamp\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    subscription JobExecutionReadModelSubscription($id: ID!) {\n        JobExecutionReadModel(id: $id) {\n            id\n            name\n            startedAt\n            completedAt\n            status\n            totalItems\n            successfulItems\n            failedItems\n            summary\n            durationInSeconds\n            progress\n            messages {\n                message\n                timestamp\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ListJobExecutionReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListJobExecutionReadModelFilter\n        $sort: JobExecutionReadModelSortBy\n    ) {\n        ListJobExecutionReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                startedAt\n                completedAt\n                status\n                totalItems\n                successfulItems\n                failedItems\n                summary\n                durationInSeconds\n                progress\n                jobKey\n                scheduledJobId\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"): (typeof documents)["\n    query ListJobExecutionReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListJobExecutionReadModelFilter\n        $sort: JobExecutionReadModelSortBy\n    ) {\n        ListJobExecutionReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                startedAt\n                completedAt\n                status\n                totalItems\n                successfulItems\n                failedItems\n                summary\n                durationInSeconds\n                progress\n                jobKey\n                scheduledJobId\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ExecuteJob($input: ExecuteJobInput!) {\n        ExecuteJob(input: $input)\n    }\n"): (typeof documents)["\n    mutation ExecuteJob($input: ExecuteJobInput!) {\n        ExecuteJob(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ActivateScheduledJob($input: ActivateScheduledJobInput!) {\n        ActivateScheduledJob(input: $input)\n    }\n"): (typeof documents)["\n    mutation ActivateScheduledJob($input: ActivateScheduledJobInput!) {\n        ActivateScheduledJob(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeactivateScheduledJob($input: DeactivateScheduledJobInput!) {\n        DeactivateScheduledJob(input: $input)\n    }\n"): (typeof documents)["\n    mutation DeactivateScheduledJob($input: DeactivateScheduledJobInput!) {\n        DeactivateScheduledJob(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveScheduledJob($input: RemoveScheduledJobInput!) {\n        RemoveScheduledJob(input: $input)\n    }\n"): (typeof documents)["\n    mutation RemoveScheduledJob($input: RemoveScheduledJobInput!) {\n        RemoveScheduledJob(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateScheduledJobData($input: UpdateScheduledJobDataInput!) {\n        UpdateScheduledJobData(input: $input)\n    }\n"): (typeof documents)["\n    mutation UpdateScheduledJobData($input: UpdateScheduledJobDataInput!) {\n        UpdateScheduledJobData(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateScheduledJobSchedule($input: UpdateScheduledJobScheduleInput!) {\n        UpdateScheduledJobSchedule(input: $input)\n    }\n"): (typeof documents)["\n    mutation UpdateScheduledJobSchedule($input: UpdateScheduledJobScheduleInput!) {\n        UpdateScheduledJobSchedule(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ScheduledJobReadModel($id: ID!) {\n        ScheduledJobReadModel(id: $id) {\n            id\n            name\n            schedule\n            jobKey\n            active\n            data\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query ScheduledJobReadModel($id: ID!) {\n        ScheduledJobReadModel(id: $id) {\n            id\n            name\n            schedule\n            jobKey\n            active\n            data\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ListScheduledJobReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListScheduledJobReadModelFilter\n        $sort: ScheduledJobReadModelSortBy\n    ) {\n        ListScheduledJobReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                schedule\n                jobKey\n                active\n            }\n        }\n    }\n"): (typeof documents)["\n    query ListScheduledJobReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListScheduledJobReadModelFilter\n        $sort: ScheduledJobReadModelSortBy\n    ) {\n        ListScheduledJobReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                schedule\n                jobKey\n                active\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateScheduledJob($input: CreateScheduledJobInput!) {\n        CreateScheduledJob(input: $input)\n    }\n"): (typeof documents)["\n    mutation CreateScheduledJob($input: CreateScheduledJobInput!) {\n        CreateScheduledJob(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ChangeAuthor($input: ChangeAuthorInput!) {\n        ChangeAuthor(input: $input)\n    }\n"): (typeof documents)["\n    mutation ChangeAuthor($input: ChangeAuthorInput!) {\n        ChangeAuthor(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query AuthorReadModel($id: ID!) {\n        AuthorReadModel(id: $id) {\n            id\n            name\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query AuthorReadModel($id: ID!) {\n        AuthorReadModel(id: $id) {\n            id\n            name\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ListBookReadModelsForAuthor(\n        $limit: Int\n        $skip: Int\n        $filter: ListBookReadModelFilter\n        $sort: BookReadModelSortBy\n    ) {\n        ListBookReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                title\n                publishDate\n            }\n        }\n    }\n"): (typeof documents)["\n    query ListBookReadModelsForAuthor(\n        $limit: Int\n        $skip: Int\n        $filter: ListBookReadModelFilter\n        $sort: BookReadModelSortBy\n    ) {\n        ListBookReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                title\n                publishDate\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ListAuthorReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListAuthorReadModelFilter\n        $sort: AuthorReadModelSortBy\n    ) {\n        ListAuthorReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"): (typeof documents)["\n    query ListAuthorReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListAuthorReadModelFilter\n        $sort: AuthorReadModelSortBy\n    ) {\n        ListAuthorReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddAuthor($input: AddAuthorInput!) {\n        AddAuthor(input: $input)\n    }\n"): (typeof documents)["\n    mutation AddAuthor($input: AddAuthorInput!) {\n        AddAuthor(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ChangeBook($input: ChangeBookInput!) {\n        ChangeBook(input: $input)\n    }\n"): (typeof documents)["\n    mutation ChangeBook($input: ChangeBookInput!) {\n        ChangeBook(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query BookReadModel($id: ID!) {\n        BookReadModel(id: $id) {\n            id\n            title\n            description\n            publishDate\n            numberOfPages\n            availableAsEbook\n            coverType\n            authorIds\n            publisherId\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query BookReadModel($id: ID!) {\n        BookReadModel(id: $id) {\n            id\n            title\n            description\n            publishDate\n            numberOfPages\n            availableAsEbook\n            coverType\n            authorIds\n            publisherId\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SyncBooks {\n        SyncBooks\n    }\n"): (typeof documents)["\n    mutation SyncBooks {\n        SyncBooks\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAuthorReadModels($ids: [ID!]!) {\n        ListAuthorReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetAuthorReadModels($ids: [ID!]!) {\n        ListAuthorReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ListBookReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListBookReadModelFilter\n        $sort: BookReadModelSortBy\n    ) {\n        ListBookReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                title\n                publishDate\n                authorNames\n                publisherName\n            }\n        }\n    }\n"): (typeof documents)["\n    query ListBookReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListBookReadModelFilter\n        $sort: BookReadModelSortBy\n    ) {\n        ListBookReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                title\n                publishDate\n                authorNames\n                publisherName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetPublisherReadModels($ids: [ID!]!) {\n        ListPublisherReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetPublisherReadModels($ids: [ID!]!) {\n        ListPublisherReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query SearchAuthorReadModels($searchTerm: String!) {\n        ListAuthorReadModels(\n            limit: 20\n            filter: { name: { contains: $searchTerm } }\n            sortBy: { name: ASC }\n        ) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query SearchAuthorReadModels($searchTerm: String!) {\n        ListAuthorReadModels(\n            limit: 20\n            filter: { name: { contains: $searchTerm } }\n            sortBy: { name: ASC }\n        ) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query SearchPublisherReadModels($searchTerm: String!) {\n        ListPublisherReadModels(\n            limit: 20\n            filter: { name: { contains: $searchTerm } }\n            sortBy: { name: ASC }\n        ) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query SearchPublisherReadModels($searchTerm: String!) {\n        ListPublisherReadModels(\n            limit: 20\n            filter: { name: { contains: $searchTerm } }\n            sortBy: { name: ASC }\n        ) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddBook($input: AddBookInput!) {\n        AddBook(input: $input)\n    }\n"): (typeof documents)["\n    mutation AddBook($input: AddBookInput!) {\n        AddBook(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteCalendarGroup($input: DeleteCalendarGroupInput!) {\n        DeleteCalendarGroup(input: $input)\n    }\n"): (typeof documents)["\n    mutation DeleteCalendarGroup($input: DeleteCalendarGroupInput!) {\n        DeleteCalendarGroup(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateCalendarGroup($input: UpdateCalendarGroupInput!) {\n        UpdateCalendarGroup(input: $input)\n    }\n"): (typeof documents)["\n    mutation UpdateCalendarGroup($input: UpdateCalendarGroupInput!) {\n        UpdateCalendarGroup(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCalendarGroup($id: ID!) {\n        CalendarGroupReadModel(id: $id) {\n            id\n            name\n            color\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetCalendarGroup($id: ID!) {\n        CalendarGroupReadModel(id: $id) {\n            id\n            name\n            color\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCalendarGroups(\n        $limit: Int\n        $skip: Int\n        $filter: ListCalendarGroupReadModelFilter\n        $sort: CalendarGroupReadModelSortBy\n    ) {\n        ListCalendarGroupReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                color\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetCalendarGroups(\n        $limit: Int\n        $skip: Int\n        $filter: ListCalendarGroupReadModelFilter\n        $sort: CalendarGroupReadModelSortBy\n    ) {\n        ListCalendarGroupReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                color\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateCalendarGroup($input: CreateCalendarGroupInput!) {\n        CreateCalendarGroup(input: $input)\n    }\n"): (typeof documents)["\n    mutation CreateCalendarGroup($input: CreateCalendarGroupInput!) {\n        CreateCalendarGroup(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ChangePublisher($input: ChangePublisherInput!) {\n        ChangePublisher(input: $input)\n    }\n"): (typeof documents)["\n    mutation ChangePublisher($input: ChangePublisherInput!) {\n        ChangePublisher(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query PublisherReadModel($id: ID!) {\n        PublisherReadModel(id: $id) {\n            id\n            name\n            address {\n                placeId\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query PublisherReadModel($id: ID!) {\n        PublisherReadModel(id: $id) {\n            id\n            name\n            address {\n                placeId\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ListPublisherReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListPublisherReadModelFilter\n        $sort: PublisherReadModelSortBy\n    ) {\n        ListPublisherReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"): (typeof documents)["\n    query ListPublisherReadModels(\n        $limit: Int\n        $skip: Int\n        $filter: ListPublisherReadModelFilter\n        $sort: PublisherReadModelSortBy\n    ) {\n        ListPublisherReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                name\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddPublisher($input: AddPublisherInput!) {\n        AddPublisher(input: $input)\n    }\n"): (typeof documents)["\n    mutation AddPublisher($input: AddPublisherInput!) {\n        AddPublisher(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateFile($input: CreateFileInput!) {\n        CreateFile(input: $input) {\n            createdFileId\n            filename\n            signedUrl\n            contentType\n        }\n    }\n"): (typeof documents)["\n    mutation CreateFile($input: CreateFileInput!) {\n        CreateFile(input: $input) {\n            createdFileId\n            filename\n            signedUrl\n            contentType\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ListFileReadModels($ids: [ID!]!) {\n        ListFileReadModels(filter: { id: { in: $ids } }) {\n            items {\n                id\n                filename\n                contentType\n                createdAt\n                signedDownloadUrl\n                contentLength\n            }\n        }\n    }\n"): (typeof documents)["\n    query ListFileReadModels($ids: [ID!]!) {\n        ListFileReadModels(filter: { id: { in: $ids } }) {\n            items {\n                id\n                filename\n                contentType\n                createdAt\n                signedDownloadUrl\n                contentLength\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ListJobExecutionStatus(\n        $limit: Int\n        $skip: Int\n        $filter: ListJobExecutionReadModelFilter\n        $sort: JobExecutionReadModelSortBy\n    ) {\n        ListJobExecutionReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                status\n            }\n        }\n    }\n"): (typeof documents)["\n    query ListJobExecutionStatus(\n        $limit: Int\n        $skip: Int\n        $filter: ListJobExecutionReadModelFilter\n        $sort: JobExecutionReadModelSortBy\n    ) {\n        ListJobExecutionReadModels(\n            limit: $limit\n            afterCursor: { skip: $skip }\n            filter: $filter\n            sortBy: $sort\n        ) {\n            count\n            items {\n                id\n                status\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription JobExecutionStatusSubscription($filter: JobExecutionReadModelSubscriptionFilter) {\n        JobExecutionReadModels(filter: $filter) {\n            id\n            status\n        }\n    }\n"): (typeof documents)["\n    subscription JobExecutionStatusSubscription($filter: JobExecutionReadModelSubscriptionFilter) {\n        JobExecutionReadModels(filter: $filter) {\n            id\n            status\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetEntityHistory($entityTypeName: String!, $entityId: String!) {\n        GetEntityHistory(input: { entityTypeName: $entityTypeName, entityId: $entityId }) {\n            entityTypeName\n            entityId\n            events {\n                type\n                date\n                id\n                value\n                diff\n                user {\n                    id\n                    email\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetEntityHistory($entityTypeName: String!, $entityId: String!) {\n        GetEntityHistory(input: { entityTypeName: $entityTypeName, entityId: $entityId }) {\n            entityTypeName\n            entityId\n            events {\n                type\n                date\n                id\n                value\n                diff\n                user {\n                    id\n                    email\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAvailableCalendarGroups($searchTerm: String!) {\n        ListCalendarGroupReadModels(\n            limit: 20\n            filter: { or: [{ name: { contains: $searchTerm } }] }\n            sortBy: { name: ASC }\n        ) {\n            items {\n                id\n                name\n            }\n            count\n        }\n    }\n"): (typeof documents)["\n    query GetAvailableCalendarGroups($searchTerm: String!) {\n        ListCalendarGroupReadModels(\n            limit: 20\n            filter: { or: [{ name: { contains: $searchTerm } }] }\n            sortBy: { name: ASC }\n        ) {\n            items {\n                id\n                name\n            }\n            count\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCalendarGroupForComboBox($id: ID!) {\n        CalendarGroupReadModel(id: $id) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query GetCalendarGroupForComboBox($id: ID!) {\n        CalendarGroupReadModel(id: $id) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCalendarGroupsForComboBox($ids: [ID!]!) {\n        ListCalendarGroupReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetCalendarGroupsForComboBox($ids: [ID!]!) {\n        ListCalendarGroupReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {\n            count\n            items {\n                id\n                name\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateCalendarEvent($input: CreateCalendarEventInput!) {\n        CreateCalendarEvent(input: $input)\n    }\n"): (typeof documents)["\n    mutation CreateCalendarEvent($input: CreateCalendarEventInput!) {\n        CreateCalendarEvent(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateRecurringCalendarEvent($input: CreateRecurringCalendarEventInput!) {\n        CreateRecurringCalendarEvent(input: $input)\n    }\n"): (typeof documents)["\n    mutation CreateRecurringCalendarEvent($input: CreateRecurringCalendarEventInput!) {\n        CreateRecurringCalendarEvent(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteCalendarEvent($input: DeleteCalendarEventInput!) {\n        DeleteCalendarEvent(input: $input)\n    }\n"): (typeof documents)["\n    mutation DeleteCalendarEvent($input: DeleteCalendarEventInput!) {\n        DeleteCalendarEvent(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteRecurringCalendarEvent($input: DeleteRecurringCalendarEventInput!) {\n        DeleteRecurringCalendarEvent(input: $input)\n    }\n"): (typeof documents)["\n    mutation DeleteRecurringCalendarEvent($input: DeleteRecurringCalendarEventInput!) {\n        DeleteRecurringCalendarEvent(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteRecurringCalendarEventInstance(\n        $input: DeleteRecurringCalendarEventInstanceInput!\n    ) {\n        DeleteRecurringCalendarEventInstance(input: $input)\n    }\n"): (typeof documents)["\n    mutation DeleteRecurringCalendarEventInstance(\n        $input: DeleteRecurringCalendarEventInstanceInput!\n    ) {\n        DeleteRecurringCalendarEventInstance(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateCalendarEvent($input: UpdateCalendarEventInput!) {\n        UpdateCalendarEvent(input: $input)\n    }\n"): (typeof documents)["\n    mutation UpdateCalendarEvent($input: UpdateCalendarEventInput!) {\n        UpdateCalendarEvent(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateRecurringCalendarEvent($input: UpdateRecurringCalendarEventInput!) {\n        UpdateRecurringCalendarEvent(input: $input)\n    }\n"): (typeof documents)["\n    mutation UpdateRecurringCalendarEvent($input: UpdateRecurringCalendarEventInput!) {\n        UpdateRecurringCalendarEvent(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCalendarEventReadModel($id: ID!) {\n        CalendarEventReadModel(id: $id) {\n            id\n            calendarGroupId\n            displayName\n            description\n            startDateTime\n            endDateTime\n            color\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetCalendarEventReadModel($id: ID!) {\n        CalendarEventReadModel(id: $id) {\n            id\n            calendarGroupId\n            displayName\n            description\n            startDateTime\n            endDateTime\n            color\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCalendarEventsBetween($input: GetCalendarEventsBetweenInput!) {\n        GetCalendarEventsBetween(input: $input) {\n            id\n            isRecurringCalendarEvent\n            recurringCalendarEventData {\n                id\n                timezone\n                rRuleSetString\n                durationInMinutes\n                frequency\n                every\n                onWeekdays\n                startDate\n                endDate\n                createdAt\n                updatedAt\n            }\n            displayName\n            description\n            startDateTime\n            endDateTime\n            color\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetCalendarEventsBetween($input: GetCalendarEventsBetweenInput!) {\n        GetCalendarEventsBetween(input: $input) {\n            id\n            isRecurringCalendarEvent\n            recurringCalendarEventData {\n                id\n                timezone\n                rRuleSetString\n                durationInMinutes\n                frequency\n                every\n                onWeekdays\n                startDate\n                endDate\n                createdAt\n                updatedAt\n            }\n            displayName\n            description\n            startDateTime\n            endDateTime\n            color\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetRecurringCalendarEventReadModel($id: ID!) {\n        RecurringCalendarEventReadModel(id: $id) {\n            id\n            calendarGroupId\n            timezone\n            displayName\n            description\n            rRuleSetString\n            durationInMinutes\n            frequency\n            every\n            onWeekdays\n            startDate\n            endDate\n            color\n            excludedDates\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetRecurringCalendarEventReadModel($id: ID!) {\n        RecurringCalendarEventReadModel(id: $id) {\n            id\n            calendarGroupId\n            timezone\n            displayName\n            description\n            rRuleSetString\n            durationInMinutes\n            frequency\n            every\n            onWeekdays\n            startDate\n            endDate\n            color\n            excludedDates\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getServiceVersion {\n        GetServiceVersion {\n            version\n        }\n    }\n"): (typeof documents)["\n    query getServiceVersion {\n        GetServiceVersion {\n            version\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddView($input: AddViewInput!) {\n        AddView(input: $input)\n    }\n"): (typeof documents)["\n    mutation AddView($input: AddViewInput!) {\n        AddView(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveView($input: RemoveViewInput!) {\n        RemoveView(input: $input)\n    }\n"): (typeof documents)["\n    mutation RemoveView($input: RemoveViewInput!) {\n        RemoveView(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetMyViewsForPathname($pathname: String!) {\n        GetMyViewsForPathname(input: { pathname: $pathname }) {\n            id\n            name\n            pathname\n            searchParams\n        }\n    }\n"): (typeof documents)["\n    query GetMyViewsForPathname($pathname: String!) {\n        GetMyViewsForPathname(input: { pathname: $pathname }) {\n            id\n            name\n            pathname\n            searchParams\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;