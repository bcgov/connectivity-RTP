#!/bin/bash

set -euxo pipefail

echo "Deploying metabase to openshift $*"

cd helm/metabase
helm dep up
helm upgrade --install --atomic -f ./values.yaml "$@" ccbc-metabase . \
  --debug --timeout=8m0s
