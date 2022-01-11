#!/bin/bash

set -euxo pipefail

NAMESPACE=$1
CHART_PATH=$2
TAG=$3
echo "Creating Helm installation in $NAMESPACE namespace with tag $TAG"

helm upgrade --install --atomic --set image.app.tag=$TAG -n $NAMESPACE connectivity-intake $CHART_PATH --debug
