import getConfig from 'next/config';

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};
const baseUrl =
  runtimeConfig.NODE_ENV === 'production'
    ? `https://${runtimeConfig.HOST}`
    : `http://localhost:${runtimeConfig.PORT || 3000}`;

export default function postStatus({ applicationId, status }) {
  const statusComplete = `mutation statusComplete($applicationId: ID = "", $status: String = "") {
  updateApplication(input: {id: $applicationId, applicationPatch: {status: $status}}){
    clientMutationId
  }
}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const variables = {
    applicationId,
    status,
  };

  fetch(`${baseUrl}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: statusComplete,
      variables,
    }),
  });
}
