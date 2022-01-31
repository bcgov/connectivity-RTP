import axios from 'axios';
import getConfig from 'next/config';

const CONFIG = getConfig().publicRuntimeConfig;

const postData = async (formData) => {
  const applicationMutation = `mutation CreateApplication($formData: JSON = "formData") {
  createApplication(input: {application: {formData: $formData}}) {
    clientMutationId
  }
}`;

  try {
    await axios({
      method: 'POST',
      url: `${CONFIG.ORIGIN}/graphql`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        query: applicationMutation,
        variables: {
          formData: JSON.stringify(formData)
        },
        operationName: 'CreateApplication'
      }
    });
  } catch (e) {
    throw new Error('There was an error saving your information');
  }
};

export default postData;
