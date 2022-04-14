import { govBuilder } from '@button-inc/form-schema';
import schema from './schemas/schema';
import uiSchema from './schemas/uiSchema';
import postData from './utils/post-data';
import { queryData } from './utils/query-data';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.HOST}`
    : `http://localhost:${process.env.PORT || 3000}`;

const options = {
  getRoute: '/form',
  postRoute: '/api',
  useSession: false,
  onFormEnd: (errors, formData, req) => {
    // postData({ formData, applicationId, status: "complete" }, req);
  },
  onPost: (formData, schemaIndex, cleanSchemaData, req) => {
    queryData(req).then(({ oldFormData, applicationId }) => {
      const mergedData = { ...oldFormData, ...formData };
      postData({ formData: mergedData, applicationId }, req).then(
        (savedMergedData) => {
          const newFormData = cleanSchemaData(
            savedMergedData.allApplications.nodes[0].formData
          );
        }
      );
    });
    return formData;
  },
  validateEachPage: true,
  validatedUrl: '/review',
  invalidUrl: '/error',
};

export const { postMiddleware, getHandler, Forms } = govBuilder(
  schema,
  uiSchema,
  options
);
