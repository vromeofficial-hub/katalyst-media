export class SoundchartsRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly stage: "authentication" | "lookup" | "audience",
  ) {
    super(message);
    this.name = "SoundchartsRequestError";
  }
}
