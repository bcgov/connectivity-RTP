# Deployment

## Deploy using Helm charts

### First Time

To deploy the application for the first time you must deploy logged in as a local user using the following command:
```bash
# Login to OpenShift using oc login
$ oc login --token=<token> --server=https://api.silver.devops.gov.bc.ca:6443
# Run deploy script
$ bash ./lib/helm_deploy.sh <namespace> ./helm <tag>
```

To find the `<tag>` visit [our GitHub packages page](https://github.com/bcgov/connectivity-intake/pkgs/container/connectivity-intake) and use the latest docker image sha. 

eg. `b0086114dfdd9ddcf1f8bb0ad3980dd261a987d6d42f85595da7b24d2f0c3230`

---

### Subsequent Deployments

Any changes pushed to the main branch will trigger an image build and deployment to the cluster.
