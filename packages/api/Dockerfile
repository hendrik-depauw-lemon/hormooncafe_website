FROM node:20-alpine AS build
WORKDIR /build

ARG workspace=packages/api
ARG packageName=@package-name/api

COPY .yarnrc.yml package.json yarn.lock ./
COPY .yarn .yarn
COPY ${workspace}/package.json ${workspace}/package.json

RUN yarn -v
RUN yarn workspaces focus ${packageName}
RUN yarn workspace ${packageName} ts-patch
COPY ${workspace}/tsconfig.json ${workspace}/tsconfig.json
COPY ${workspace}/booster.d.ts ${workspace}/booster.d.ts
COPY ${workspace}/src ${workspace}/src
RUN yarn workspace ${packageName} build
RUN yarn workspaces focus --production ${packageName} && du -h node_modules
RUN mv ${workspace}/dist ./dist

FROM node:20-alpine
WORKDIR /app

ARG workspace=packages/api

COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist
COPY ${workspace}/package.json ./

EXPOSE 4000

# RUN addgroup myusergroup && \
#     adduser -g myusergroup --disabled-password myuser
# RUN chown -R myuser:myuser /app
# USER myuser

CMD ["yarn", "start"]
