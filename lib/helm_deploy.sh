#!/bin/bash

set -euxo pipefail

NAMESPACE=$1
TAG=$2
echo "Creating Helm installation in $NAMESPACE namespace"

cd helm
helm dep up
helm upgrade --install --atomic \
  -f ./values.yaml --set image.app.tag=$TAG --set image.db.tag=$TAG \
  -n $NAMESPACE connectivity-intake . --debug --timeout=5m0s
