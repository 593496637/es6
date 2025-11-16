// app/posts/loading.tsx

export default function PostsLoading() {
  return (
    <main className='min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-black'>
      <div className='w-full max-w-3xl px-4 py-8'>
        <div className='h-6 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800' />
        <div className='mt-2 h-4 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800' />

        <div className='mt-6 space-y-4'>
          {/* 骨架列表占位 */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className='rounded-lg border border-zinc-200 bg-white p-4 dark:bg-zinc-900 dark:border-zinc-800'
            >
              <div className='h-5 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700' />
              <div className='mt-2 h-3 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700' />
              <div className='mt-3 h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700' />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
