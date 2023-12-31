import { TraceContext } from "@/core/trace/contexts/Trace.context";

export class TraceUtil {
    static getTraceId(): string {
        return TraceContext.getTraceId();
    }
}
