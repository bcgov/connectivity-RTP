import React from "react";
import { useEffect, useState } from "react";
import { applySession } from "next-session";
import { useRouter } from "next/router";
import { Forms, getHandler } from "../../form-schema";
import SButton from "../../components/SButton";
import FormStyledDiv from "../../components/FormStyledDiv";
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
            This question is to indicate which zones or regions of the province
            you are providing feedback for in the RTP.
          </p>
        </div>
      )
    }
    if (formIndex === 4) {
      return (
        <div>
          <p>
            This section is to provide feedback on potential areas for expansion of
            high-speed internet. We are looking for respondents to identify areas where
            fibre, coax or fixed wireless could be expanded.
          </p>
        </div>
      )
    }
    if (formIndex === 5) {
      return (
        <div>
          <p>
            This section focuses on existing backbone infrastructure. For the information
            described in Q3, is there existing backbone infrastructure to deliver the last
            mile projects as specified? Existing backbone is defined by connecting to a
            point of presence (“PoP”) in the community. New backbone is defined by requiring
            fibre or microwave transport to access a PoP in another community to support
            your last mile project.
          </p>
        </div>
      )
    }
    if (formIndex === 6) {
      return (
        <div>
          <p>
            This section provides an opportunity to provide additional specific information
            that will help meet the objectives outlined in the RTP.
          </p>
          <p>
            This section asks respondents about any upcoming connectivity plans or projects
            we should know about to understand the remaining gaps in the province.
          </p>
        </div>
      )
    }
    if (formIndex === 7) {
      return (
        <div>
          <p>
            This section is to provide feedback on the gaps in highway cellular coverage
            in the province. The Province has identified gaps in cellular service along
            highways (with power) in B.C. The gaps are highlighted in the KMZ file for Highway
            Cellular. Information on how to download the KMZ files is linked in Appendix D
            of the Request to Participate.
          </p>
        </div>
      )
    }
    if (formIndex === 9) {
      return (
        <div>
          <p>
            This section is for any project mentioned in the RTP. Assuming that whole or part
            of capital costs of building connectivity infrastructure could be covered by a
            funding program, please paste a Geomark URL for the projects you have referred to
            in earlier sections of your response. Note this is for underserved areas where
            the following technology is most viable and suitable:
          </p>
        </div>
      )
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await queryUser();
      setStatus(response.data.allApplications.nodes[0].status);
    }
    fetchData();
  }, [FormStyledDiv]);

  return (
    <>
      <FormStyledDiv>
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
      </FormStyledDiv>
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
