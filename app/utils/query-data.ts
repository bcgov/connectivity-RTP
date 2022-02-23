import dotenv from "dotenv";

dotenv.config();

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.HOST}`
    : `http://localhost:${process.env.PORT || 3000}`;

export default async function queryData(req) {
  const oldFormDataQuery = JSON.stringify({
    query: `query OldFormDataQuery {allApplications(first: 1) {nodes {
        id 
        formData 
        status
      }
    }
  }`,
  });
  const headers = {
    "Content-Type": "application/json",
  };
  const cookie = req.rawHeaders.find((h) => h.match(/^connect\.sid=/));
  if (cookie) headers["Cookie"] = cookie;

  const res = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    credentials: "include",
    headers,
    body: oldFormDataQuery,
  });
  const response = await res.json();
  const oldFormData = response.data.allApplications.nodes[0].formData;
  const applicationId = response.data.allApplications.nodes[0].id;

  return { oldFormData, applicationId };
}
