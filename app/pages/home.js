import StyledDiv from '../components/StyledDiv';
import Card from '@button-inc/bcgov-theme/Card'
import { Alert, Button } from '@button-inc/bcgov-theme';
import { Table } from 'semantic-ui-react';

export default function home() {
  return (
    <>
      <StyledDiv>
        <Alert
          content="Welcome User."
          size="medium"
          variant="success"
        />
        <Card title="In-Progress Applications">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Application ID</Table.HeaderCell>
                <Table.HeaderCell>Application Date</Table.HeaderCell>
                <Table.HeaderCell>Resume?</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>#12345</Table.Cell>
                <Table.Cell>December 29, 2021</Table.Cell>
                <Table.Cell><Button size="small">Resume</Button></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>#54321</Table.Cell>
                <Table.Cell>December 28, 2021</Table.Cell>
                <Table.Cell><Button size="small">Resume</Button></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>#67890</Table.Cell>
                <Table.Cell>December 27, 2021</Table.Cell>
                <Table.Cell><Button size="small">Resume</Button></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card>
        <Card title="Completed Applications">

        </Card>
        <Card title="Start New Application">

        </Card>
      </StyledDiv>
    </>
  )
};
