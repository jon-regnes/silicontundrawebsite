import { Badge } from "@/components/ui/Badge";
import { VERTICALS, type Vertical } from "@/lib/verticals";

const MAX_VISIBLE = 3;

/** Vertical badges for card displays, capped with a "+N more" indicator. */
export function VerticalBadges({ verticals }: { verticals: Vertical[] }) {
  const visible =
    verticals.length > MAX_VISIBLE ? verticals.slice(0, MAX_VISIBLE) : verticals;
  const hidden = verticals.length - visible.length;

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((v) => (
        <Badge key={v}>{VERTICALS[v]}</Badge>
      ))}
      {hidden > 0 && <Badge className="text-muted">+{hidden} more</Badge>}
    </div>
  );
}
