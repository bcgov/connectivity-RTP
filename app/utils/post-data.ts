import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const postData = async (formData) => {
  const applicationMutation = `mutation CreateApplication($formData: JSON = "formData") {
  createApplication(input: {application: {formData: $formData}}) {
    clientMutationId
  }
}`;
  try {
    await axios({
      method: "POST",
      url: `http://${process.env.ORIGIN}:${process.env.PORT}/graphql`,
      headers: {
        "Content-Type": "application/json",
      },
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

export default postData;
