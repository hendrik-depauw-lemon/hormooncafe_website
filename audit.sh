#!/bin/bash

# File containing the allowed licenses
allowed_licenses_file="allowed_licenses.txt"

# Construct the command
command="yarn licenses audit --recursive --production"

# Read each line in the file and append it to the command as an allowed license
while IFS= read -r license; do
    command+=" --allowed \"$license\""
done < "$allowed_licenses_file"

# Run the constructed command
eval "$command"