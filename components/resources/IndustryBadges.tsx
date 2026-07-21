import { Badge } from "@/components/ui/Badge";
import { INDUSTRIES, type Industry } from "@/lib/taxonomy";

const MAX_VISIBLE = 3;

/** Industry badges for card displays, capped with a "+N more" indicator. */
export function IndustryBadges({ industries }: { industries: Industry[] }) {
  const visible =
    industries.length > MAX_VISIBLE ? industries.slice(0, MAX_VISIBLE) : industries;
  const hidden = industries.length - visible.length;

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((i) => (
        <Badge key={i}>{INDUSTRIES[i]}</Badge>
      ))}
      {hidden > 0 && <Badge className="text-muted">+{hidden} more</Badge>}
    </div>
  );
}
