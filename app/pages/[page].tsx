import React from "react";
import { applySession } from "next-session";
import { useRouter } from "next/router";
import { Forms, getHandler } from "../form-schema";
import SButton from '../components/SButton';
import StyledDiv from "../components/StyledDiv";
import { LAST_PAGE } from "../services/application";

export default function home({ formIndex, formData, validPage, prevPageUrl }) {
  const Form = Forms[formIndex];
  const router = useRouter();
  const onFirstPage = prevPageUrl === -1;
  const currentPage = formIndex + 1;
  const continueButtonText = LAST_PAGE !== currentPage ? "Continue" : "Apply";

  const rerouteHandler = (nextPage, _isValid, lastPage) => {
    router.push(lastPage ? "/end" : nextPage);
  };

  const handleBackClick = () => {
    if (onFirstPage) return;
    router.push(prevPageUrl);
  };

  return (
    <>
      <StyledDiv>
        {validPage && (
          <Form formData={formData} rerouteHandler={rerouteHandler}>
            {!onFirstPage && (
              <SButton type="button" variant="secondary" onClick={handleBackClick}>
                Back
              </SButton>
            )}
            <SButton variant="primary">{continueButtonText}</SButton>
          </Form>
        )}
        <SButton variant="secondary" onClick={() => router.push("/home")}>Cancel</SButton>
      </StyledDiv>
    </>
  );
}

export const getServerSideProps = async (context) => {
  if (!context.req.claims) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  await applySession(context.req, context.res);
  const { formIndex, formData, validPage, prevPageUrl = null } = getHandler(context.req);
  return {
    props: { formIndex, formData, validPage, prevPageUrl },
  }
};
