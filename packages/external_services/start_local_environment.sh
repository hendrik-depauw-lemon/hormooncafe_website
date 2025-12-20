#!/bin/bash

# Define the docker compose file
dockerComposeFile="packages/external_services/docker-compose.yml"

# Function to start the local environment
startLocalEnvironment() {
    echo "Starting local environment... ${dockerComposeFile}"
    chmod -R +x packages/external_services/localstack/init/*.sh
    output=$(docker-compose -f "${dockerComposeFile}" -p "package-name_external_services" up -d 2>&1)

    if [ $? -ne 0 ]; then
        echo "Error starting services: ${output}"
        return 1
    fi

    echo "Services started: ${output}"
    return 0
}

# Call the function to start the environment
startLocalEnvironment
