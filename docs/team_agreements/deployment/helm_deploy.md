# Deployment

## Deploy using Helm charts

### First Time

To deploy the application for the first time you must deploy logged in as a local user using the following command:
```bash
# Login to OpenShift using oc login
$ oc login --token=<token> --server=https://api.silver.devops.gov.bc.ca:6443
# Run deploy script
$ bash  ./lib/helm_deploy.sh -n <namespace> \
          --set app.namespace=<namespace> \
          --set image.app.tag=<tag(see below)> \
          --set image.db.tag=<tag(see below)> \
          --set image.app.clientSecret=<keycloak client secret> \
          --set route.host=<app url>
```

To find the `<tag>` visit [our GitHub packages page](https://github.com/bcgov/connectivity-intake/pkgs/container/connectivity-intake) and use the latest docker image sha. 

eg. `sha-b0086114dfdd9ddcf1f8bb0ad3980dd261a987d6d42f85595da7b24d2f0c3230`

---

### Subsequent Deployments

- Log into the [BCDevExchange OpenShift cluster](https://console.apps.silver.devops.gov.bc.ca)
- Select the correct `namespace`
- Switch to the `Administrator` and select `ServiceAccounts` under the `User Management` dropdown
- Click on `connectivity-intake-deployer`
- In the `Secrets` section click the name with the type `kubernetes.io/service-account-token`
- In the `Data` section copy to clipboard the entry labelled `token`
- Paste the `token` value into the repositories [GitHub secrets](https://github.com/bcgov/connectivity-intake/settings/secrets/actions) in `OPENSHIFT_TOKEN`
