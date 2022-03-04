import React from "react";
import { useEffect, useState } from "react";
import { applySession } from "next-session";
import { useRouter } from "next/router";
import { Forms, getHandler } from "../../form-schema";
import SButton from "../../components/SButton";
import StyledDiv from "../../components/MainStyledDiv";
import { LAST_PAGE } from "../../services/application";
import { queryData, queryUser } from "../../utils/query-data";

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
