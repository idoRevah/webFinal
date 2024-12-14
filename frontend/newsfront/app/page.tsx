import Image from "next/image";

function greeting(name: string) {
  return `hello ${name}`
}

function DocsLink({name="ido"}: any) {
  const text = "Read My Docs Ya!"
  return (<a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        {greeting(name)}
        { text }
    </a>)
}


export default function Home() {
  return (
    <div>
      <DocsLink name="eden"></DocsLink>
      <DocsLink></DocsLink>
    </div>
  );
}
