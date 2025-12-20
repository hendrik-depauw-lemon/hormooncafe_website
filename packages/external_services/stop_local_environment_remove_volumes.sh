#!/bin/bash

# Define the docker compose file and MongoDB volume path
dockerComposeFile="packages/external_services/docker-compose.yml"
mongoVolumePath="packages/external_services/mongodb/data/"

# Function to stop the local environment and remove volumes
stopLocalEnvironmentAndRemoveVolumes() {
    echo "Stopping local environment and removing MongoDB volumes..."

    # Stop Docker Compose services and remove volumes
    output=$(docker-compose -f "${dockerComposeFile}" -p "package-name_external_services" down -v 2>&1)
    if [ $? -ne 0 ]; then
        echo "Error stopping services: ${output}"
        return 1
    fi
    echo "Services stopped and volumes removed: ${output}"

    # Remove MongoDB volumes
    echo "Removing MongoDB volumes..."
    if rm -rf "${mongoVolumePath}"*; then
        echo "MongoDB volume contents removed successfully."
    else
        echo "Error removing MongoDB volume contents."
        return 1
    fi

    return 0
}

# Call the function to stop the environment and remove volumes
stopLocalEnvironmentAndRemoveVolumes
