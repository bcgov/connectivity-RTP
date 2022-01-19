import axios from 'axios';

const postData = async (formData) => {
  const applicationMutation = `mutation CreateApplication($formData: JSON = "formData") {
  createApplication(input: {application: {formData: $formData}}) {
    clientMutationId
  }
}`;

  try {
    await axios({
      method: "POST",
      url: 'http://localhost:3000/graphql',
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: applicationMutation,
        variables: {
          formData: JSON.stringify(formData)
        },
        operationName: "CreateApplication",
      }
    });
  } catch (e) {
    console.log("Form data failed to post to database: ", e);
  }
}

export default postData;
