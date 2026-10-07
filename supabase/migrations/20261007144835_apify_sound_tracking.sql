-- Preserve existing counts/history and record where each new observation came from.
alter table public.sound_metric_snapshots
  add column if not exists source text not null default 'legacy',
  add column if not exists provider_run_id text;

alter table public.sound_metric_snapshots
  add constraint sound_metric_snapshots_source_check
  check (source in ('legacy', 'soundcharts', 'apify'));

comment on column public.sound_metric_snapshots.provider_data_date is
  'Date of the provider observation; Apify dates come from the successful scrape, never campaign creation.';
comment on column public.sound_metric_snapshots.provider_run_id is
  'Non-secret provider run ID for auditability; never an API token.';
