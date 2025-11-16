import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black'>
      <h1 className='text-3xl font-bold text-black dark:text-zinc-50'>
        你好，Next.js 👋
      </h1>
      <p className='mt-4 text-lg text-zinc-600 dark:text-zinc-400'>
        这是我自己改过的首页。
      </p>

      <div className='mt-8 flex gap-4'>
        <Link
          href='/ssr-demo'
          className='rounded bg-black px-4 py-2 text-sm text-zinc-100 dark:bg-zinc-100 dark:text-black'
        >
          看 SSR Demo
        </Link>
        <Link
          href='/csr-demo'
          className='rounded border border-zinc-400 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200'
        >
          看 CSR Demo
        </Link>
      </div>
    </main>
  );
}
