#!/bin/bash

NAMESPACE=$1
CHART_PATH=$2

echo "Creating Helm installation in $NAMESPACE namespace"

helm upgrade --install --atomic -n $NAMESPACE $CHART_PATH
