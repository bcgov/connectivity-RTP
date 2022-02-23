import { govBuilder } from '@button-inc/form-schema';
import schema from './schemas/schema';
import uiSchema from './schemas/uiSchema';
import postData from './utils/post-data'
import queryData from './utils/query-data';

const baseUrl = process.env.NODE_ENV === 'production'
  ? `https://${process.env.HOST}`
  : `http://localhost:${process.env.PORT || 3000}`;

const options = {
  getRoute: "/form",
  postRoute: '/api',
  useSession: false,
  onFormEnd: async (errors, formData, req) => {
    console.log("onFormEnd Errors", errors);
    if (errors) throw new Error("There was an error saving your information in onFormEnd: ", typeof errors, errors);
    const applicationId = await queryData(req);
    postData(formData, applicationId, req);
  },
  onPost: async (formData, schemaIndex, cleanSchemaData, req) => {
    const { oldFormData, applicationId } = await queryData(req);

    const mergedData = { ...oldFormData, ...formData }

    const savedMergedData = await postData(mergedData, applicationId, req);
    const newFormData = cleanSchemaData(savedMergedData.allApplications.nodes[0]);
    return newFormData;
  },
  validateEachPage: true,
  validatedUrl: '/end',
  invalidUrl: '/error',
}

export const { postMiddleware, getHandler, Forms } = govBuilder(schema, uiSchema, options);
