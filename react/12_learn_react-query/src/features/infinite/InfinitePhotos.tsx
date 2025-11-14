import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPhotoPage, type Photo } from '../../api/jsonPlaceholder';

const PAGE_SIZE = 9;

export default function InfinitePhotos() {
  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam }) => fetchPhotoPage(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (lastPage.length < PAGE_SIZE ? undefined : pages.length + 1),
  });

  const photos = data?.pages.flat() ?? [];

  return (
    <div className="panel">
      <div className="panel-toolbar">
        <div>
          <p className="eyebrow">useInfiniteQuery</p>
          <p className="muted">JSONPlaceholder /photos - 每页 {PAGE_SIZE} 条</p>
        </div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? '加载中...' : hasNextPage ? '加载下一页' : '没有更多数据'}
        </button>
      </div>

      {isPending && <p className="muted">正在加载图片数据...</p>}
      {isError && <p className="error-text">{error instanceof Error ? error.message : '请求失败'}</p>}

      <div className="photo-grid">
        {photos.map((photo: Photo) => (
          <figure key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} loading="lazy" />
            <figcaption>{photo.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
