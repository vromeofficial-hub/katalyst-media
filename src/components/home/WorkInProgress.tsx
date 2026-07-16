import type { CSSProperties } from "react";
import "./work-in-progress.css";

const TEXT_LAYERS = [0, 1, 2, 3] as const;
const SPAN_COUNT = 16;
const LABEL = "In Progress";

export function WorkInProgress() {
  return (
    <div className="work-in-progress mt-8 border-t border-border-dark pt-8">
      <p className="work-in-progress__copy max-w-xl text-soft-grey">
        Campaign examples are currently being prepared. Published work will appear
        here once artists have given permission to share them.
      </p>

      <div className="work-3d" role="status" aria-label={LABEL}>
        <div className="work-3d__diagonal">
          <div className="work-3d__float">
            <div className="work-3d__scene" aria-hidden="true">
              <div className="work-3d__texts">
                {TEXT_LAYERS.map((text) => (
                  <div
                    key={text}
                    className="work-3d__text"
                    style={{ "--text": text } as CSSProperties}
                  >
                    {Array.from({ length: SPAN_COUNT }, (_, i) => (
                      <span key={i} style={{ "--i": i } as CSSProperties}>
                        {LABEL}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
