// Detail Seller Rating，基于订单评价和其他相关数据计算卖家服务评级

// | shopid | BIGINT | 0 | 店铺ID |
// | tagid | BIGINT | | 类目ID |
// | shiptime_value | FLOAT | | 平均发货时间 |
// | tag_shiptime_value | FLOAT | | 行业类目平均发货时间 |
// | return_rate | FLOAT | | 店铺退货率 |
// | tag_return_value | FLOAT | | 行业类目退货率 |
// | valid_complain_value | FLOAT | | 有效投诉率 |
// | tag_valid_complain_value | FLOAT | | 有效行业类目投诉率 |
// | service_dsr | FLOAT | | 店铺服务周到动态评分 |
// | tag_service_dsr | FLOAT | | 行业服务周到动态评分 |
// | style_dsr | FLOAT | | 店铺款式新颖动态评分 |
// | tag_style_dsr | FLOAT | | 行业款式新颖动态评分 |
// | quality_dsr | FLOAT | | 店铺质量满意动态评分 |
// | tag_quality_dsr | FLOAT | | 行业质量满意动态评分 |
// | price_dsr | FLOAT | | 店铺价格合理动态评分 |
// | tag_price_dsr | FLOAT | | 行业价格合理动态评分 |
// | desc_dsr | FLOAT | | 店铺描述相符动态评分 |
// | tag_desc_dsr | FLOAT | | 行业描述相符动态评分 |
// | check_items_rate | FLOAT | | 店铺质检通过率 |
// | gmv_30days | FLOAT | | 最近店铺30天的GMV |
// | new_gmv_30days | FLOAT | | 最新最近店铺30天的GMV |
// | rebuy_rate | FLOAT | | 店铺复购率 |
// | new_rebuy_rate | FLOAT | | 最新店铺复购率 |
// | tag_rebuy_rate | FLOAT | | 行业复购率 |
// | visit_date_i | INT | 1 | Hbase日期分区字段 |
// | visit_date | VARCHAR | | NULL |

export class ShopKpi {
  uuid: string
}
