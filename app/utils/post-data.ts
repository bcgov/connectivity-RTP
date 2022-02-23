import dotenv from "dotenv";

dotenv.config();

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.HOST}`
    : `http://localhost:${process.env.PORT || 3000}`;

export default async function postData(
  { formData, applicationId, status },
  req
) {
  if (!req) {
    throw new Error(`req is missing in postData ${JSON.stringify(req)}`);
  }
  if (!req.rawHeaders) {
    throw new Error(
      `req.rawHeaders are missing in postData ${JSON.stringify(req)}`
    );
  }
  // const applicationId = session.get("applicationId");
  // Change to update application
  const applicationMutation = `mutation ApplicationPatch($applicationId: ID = "", $formData: JSON = "", $status: String = "draft") {
  updateApplication(
    input: {id: $applicationId, applicationPatch: {formData: $formData, status: $status}}
  ) {
    query {
      allApplications(first: 1) {
        nodes {
          id
          formData
          status
        }
      }
    }
  }
}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const cookie = req.rawHeaders.find((h) => h.match(/^connect\.sid=/));
  if (cookie) headers["Cookie"] = cookie;

  const variables = {
    formData,
    applicationId,
  };
  if (status) variables["status"] = status;

  try {
    const res = await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: applicationMutation,
        variables,
      }),
    });
    const response = await res.json();
    return response.data.updateApplication.query;
  } catch (e) {
    console.error(e.response.data);
    throw new Error("There was an error saving your information in post-data");
  }
}
