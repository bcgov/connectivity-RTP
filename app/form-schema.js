import { govBuilder } from '@button-inc/form-schema';
import schema from './schemas/schema';
import uiSchema from './schemas/uiSchema';
import postData from './utils/post-data'

const options = {
  getRoute: '/form',
  postRoute: '/api',
  useSession: false,
  onFormEnd: (errors, formData, req) => {
    if (errors) throw new Error("There was an error saving your information: ", errors);
    postData(formData, req);
  },
  onPost: (_postData, schemaIndex, cleanSchemaData) => {
    const newData = cleanSchemaData(formData);
    formData[schemaIndex] = { ...formData[schemaIndex], ...newData };
    return formData[schemaIndex];
  },
  validateEachPage: true,
  validatedUrl: '/end',
  invalidUrl: '/error',
}

export const { postMiddleware, getHandler, Forms } = govBuilder(schema, uiSchema, options);
