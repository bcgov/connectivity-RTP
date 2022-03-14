import React from "react";
import { useEffect, useState } from "react";
import { applySession } from "next-session";
import { useRouter } from "next/router";
import { Forms, getHandler } from "../../form-schema";
import SButton from "../../components/SButton";
import MainStyledDiv from "../../components/MainStyledDiv";
import BCGovTitle from "../../components/BCGovTitle";
import { LAST_PAGE } from "../../services/application";
import { queryData, queryUser } from "../../utils/query-data";
import schema from "../../schemas/schema";

export default function home({ formIndex, formData, validPage, prevPageUrl }) {
  const [status, setStatus] = useState("");
  const Form = Forms[formIndex];
  const router = useRouter();
  const onFirstPage = prevPageUrl === -1;
  const currentPage = formIndex + 1;
  const continueButtonText = LAST_PAGE !== currentPage ? "Continue" : "Review";

  const rerouteHandler = (nextPage, _isValid, lastPage) => {
    router.push(nextPage);
  };

  const handleBackClick = () => {
    if (onFirstPage) return;
    router.push(`/form${prevPageUrl}`);
  };

  const buttonDisabled = () => {
    if (status === "complete") return true;
  };

  const pageTitle = (schema, formIndex) => {
    const titles = Object.values(schema.properties).reduce((prev: Array<String>, {title}) => {
      return [...prev, title];
    }, []);
    return titles[formIndex]
  }

  const renderDesc = (formIndex) => {
    if (formIndex === 3) {
      return (
        <div>
          <p>
            This section refers to the areas of the province, or zones, you are
            providing information for. Details on zones are in the RTP document.
          </p>
        </div>
      )
    }
    if (formIndex === 4) {
      return (
        <div>
          <p>
            This section is to provide feedback on potential areas for expansion
            of high-speed internet. We are looking for respondents to identify
            areas were fibre, coax or fixed wireless could be expanded. If this
            is not your area of expertise, please skip to the next section.
          </p>
        </div>
      )
    }
    if (formIndex === 5) {
      return (
        <div>
          <p>
            This section focuses on existing backbone infrastructure. If this is not
            your area of expertise, skip to the next section. Existing backbone is
            defined as transport that connects to an existing point of present (“PoP”)
            in the community. New backbone is defined by requiring fibre or microwave
            transport to access a PoP in another community to support your last mile
            project.
          </p>
        </div>
      )
    }
    if (formIndex === 6) {
      return (
        <div>
          <p>
            This section is for local and regional governments and First Nations to
            offer additional feedback on internet connectivity in their communities.
          </p>
        </div>
      )
    }
    if (formIndex === 7) {
      return (
        <div>
          <p>
            This section provides an opportunity to add internet connectivity infrastructure
            information that will help meet the objectives outlined in the RTP document.
          </p>
        </div>
      )
    }
    if (formIndex === 8) {
      return (
        <div>
          <p>
            This section is to provide feedback on the gaps in highway cellular coverage in
            the province. The Province has identified gaps in cellular service along highways
            (with power) in B.C. The gaps are highlighted in the KMZ file for Highway Cellular.
            Information on how to download the KMZ files is linked in Appendix D.
          </p>
        </div>
      )
    }
    if (formIndex === 9) {
      return (
        <div>
          <p>
            This section is for organizations to upload Geomarks for any information
            mentioned in your response. This is a recommended step for organizations
            that have the capacity, but is not mandatory. Please paste a Geomark URL for
            the information you have referred to in earlier sections of your response.
            Note: This is for underserved areas where the specified technology is most
            viable and suitable. For instructions on creating a Geomark, or for help
            with creating a Geomark, please refer to Appendix A, Q8 in the RTP document.
          </p>
        </div>
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await queryUser();
      setStatus(response.data.allApplications.nodes[0].status);
    }
    fetchData();
  }, [MainStyledDiv]);

  return (
    <>
      <MainStyledDiv>
        <BCGovTitle>{pageTitle(schema, formIndex)}</BCGovTitle>
        {renderDesc(formIndex)}
        {validPage && (
          <Form formData={formData} rerouteHandler={rerouteHandler}>
            {!onFirstPage && (
              <SButton
                type="button"
                variant="secondary"
                onClick={handleBackClick}
                disabled={buttonDisabled()}
              >
                Back
              </SButton>
            )}
            <SButton variant="primary" disabled={buttonDisabled()}>
              {continueButtonText}
            </SButton>
          </Form>
        )}
      </MainStyledDiv>
    </>
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
  await applySession(context.req, context.res);
  const { formIndex, validPage, prevPageUrl = null } = getHandler(context.req);
  const props = { formIndex, validPage, prevPageUrl };
  const res = await queryData(context.req);
  if (res) {
    props["formData"] = res.oldFormData;
  }
  if (!props["formData"]) {
    props["formData"] = {};
  }
  return {
    props,
  };
};
