#!/bin/bash

set -euxo pipefail

while getopts n:f: flag
do
  case "${flag}" in
    n) namespace=${OPTARG};;
    f) file=${OPTARG};;
    *) ;;
  esac
done

echo "Deploying SysDig Monitoring to the \"$namespace\" namespace"

cd helm/monitoring
oc apply -n "$namespace" -f "$file"
