#!/bin/bash

echo "********************"
echo "** Pushing image ***"
echo "********************"

IMAGE="hrm-webapp"
DOCKER_REGISTRY="hub.saigonbpo.vn"

echo "** Logging in ***"
docker login $DOCKER_REGISTRY -u hiepph -p $PASS
echo "*** Tagging image ***"
docker tag $IMAGE:$BUILD_ID $DOCKER_REGISTRY/img_sgb/$IMAGE:$BUILD_ID
echo "*** Pushing image ***"
docker push $DOCKER_REGISTRY/img_sgb/$IMAGE:$BUILD_ID
