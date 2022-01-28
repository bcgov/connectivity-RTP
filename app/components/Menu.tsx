import Link from 'next/link';

export default function Menu() {
  return (
    <>
      <ul>
        <li>
          <Link href="/home">
            <a>Lorem</a>
          </Link>
        </li>
        <li>
          <Link href="/home">
            <a>Ipsum</a>
          </Link>
        </li>
        <li>
          <Link href="/home">
            <a>Dolor</a>
          </Link>
        </li>
      </ul >
    </>
  )
}
