"use client";

import { useId, useState } from "react";

export function PostTargetControl({
  defaultEnabled = false,
  defaultTarget,
  error,
}: {
  defaultEnabled?: boolean;
  defaultTarget?: number | null;
  error?: string;
}) {
  const id = useId();
  const [enabled, setEnabled] = useState(defaultEnabled);
  const [target, setTarget] = useState(defaultTarget?.toString() ?? "");

  return (
    <div className="space-y-3">
      <label className="flex cursor-pointer items-center justify-between gap-4">
        <span>
          <span className="admin-label mb-1 block">Post Target</span>
          <span id={id + "-hint"} className="block text-xs text-muted-grey">
            {enabled
              ? "Show posts against your campaign target."
              : "Show the current number of posts only."}
          </span>
        </span>
        <input
          className="admin-post-target-switch"
          type="checkbox"
          role="switch"
          aria-label="Post Target"
          aria-describedby={id + "-hint"}
          aria-controls={id + "-fields"}
          name="post_target_enabled"
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
        />
      </label>
      <div id={id + "-fields"} hidden={!enabled}>
        <label className="admin-label" htmlFor={id + "-number"}>
          Target posts
        </label>
        <input
          id={id + "-number"}
          name="target_posts"
          type="number"
          min="1"
          max="10000"
          step="1"
          className="admin-input"
          placeholder="30"
          required={enabled}
          disabled={!enabled}
          value={target}
          onChange={(event) => setTarget(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={id + "-note"}
        />
        <p id={id + "-note"} className="mt-1 text-xs text-muted-grey">
          You can change this later. Existing posts are unaffected.
        </p>
        {error ? <p className="admin-field-error">{error}</p> : null}
      </div>
    </div>
  );
}
