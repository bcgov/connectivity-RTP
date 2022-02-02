import axios from "axios";
import getConfig from "next/config";

const CONFIG = getConfig().publicRuntimeConfig;

const postData = async (formData) => {
  const applicationMutation = `mutation CreateApplication($formData: JSON = "formData") {
  createApplication(input: {application: {formData: $formData}}) {
    clientMutationId
  }
}`;
  console.log("POSTING!!", CONFIG.ORIGIN, CONFIG.PORT);
  try {
    await axios({
      method: "POST",
      url: `http://${CONFIG.ORIGIN}:${CONFIG.PORT}/graphql`,
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
      data: {
        query: applicationMutation,
        variables: {
          formData: JSON.stringify(formData)
        },
        operationName: "CreateApplication"
      }
    });
  } catch (e) {
    throw new Error("There was an error saving your information");
  }
};

export default postData;
