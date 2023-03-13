import { Get, Param, Controller, Post, UseInterceptors, UploadedFile, Res, StreamableFile, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as sendToWormhole from 'stream-wormhole';
import { basename, join } from 'path';
import { CastingContext, parse } from 'csv-parse';
import * as iconv from 'iconv-lite';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Prisma } from '@prisma/client';
import { TaobaoService } from './taobao.service';
import { CustomerService } from '@/modules/erp/customer/customer.service';

@ApiTags('taobao')
@Controller('api/taobao')
export class TaobaoController {

  constructor(
    private readonly taobaoService: TaobaoService,
    private readonly customerService: CustomerService,
  ) { }

  @Post('/upload-taobao-order-csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTaobaoOrderCSV(@UploadedFile() file: Express.Multer.File) {
    const fileStreamObj = new StreamableFile(file.buffer);
    const fileStream = fileStreamObj.getStream();

    const name = 'csv/' + basename(file.originalname);
    // 文件处理，上传到云存储等等
    let result;
    try {
      // result = await ctx.oss.put(name, fileStream);
      // TODO 将原始文件保存到 oss
      result = { "url": "http://printlake.oss-cn-beijing.aliyuncs.com/egg-multipart-test/ExportOrderList202101261213.csv", "fields": {} }
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(fileStream);
      throw err;
    }


    let records = await this.parseTaobaoOrder(fileStream);

    console.log('records: ', records);

    let parsedRecords = records.map((item) => {

      return {
        'id': item[0],
        'buyerName': item[1],
        'buyerNick': item[2],
        'payId': item[3],
        'payDetail': item[4],
        'tradePayable': Number(item[5]), // 应付金额
        'postage': Number(item[6]),
        'integration': Number(item[7]),
        'total': Number(item[8]),
        'rebateIntegration': Number(item[9]),
        'realTotal': Number(item[10]),
        'realIntegration': Number(item[11]),
        'status': item[12],
        'message': item[13], // 买家留言
        'receiver': item[14],
        'address': item[15] ? item[15] : '',
        'deliveryMode': item[16],
        'telephone': item[17],
        'cellphone': item[18],
        'virtualNumberExpirationAt': (!!item[19] && item[19] !== null && item[19] !== 'null') ? new Date(item[19]) : new Date(0),
        'orderCreatedAt': (!!item[20] && item[20] !== null && item[20] !== 'null') ? new Date(item[20]) : new Date(0),
        'payAt': (item[21] && item[21] !== null && item[21] !== 'null') ? new Date(item[21]) : new Date(0),
        'goodsTitle': item[22],
        'goodsType': Number(item[23]),
        'deliveryOrder': item[24],
        'deliveryCompany': item[25],
        'orderNote': item[26] ? item[26] : '',
        'goodsCount': Number(item[27]),
        'shopId': item[28],
        'shopName': item[29],
        'closedReason': item[30],
        'sellerSerivce': Number(item[31]),
        'buyerService': item[32] ? Number(item[32].replace('元', '')) : 0,
        'invoiceTitle': item[33],
        'isCellphoneOrder': item[34],
        'stagingOrderInfo': item[35],
        'privilegeDownPaymentOderId': Number(item[36]) ? Number(item[36]) : 0,
        'isUploadContractPicture': Number(item[37]) ? Number(item[37]) : 0,
        'isUploadInvoicePicture': Number(item[38]) ? Number(item[38]) : 0,
        'isPayForAnother': Number(item[39]) ? Number(item[39]) : 0,
        'downPaymentRank': Number(item[40]) ? Number(item[40]) : 0,
        'modifiedSku': item[41],
        'modifiedAddress': item[42],
        'exceptionMessage': item[43],
        'tmallCouponDeduction': Number(item[44]) ? Number(item[44]) : 0,
        'integrationDeduction': Number(item[45]) ? Number(item[45]) : 0,
        'isO2OOrder': Number(item[46]) ? Number(item[46]) : 0,
        'newRetailTradeType': item[47],
        'newRetailGuideShopName': item[48],
        'newRetailGuideShopId': item[49] !== 'null' ? item[49] : '',
        'newRetailDeliverShopName': item[50],
        'newRetailDeliverShopId': item[51],
        'refundAmount': Number(item[52]) ? Number(item[52]) : 0,
        'appointmentShop': item[53],
        'confirmReceiptAt': (!!item[54] && item[54] !== null && item[54] !== 'null') ? new Date(item[54]) : new Date(0),
        'remitNum': (!!item[55] && item[55] !== null && item[55] !== 'null') ? Number(`${item[55]}`.replace('元', '')) : 0,
        'personalRedEnvelope': item[56],
        'isCreditBuy': (!!item[57] && item[57] !== '否') ? 1 : 0, // NaN
        'experienceEndAt': new Date(item[58] ? item[58] : 0),
        'topNGift': item[59],
        'deliveryType': item[60],
        'liveCashbackStatus': item[61],
        'cashbackAmount': Number(item[62]) ? Number(item[62]) : 0,
        'slowDeliveryCompensate': Number(item[63]) ? Number(item[63]) : 0,
        'newRetailDealShopName': item[64],
        'newRetailDealShopId': item[65],
        'newRetailDealDealerId': item[66],
        'isPresell': Number(item[67]) ? Number(item[67]) : 0,
        'deliveryAt': (!!item[68] && item[68] !== null && item[68] !== 'null') ? new Date(item[68]) : new Date(0),
        'comment': item[69] && item[69] !== 'NaN' ? item[69] : '',
        'masterOrderId': item[70],
      };
    });

    let data = await this.taobaoService.createTaobaoOrderRaws(parsedRecords);

    // 转化数据，存进数据库

    return {
      url: result.url,
      // 所有表单字段都能通过 `fileStream.fields` 获取到
      fields: fileStream,
      data,
    };
  }

  @Post('/upload-test')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('/order-raw')
  async taobaoOrderRaws(
    @Query('current') current: number,
    @Query('pageSize') pageSize: number,
    @Query('sorter') sorter: string,
    @Query('filter') filter: string) {

    return this.taobaoService.taobaoOrderRaws({
      skip: (current - 1) * pageSize,
      take: pageSize,
      where: JSON.parse(filter),
      orderBy: JSON.parse(sorter),
    });
  }

  private async parseTaobaoOrder(stream): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const parser = parse({
        // bom: true,
        // cast: function (value: string, context: CastingContext) {
        //   // 对特殊列进行处理
        //   // console.log('value: ', typeof value, value);

        //   if (context.column === 13) {
        //     // console.log('message: ', typeof value, value);
        //   }

        //   if ([5, 6, 7, 8, 9, 10, 11, 23, 27, 31, 36, 37, 38, 39, 40, 44, 45, 46, 52, 55, 62, 63, 67].indexOf(context.column as number) > -1) {
        //     return Number(value);
        //   }
        //   // 对特殊类型处理
        //   if (value === '是') {
        //     return 1;
        //   }
        //   if (value === 'NaN') {
        //     return '';
        //   }
        //   if (value === 'null') {
        //     return '';
        //   }
        //   if (value === '\'null') {
        //     return '';
        //   }
        //   if (value.indexOf('元') === (value.length - 1)) {
        //     return Number(value.replace('元', ''));
        //   }

        //   return `${value}`;
        // },
        // auto_parse: true,
        // cast_date: true,
        delimiter: ',',
        escape: '"',
        from_line: 2,
        skip_records_with_empty_values: false,
        skip_records_with_error: false,
        skip_empty_lines: true,
        // columns
        // ignore_last_delimiters: true,
        encoding: 'utf-8',
        quote: false,
        ltrim: true,
        rtrim: true,
      });

      let output: any = [];
      // .pipe(iconv.decodeStream('gbk'))
      // 判断格式
      // const chatsMatch = detectCharacterEncoding(stream);
      // console.log('chatsMatch: ', chatsMatch);

      stream
        // .pipe(iconv.decodeStream('gbk'))
        .pipe(parser)
        .on('readable', function () {
          let record;
          while ((record = parser.read()) !== null) {
            console.log('record: ', record);
            output.push(record);
          }
        })
        .on('error', function (err) {
          console.error(err.message);
        })
        // When we are done, test that the parsed output matched what expected
        .on('end', function () {
          resolve(output);
        });
    });
  }

  // 处理用户信息  
  @Post()
  async parseClientInfo() {
    const data: any = await this.taobaoService.listAll();
    let result: any = []
    let existResult: any = [];

    // 用户不存在的话，创建用户
    for (const item of data) {
      let isExist = await this.customerService.exist(item.clientName, item.clientTaobao);
      if (!isExist) {
        let saved = await this.customerService.save({
          name: item.clientName,
          taobao: item.clientTaobao,
          alipay: item.clientAlipay,
          contact: item.contact,
          phone: item.phone,
          country: '',
          province: '',
          city: '',
          district: '',
          street: '',
          address: item.address,
          postcode: '',
          location: '',
        });
        result.push(saved);
      } else {
        existResult.push(isExist);
      }
    }

    result = result.concat(existResult);

    return {
      result,
    };
  }

}
