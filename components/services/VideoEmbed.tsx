/**
 * Responsive, privacy-friendly YouTube embed (youtube-nocookie).
 * `id` is the YouTube video id (e.g. the part after youtu.be/).
 */
export function VideoEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-surface">
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
