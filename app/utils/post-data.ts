import axios from "axios";
// import getConfig from "next/config";
import dotenv from 'dotenv';

dotenv.config();

// const CONFIG = getConfig().publicRuntimeConfig;

const postData = async (formData) => {
  const applicationMutation = `mutation CreateApplication($formData: JSON = "formData") {
  createApplication(input: {application: {formData: $formData}}) {
    clientMutationId
  }
}`;
  const createApp = `mutation MyMutation($formData: JSON = "formData") {
  createApplication(input: {application: {formData: $formData}})
}`;
  console.log("Data Saved!", formData);
  try {
    await axios({
      method: "POST",
      url: `http://${process.env.ORIGIN}:${process.env.PORT}/graphql`,
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
      data: {
        query: createApp,
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
