import { Controller, Get, Render, Body, Post, Res } from "@nestjs/common";
import { Company } from './company';
import { get } from "http";

@Controller('dashboard')
export class DashboardController {
    private companies = [
        new Company("Coke", "Soda"),
        new Company("Apple", "Computers"),
        new Company("Tesla", "Cars")
    ];

    @Get()
    @Render('dashboard')
    Root(@Res() res) {

        return {
            a: '1',
        };
    }

    @Get()
    getCompanies() {
        return this.companies;
    }

    @Post()
    createCompany(@Body() company: Company) {
        this.companies.push(company);
    }

    @Get()
    call() {
        // return this.heroService.findOne({ id: 1 });
    }
}
