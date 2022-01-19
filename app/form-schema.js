import { govBuilder } from '@button-inc/form-schema';
import schema from './schemas/schema';
import uiSchema from './schemas/uiSchema';
import axios from 'axios';

const postData = async (formData) => {
  debugger
  const applicationMutation = `mutation CreateApplication($application: FormData) {
    createApplication(formData: $application) {
      formData
    }
  }
}`;

  try {
    await axios({
      method: "POST",
      url: 'http://localhost:3000/graphiql',
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: applicationMutation,
        variables: {
          application: {
            formData: formData
          },
        },
        operationName: "CreateApplication",
      }
    });
  } catch (e) {
    console.log("ERROR!: ", e);
  }
}

const options = {
  getRoute: '/',
  postRoute: '/api',
  useSession: true,
  onFormEnd: (errors, formData) => {
    console.log("Posting DATA!");
    postData(formData);
  },
}

export const { postMiddleware, getHandler, Forms } = govBuilder(schema, uiSchema, options);

// mutation CreateApplication($application: CreateApplicationInput!) { createApplication(input: { application: $application }){applcation { formData } } }}
