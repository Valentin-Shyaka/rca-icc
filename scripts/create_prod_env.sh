#!/bin/bash

# Specify the content to be written to the .env.local file
ENV_CONTENT="# PROD\nNEXT_PUBLIC_SANITY_PROJECT_ID=lxeru4rg\nNEXT_PUBLIC_SANITY_DATASET=production\nDATABASE_URL=mongodb+srv://icc-admin:phkQrV7FCuQjNFb5@rca-icc.hvzfa7i.mongodb.net/fantasy_prod?retryWrites=true&w=majority"

# Check if .env.local file exists
if [ -f .env.local ]; then
    # If the file exists, override its contents
    echo -e "$ENV_CONTENT" > .env.local
    echo "Existing .env.local file updated."
else
    # If the file doesn't exist, create it and write the content
    echo -e "$ENV_CONTENT" > .env.local
    echo ".env.local file created."
fi