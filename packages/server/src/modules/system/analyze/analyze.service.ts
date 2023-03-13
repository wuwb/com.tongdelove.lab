import { Injectable } from "@nestjs/common";



@Injectable()
export class AnalyzeService {
    constructor() { }

    async getCallTime() { }

    async cleanAnalyzeRange() { }

    async getIpAndPvAggregate() { }

    async getRangeAnalyzeData(
        from = new Date(+new Date() - 365 * 24 * 60 * 60 * 1000),
        to = new Date(),
        options
    ) { }

    async getRangeOfTopPathVisitor() { }

    async getTodayAccessIp(): Promise<string[]> {
        return Promise.resolve(['']);
    }
}
