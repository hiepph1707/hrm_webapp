#!/bin/bash
DOCKER_REGISTRY="hub.saigonbpo.vn"
docker login -u hiepph -p $PASS
cd jenkins/deploy/ && /usr/local/bin/docker-compose -f docker-compose-deploy.yml up -d
