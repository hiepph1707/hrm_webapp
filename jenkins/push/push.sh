#!/bin/bash

echo "********************"
echo "** Pushing image ***"
echo "********************"

IMAGE="nginx-hrm-webapp"
DOCKER_REGISTRY="hub.saigonbpo.vn"

echo "** Logging in ***"
docker login $DOCKER_REGISTRY -u hiepph -p $PASS
echo "*** Tagging image ***"
docker tag $IMAGE:$DEPLOY_TAG $DOCKER_REGISTRY/img_sgb/$IMAGE:$DEPLOY_TAG
echo "*** Pushing image ***"
docker push $DOCKER_REGISTRY/img_sgb/$IMAGE:$DEPLOY_TAG
