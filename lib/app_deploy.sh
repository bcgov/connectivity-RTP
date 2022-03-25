#!/bin/bash

set -euxo pipefail

echo "Deploying application to openshift $*"

cd helm/app
helm dep up
helm upgrade --install --atomic -f ./values.yaml "$@" connectivity-intake . \
  --debug --timeout=8m0s
