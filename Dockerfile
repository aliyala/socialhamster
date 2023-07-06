FROM node:18 as build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy the rest of the source code
COPY . .

# Build the TypeScript code
RUN npm run build

FROM node:18-alpine

WORKDIR /app

# Copy the built JavaScript code from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Expose the desired port
EXPOSE 3000

# Start the application
CMD ["node", "./dist/index.js"]
