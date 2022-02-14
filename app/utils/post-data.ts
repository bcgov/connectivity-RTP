import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.HOST}`
    : `http://localhost:${process.env.PORT || 3000}`;

export default async function postData(formData, req) {
  const applicationMutation = `mutation CreateApplication($formData: JSON = "formData") {
  createApplication(input: {application: {formData: $formData}}) {
    clientMutationId
  }
}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const cookie = req.rawHeaders.find((h) => h.match(/^connect\.sid=/));
  if (cookie) headers["Cookie"] = cookie;

  try {
    await axios({
      method: "POST",
      url: `${baseUrl}/graphql`,
      headers,
      withCredentials: true,
      data: {
        query: applicationMutation,
        variables: {
          formData: JSON.stringify(formData),
        },
        operationName: "CreateApplication",
      },
    });
  } catch (e) {
    throw new Error("There was an error saving your information");
  }
};
