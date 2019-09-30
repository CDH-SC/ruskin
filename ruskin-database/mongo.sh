#!/usr/bin/env bash

# Title: Restore
# Author: Tyler Moon
# Description: This script is used by the MongoDB container to restore the dump directory

# Execute restore in the background after 5 seconds
sleep 5 && mongorestore /dump &

# Keep mongo running the the foreground or the container will shut off
docker-entrypoint.sh mongod
