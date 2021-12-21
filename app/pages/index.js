import styled from 'styled-components';
import { Footer, Navigation } from '@button-inc/bcgov-theme';
import Menu from '../components/Menu';
import JsonSchemaForm from '@rjsf/semantic-ui';
import schema from '../schemas/schema';
import uiSchema from '../schemas/uiSchema';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const SFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
`

const SJsonSchemaForm = styled(JsonSchemaForm)`
  max-width: 90%;
  margin: auto;
`

const handleSubmit = (data) => {
  console.log(data.formData);
}

export default function Home() {
  return (
    <>
      <Navigation
        header="main"
        title="Welcome to Connectivity Intake"
      />
      <Title>Connectivity Intake Form</Title>
      <SJsonSchemaForm
        name="connectivity-intake"
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={handleSubmit}
      />
      <SFooter>
        <Menu />
      </SFooter>
    </>
  )
}
