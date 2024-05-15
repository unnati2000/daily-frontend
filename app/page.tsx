import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        <li>
          <Link href="/toggle">Toggle</Link>
        </li>

        <li>
          <Link href="/folder">Folder</Link>
        </li>

        <li>
          <Link href="/table">Table</Link>
        </li>
      </ul>
    </main>
  );
}

