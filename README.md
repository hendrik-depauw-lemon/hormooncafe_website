<!-- TODO: update + refer to notion for keeper (and readme template) -->
<!-- TODO: kijken of we automatisch docs kunnen laten genereren uit booster met de bestaande annotaties -->

# Run this project locally (dev)

-   Install KSM CLI: https://github.com/Keeper-Security/secrets-manager/releases?q=cli
-   Get a Keeper OTA token from your Tech lead
-   Create .env.local

```bash
    echo -e 'KSM_CONFIG="<your token>"' >> packages/api/.env.local
```

-   Get a Keeper OTA token from your Tech lead and replace <your token> in the previously created `.env.local`
-
-   Run `yarn install`
-   Run `yarn workspace @package-name/api ts-patch`
-   [OPTIONAL] if you are working on our provider:
    `yarn link <path-to-local-provider>`
    Do not forget to unlink before committing `yarn unlink --all`
-   Run in separate terminals:
    -   `yarn dev web`
    -   `yarn dev api`

# Deploy

Please find a detailed writeup on [Notion](https://www.notion.so/lemon-companies/Release-strategy-1ec2f0eff24680d7b8c6fd47a06f6438)

### How to release a version:

Dispatch the `Create Full Release` workflow, this will:

-   bump the version of all packages based on your choice between patch, minor and major
-   push a tag with the new version number
-   create a github release
-   build the API package and push the container to ECR

Then, dispatch the `Deploy All Services` workflow by selecting a tag as reference. This will deploy both the API and the web app to AWS.

# Project setup

-   FE using NextJS
-   CMS using Strapi

# run e2e tests

`cd packages/e2e`
`yarn playwright install`
`yarn test`

# Setting up a copy of this as a new project

1. [ ] create a github repository
2. [ ] copy this project into a new folder.
3. [ ] Setup github origin etc.
4. [ ] remove unnecessary workspaces
5. [ ] configure external services
6. [ ] rename `@package-name` to the correct name
7. [ ] configure the correct cognito
8. [ ] run `yarn ts-patch` in de `packages/api` folder (patching typeScript with custom transforms(=manipulation of the AST during compilation), aka booster magic)

## How to

### 1. Create an enity in booster with add,change, get, getall

1. add it to booster (see below #2 )
2. `yarn workspace @package-name/web generate-domain`
3. Add the graphql query to the frontend (More details see below #6)
    1. add it to `packages/web/src/modules/backend/graphql`
    2. `yarn workspace @car-fleet/web generate-domain`
    3. add it to `packages/web/src/modules/backend/services`
4. create pages

### 2. How to add an entity to booster

1. Copy example directory in `packages/api/src/modules`
2. Rename everything (ctrl+shift+r), select case sensitive replace that keeps the capital letters that existed: Example -> NewEntity
3. Rename the filenames
4. You might want to remove:
    - cron
    - event-handlers
5. Add the properties to everything (use copy paste ;) )
6. Make sure booster starts up correctly: `yarn dev api`

## 3. How to create pages for one entity

Pre requirement: grapqhl queries are added.

1. Go to `/Users/ellen/Projects/lemon/companions_carfleet-platform/packages/web/src/modules/shared/i18n/dictionaries/nl.json`
2. Copy the object with the key 'example' in `nl.json` to a new object 'new-entity'
    - (TODO: vereenvoudig de json zodat dit simpler is)
3. Repeat for other required languages.
4. Copy `packages/web/app/[locale]/(protected)/(admin)/examples`
5. Rename everything (ctrl+shift+r), select case sensitive replace that keeps the capital letters that existed: Example -> NewEntity
6. Changes to the Detail page
    1. in `packages/web/app/[locale]/(protected)/(admin)/<newEntites>/[id]/_components/form.tsx`
        1. update the formSchema to the correct fields
        2. update form -> defaultValues
        3. update on submit
        4. add an input to the view, add a correspoping thing to nl.json
    2. in `packages/web/app/[locale]/(protected)/(admin)/<newEntites>/[id]/page.tsx`
        1. update the title for the detail page
7. Changes to the Table page
    1. In `packages/web/app/[locale]/(protected)/(admin)/<newEntites>/_components/Table.tsx`
        1. Add a column for each field you want to show in the table overview
8. Change the new page
    1. in `packages/web/app/[locale]/(protected)/(admin)/<newEntites>/new/_components/form.tsx`
        1. update the formSchema to the correct fields
        2. update form -> defaultValues
        3. update on submit
        4. add an input to the view, add a correspoping thing to nl.json

### 4. How to add a query to web graphql

-   add a query in booster
-   `yarn workspace @car-fleet/web generate-domain`
-   add the query in `packages/web/src/modules/backend/graphql/queries`
-   add the query in `packages/web/src/modules/backend/services/queries`
-   `yarn workspace @car-fleet/web generate-domain`

### 5. How to add a command to web graphql

-   add a command in booster
-   `yarn workspace @car-fleet/web generate-domain`
-   add command to `packages/web/src/modules/backend/graphql/mutations`
-   `yarn workspace @car-fleet/web generate-domain`
-   add command to `packages/web/src/modules/backend/services/mutations`
-

### 6. How to add Get, Getall, create and update of an entity to the web graphql & services

1. Go to `packages/web/src/modules/backend/graphql/mutations`
2. Copy the `examples.ts` file
3. Replace in the file (ctrl + r) 'example' to 'newEntity'
4. Go to `packages/web/src/modules/backend/graphql/queries`
5. Copy the `examples.ts` file
6. Replace in the file (ctrl + r) 'example' to 'newEntity'
7. Update the properties to what is expected for the new entity, see `packages/web/src/gql/generated/schema.graphql`
8. `yarn workspace @car-fleet/web generate-domain`
9. Go to `packages/web/src/modules/backend/services/mutations`
10. Copy the `examples.ts` file
11. Replace in the file (ctrl + r) 'example' to 'newEntity'
12. Go to `packages/web/src/modules/backend/services/queries`
13. Copy the `examples.ts` file
14. Replace in the file (ctrl + r) 'example' to 'newEntity'

### 7. How to connect to a Microsoft SQL database

1. Change the DB variables in .env to use the MSSQL provider
2. Comment the Mongo database section
3. fill in all the related ENV variables in the MSSQL section.
4. Depending on the type of authentication that is needed you'll have to provide different fields. Refer to the tedious docs, microsoft docs, and knex types file for more info.
