# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install global dependencies
RUN npm install -g typescript ts-node

# Copy the package.json and yarn.lock (if you're using yarn) to the container
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install


# Copy the rest of the project files into the container
COPY . .

# Build the TypeScript files
# RUN yarn build

ENV DATABASE_URL="postgresql://postgres:123456@localhost:5432/ct_attendance?schema=public"
ENV PORT=3000
ENV SALT_ROUNDS=12
ENV JWT_SECRET="ad74bd4d91579476e6a9fec34874704ed113369d066032f6bb954a3bb06e042f"
ENV CLOUDINARY_SECRET="AsgfSOEu_hjs-S2gfN12ZZIvv-s"
ENV CLOUDINARY_KEY="225171175386142"
ENV CLOUDINARY_NAME="dqnw5qaoq"
RUN npx prisma generate
# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "start"]
