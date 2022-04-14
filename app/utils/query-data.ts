import getConfig from 'next/config';

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};
const baseUrl =
  runtimeConfig.NODE_ENV === 'production'
    ? `https://${runtimeConfig.HOST}`
    : `http://localhost:${runtimeConfig.PORT || 3000}`;

export async function queryData(req) {
  if (!req) {
    throw new Error(`req is missing in queryData ${JSON.stringify(req)}`);
  }
  if (!req.rawHeaders) {
    throw new Error(
      `req.rawHeaders are missing in queryData ${JSON.stringify(req)}`
    );
  }
  const oldFormDataQuery = JSON.stringify({
    query: `query OldFormDataQuery {allApplications(first: 1) {nodes {
        id 
        formData 
        status
        referenceNumber
      }
    }
  }`,
  });
  const headers = {
    'Content-Type': 'application/json',
  };

  const cookie = req.headers.cookie;

  if (cookie) headers['Cookie'] = cookie;

  const res = await fetch(`${baseUrl}/graphql`, {
    method: 'POST',
    headers,
    body: oldFormDataQuery,
  });
  const response = await res.json();
  const oldFormData = response.data.allApplications.nodes[0].formData;
  const applicationId = response.data.allApplications.nodes[0].id;

  return { oldFormData, applicationId };
}

export async function queryUser() {
  const userQuery = JSON.stringify({
    query: `query MyQuery { session { sub } allApplications { nodes { id formData referenceNumber status } } }`,
  });
  const res = await fetch(`${baseUrl}/graphql`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: userQuery,
  });
  const response = await res.json();
  return response;
}
