import React from "react";
import { applySession } from "next-session";
import { useRouter } from "next/router";
import { Forms, getHandler } from "../../form-schema";
import SButton from "../../components/SButton";
import StyledDiv from "../../components/MainStyledDiv";
import { LAST_PAGE } from "../../services/application";
import { queryData } from "../../utils/query-data";

export default function home({ formIndex, formData, validPage, prevPageUrl }) {
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
    router.push(`/form/${prevPageUrl}`);
  };

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
              >
                Back
              </SButton>
            )}
            <SButton variant="primary">{continueButtonText}</SButton>
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
