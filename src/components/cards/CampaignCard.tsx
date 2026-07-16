import { campaignStatusLabels, type Campaign } from "@/content/projects";
import { cn } from "@/lib/utils";

export function CampaignCard({
  campaign,
  className,
}: {
  campaign: Campaign;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col border-t border-border-dark pt-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-off-white">
            {campaign.trackName}
          </h3>
          <p className="mt-1 text-sm text-muted-grey">{campaign.artistName}</p>
        </div>
        <span className="shrink-0 text-[0.7rem] font-medium tracking-[0.04em] text-acid-lime">
          {campaignStatusLabels[campaign.status]}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-soft-grey">
        {campaign.shortDescription}
      </p>
      {campaign.contentCategories.length > 0 ? (
        <p className="mt-4 text-xs text-muted-grey">
          {campaign.contentCategories.join(" · ")}
        </p>
      ) : null}
      {campaign.participatingCreators != null ? (
        <p className="mt-2 text-xs text-muted-grey">
          {campaign.participatingCreators} participating creators
        </p>
      ) : null}
      {campaign.publicResults.length > 0 ? (
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {campaign.publicResults.map((result) => (
            <div key={result.label}>
              <dt className="text-xs text-muted-grey">{result.label}</dt>
              <dd className="mt-1 font-display text-lg font-semibold text-acid-lime">
                {result.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}
