import { govBuilder } from '@button-inc/form-schema';
import schema from './schemas/schema';
import uiSchema from './schemas/uiSchema';
import postData from './utils/post-data'

const options = {
  getRoute: '/',
  postRoute: '/api',
  useSession: true,
  onFormEnd: (errors, formData) => {
    if (errors) throw new Error("Failed to post form data", errors);
    postData(formData);
  },
}

export const { postMiddleware, getHandler, Forms } = govBuilder(schema, uiSchema, options);
