import MainStyledDiv from "components/MainStyledDiv";
import ConfirmDiv from "components/ConfirmDiv";

const styles = {
  cardText: {
    fontWeight: 300,
    fontSize: "30px",
    padding: "24px 0 8px 0",
    marginBottom: "0",
  },
  cardTitle: {
    marginBottom: "0",
  },
};

export default function end() {
  return (
    <MainStyledDiv>
      <ConfirmDiv>
        <h1 style={styles.cardTitle}>Request Complete</h1>
        <h4 style={styles.cardText}>Your reference number</h4>
        <h2 style={styles.cardTitle}>KH963IJ</h2>
      </ConfirmDiv>
      <h2>What happpens next</h2>
      <p>Your data will be sent to Network BC.</p>
      <p>
        You will be contacted to confirm the areas covered in your geomarks, and
        we will be in touch regarding the available funding program.
      </p>
    </MainStyledDiv>
  );
}

export const getServerSideProps = async (context) => {
  if (!context.req.claims) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
