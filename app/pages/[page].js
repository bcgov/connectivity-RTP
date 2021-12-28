import React from "react";
import { applySession } from "next-session";
import { useRouter } from "next/router";
import { Forms, getHandler } from "../form-schema";
import Button from "@button-inc/bcgov-theme/Button";

export default function home({ formIndex, formData, validPage, prevPageUrl }) {
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
      {validPage && (
        <Form formData={formData} rerouteHandler={rerouteHandler}>
          {!onFirstPage && (
            <Button type="button" variant="secondary" onClick={handleBackClick}>
              Back
            </Button>
          )}
          <Button variant="primary">Continue</Button>
        </Form>
      )}
      <Button variant="secondary" onClick={() => router.push("/")}>Cancel</Button>
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
