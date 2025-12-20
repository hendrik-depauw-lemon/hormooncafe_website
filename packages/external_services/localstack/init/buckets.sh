#!/usr/bin/env bash
awslocal s3api create-bucket --bucket local-bucket --create-bucket-configuration LocationConstraint=eu-west-1
awslocal s3api put-bucket-cors --bucket local-bucket --cors-configuration '{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "PUT", "POST"],
            "AllowedOrigins": ["*"],
            "ExposeHeaders": [],
            "MaxAgeSeconds": 3000
        }
    ]
}'
