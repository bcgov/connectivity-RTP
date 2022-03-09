import Link from 'next/link';

export default function FooterLinks() {
  return (
    <>
      <ul>
        <li>
          <Link href="https://www2.gov.bc.ca/gov/content/home/disclaimer">
            <a>Disclaimer</a>
          </Link>
        </li>
        <li>
          <Link href="https://www2.gov.bc.ca/gov/content/home/privacy">
            <a>Privacy</a>
          </Link>
        </li>
        <li>
          <Link href="https://www2.gov.bc.ca/gov/content/home/accessible-government">
            <a>Accessibility</a>
          </Link>
        </li>
        <li>
          <Link href="https://www2.gov.bc.ca/gov/content/home/copyright">
            <a>Copyright</a>
          </Link>
        </li>
      </ul>
    </>
  );
}
