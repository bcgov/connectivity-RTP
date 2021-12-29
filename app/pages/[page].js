import React from "react";
import { applySession } from "next-session";
import { useRouter } from "next/router";
import { Forms, getHandler } from "../form-schema";
import SButton from '../components/SButton';
import StyledDiv from "../components/StyledDiv";

export default function apply({ formIndex, formData, validPage, prevPageUrl }) {
  const Form = Forms[formIndex];
  const router = useRouter();
  const onFirstPage = prevPageUrl === -1;

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
            <SButton variant="primary">Continue</SButton>
          </Form>
        )}
        <SButton variant="secondary" onClick={() => router.push("/")}>Cancel</SButton>
      </StyledDiv>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  await applySession(req, res);
  const { formIndex, formData, validPage, prevPageUrl } = getHandler(req);
  return {
    props: { formIndex, formData, validPage, prevPageUrl },
  };
}
