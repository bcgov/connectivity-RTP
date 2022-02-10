import { govBuilder } from '@button-inc/form-schema';
import schema from './schemas/schema';
import uiSchema from './schemas/uiSchema';
import postData from './utils/post-data'

const options = {
  getRoute: '/form',
  postRoute: '/api',
  useSession: true,
  onFormEnd: (errors, formData) => {
    if (errors) throw new Error("There was an error saving your information: ", errors);
    postData(formData);
  },
  validateEachPage: true,
  validatedUrl: '/end',
  invalidUrl: '/error',
}

export const { postMiddleware, getHandler, Forms } = govBuilder(schema, uiSchema, options);
