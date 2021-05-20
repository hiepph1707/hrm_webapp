#!/bin/bash
DOCKER_REGISTRY="hub.saigonbpo.vn"
docker login $DOCKER_REGISTRY -u hiepph -p $PASS
cd jenkins/deploy/ && /usr/local/bin/docker-compose -f docker-compose-deploy.yml up -d
