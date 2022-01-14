#!/bin/bash

set -euxo pipefail

NAMESPACE=$1
TAG=$2
echo "Creating Helm installation in $NAMESPACE namespace with tag $TAG"

helm dep up &&
helm upgrade --install --atomic \
  -f ./helm/values.yaml --set image.app.tag=$TAG \
  -n $NAMESPACE connectivity-intake ./helm --debug --dry-run
