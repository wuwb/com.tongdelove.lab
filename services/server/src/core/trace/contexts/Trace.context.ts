export class TraceContext {
  private static traceId: string

  public static setTraceId(id: string): void {
    TraceContext.traceId = id
  }

  public static getTraceId(): string {
    return TraceContext.traceId
  }
}
