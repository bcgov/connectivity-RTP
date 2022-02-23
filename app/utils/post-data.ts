import dotenv from "dotenv";

dotenv.config();

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.HOST}`
    : `http://localhost:${process.env.PORT || 3000}`;

export default async function postData(formData, applicationId, req) {
  // const applicationId = session.get("applicationId");
  // Change to update application
  const applicationMutation = `mutation ApplicationPatch($applicationId: ID = "", $formData: JSON = "") {
  updateApplication(
    input: {id: $applicationId, applicationPatch: { formData: $formData }}
  ) { query { allApplications ( first: 1 ){ nodes { id formData status }}}}}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const cookie = req.rawHeaders.find((h) => h.match(/^connect\.sid=/));
  if (cookie) headers["Cookie"] = cookie;

  try {
    const res = await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: applicationMutation,
        variables: {
          formData,
          applicationId,
        },
      }),
    });
    const response = await res.json();
    return response.data.updateApplication.query;
  } catch (e) {
    console.error(e.response.data);
    throw new Error("There was an error saving your information in post-data");
  }
}
