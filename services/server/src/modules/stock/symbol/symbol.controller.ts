import { Get, Param, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import * as dip from 'dipiper'

@ApiTags('stock/symbol')
@Controller('api/stock/symbol')
export class SymbolController {
  @Get('/:id')
  async stock(@Param('id') id: string) {
    const data = await dip.stock.symbols.getBoards(id)
    return data
  }

  @Get('/')
  async stocks() {
    const data = await dip.stock.symbols.getStockList()
    return data
  }
}
