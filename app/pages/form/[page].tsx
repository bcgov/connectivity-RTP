import React from "react";
import { useEffect, useState } from "react";
import { applySession } from "next-session";
import { useRouter } from "next/router";
import { Forms, getHandler } from "../../form-schema";
import SButton from "../../components/SButton";
import StyledDiv from "../../components/MainStyledDiv";
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

  const renderGeomarkDesc = (formIndex) => {
    return formIndex === 7 &&  (
      <div>
        The Geomark Web Service allows you to create and share geographic areas in a variety of
        formats and coordinate systems. A geomark can be created from common files such as Google
        Earth’s KML or KMZ, ESRI shapefile, GeoJSON, Geography Markup Language (GML), or
        Well-Known Text Geometry (WKT). A geomark can also be created in Google Earth or from
        other Geomarks. All instructions for creating a Geomark can be found at
        https://www2.gov.bc.ca/gov/content/data/geographic-data-services/location-services/geomark-webservice
        Geomarks can be created at: https://apps.gov.bc.ca/pub/geomark/geomarks Contact for help
        with Geomarks can be found at https://dpdd.atlassian.net/servicedesk/customer/portal/1/group/7/create/6
        Assuming that whole or part of capital costs of building connectivity infrastructure is covered by a
        funding program, please paste a Geomark URL for underserved areas where the following technology
        is most viable and suitable:
      </div>
    )
  }

  useEffect(() => {
    async function fetchData() {
      const response = await queryUser();
      setStatus(response.data.allApplications.nodes[0].status);
    }
    fetchData();
  }, [StyledDiv]);

  return (
    <>
      <StyledDiv>
        <BCGovTitle>{pageTitle(schema, formIndex)}</BCGovTitle>
        {renderGeomarkDesc(formIndex)}
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
      </StyledDiv>
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
