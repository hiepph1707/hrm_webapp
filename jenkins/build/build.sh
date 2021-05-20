#!/bin/bash

# Copy source code to the build location
cp -f webapp/* jenkins/build/

echo "****************************"
echo "** Building Docker Image ***"
echo "****************************"

cd jenkins/build/ && /usr/local/bin/docker-compose -f docker-compose-build.yml build #--no-cache

