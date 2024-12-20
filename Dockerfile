FROM node:20-alpine

# ARGUMENTS
ARG SHOPIFY_API_KEY
ARG PORT
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY

# PORT
EXPOSE $PORT

# WORKING DIRECTORY
WORKDIR /app
COPY . .

# INSTALL DEPENDENCIES
RUN echo "Installing dependencies for the project..." && \
    yarn && \
    echo "Installing dependencies for the web folder..." && \
    cd web && yarn && \
    echo "Installing dependencies for the frontend folder..." && \
    cd frontend && yarn && \
    cd - && \
    echo "Dependencies installed successfully."

# BUILD APPLICATION
RUN echo "Building the application..." && \
    yarn app:build && \
    echo "Application build completed."

# CLEANUP EVERYTHING EXCEPT BUILD
RUN echo "Cleaning up unnecessary files..." && \
    find . -mindepth 1 -maxdepth 1 -not -name "build" -exec rm -rf {} + && \
    echo "Cleanup completed."

# MOVE CONTENTS FROM BUILD TO PARENT DIRECTORY
RUN echo "Moving build contents to the root directory..." && \
    mv build/* ./ && \
    [ -f build/.env ] && mv build/.env ./ || echo "No .env file found in build directory" && \
    rm -rf build && \
    echo "Build contents moved successfully."

# INSTALLING DEPENDENCIES FOR PRODUCTION
RUN echo "Installing production dependencies..." && \
    yarn install --production && \
    echo "Installing production dependencies for the frontend folder..." && \
    cd frontend && yarn install && yarn run build && \
    echo "Production dependencies installed and frontend built successfully."

# START SERVER
CMD ["yarn", "serve"]
