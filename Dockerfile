FROM node:16-alpine As development

WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install --only=dev
COPY --chown=node:node . .
USER node

FROM node:16-alpine as build
WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm install --only=production
USER node


FROM node:16-alpine As production
RUN npm cache clear --force
COPY --chown=node:node .env .env
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
ENV PORT 3002
EXPOSE 3002
CMD ["node","dist/main"]