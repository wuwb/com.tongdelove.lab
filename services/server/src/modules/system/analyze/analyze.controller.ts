import { Controller, Get, Query, Scope } from "@nestjs/common";
import { AnalyzeService } from "./analyze.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('system/analyze')
@Controller({
    path: 'api/system/analyze',
    scope: Scope.REQUEST,
})
export default class AnalyzeController {
    constructor(
        private readonly analyzeService: AnalyzeService,
    ) { }

    @Get('/')
    async getOne(@Query() query) {

        const { from, to = new Date(), page = 1, size = 50 } = query

        const data = await this.analyzeService.getRangeAnalyzeData(from, to, {
            limit: size | 0,
            page,
        })

        return data
    }
}
