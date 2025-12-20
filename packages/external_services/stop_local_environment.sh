#!/bin/bash

# Define the docker compose file
dockerComposeFile="packages/external_services/docker-compose.yml"

# Function to stop the local environment
stopLocalEnvironment() {
    echo "Stopping local environment..."
    output=$(docker-compose -f "${dockerComposeFile}" -p "package-name_external_services" down 2>&1)

    if [ $? -ne 0 ]; then
        echo "Error stopping services: ${output}"
        return 1
    fi

    echo "Services stopped: ${output}"
    return 0
}

# Call the function to stop the environment
stopLocalEnvironment
