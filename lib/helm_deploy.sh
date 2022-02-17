#!/bin/bash

set -euxo pipefail

echo "Creating Helm installation $*"

cd helm
helm dep up
helm upgrade --install --atomic -f ./values.yaml "$@" connectivity-intake . \
  --debug --timeout=8m0s
