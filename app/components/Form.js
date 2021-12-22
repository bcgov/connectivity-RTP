import { Forms } from '../form-schema';
import { useRouter } from 'next/router';

export default function Form({ formIndex, formData, validPage }) {
  const Form = Forms[formIndex];
  const router = useRouter();

  const rerouteHandler = (nextPage, _isValid, lastPage) => {
    router.push(lastPage ? '/end' : nextPage);
  };

  validPage = true;
  return (
    <>
      {validPage && <Form formData={formData} />}
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  await applySession(req, res);
  const { formIndex, formData, validPage } = getHandler(req);
  return {
    props: { formIndex, formData, validPage },
  };
}
