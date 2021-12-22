import styled from 'styled-components';
import { Footer, Navigation, Button } from '@button-inc/bcgov-theme';
import Menu from '../components/Menu';
import JsonSchemaForm from '@rjsf/semantic-ui';
import schema from '../schemas/schema';
import uiSchema from '../schemas/uiSchema';
import Form from '../components/Form';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const SFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const SJsonSchemaForm = styled(JsonSchemaForm)`
  max-width: 90% !important;
  margin: auto !important;
  margin-top: 25px !important;
`;

const handleSubmit = ({ formData }, e) => {
  console.log(formData);
};

export default function Home({ formData }) {
  return (
    <>
      <Navigation
        header="main"
        title="Connectivity Intake"
      >
        <Menu />
      </Navigation>
      <Form />
      {/* <SJsonSchemaForm
        name="connectivity-intake"
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={handleSubmit}
      >
        <>
          <Button
            size="medium"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            size="medium"
            variant="secondary"
            type="reset"
          >
            Cancel
          </Button>
        </>
      </SJsonSchemaForm> */}
      <SFooter>
        <Menu />
      </SFooter>
    </>
  )
};
