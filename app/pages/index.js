import styled from 'styled-components';
import Link from 'next/link';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  return (
    <>
      <Link href="/1">
        &#9997; Create Profile
      </Link>
    </>
  )
};
