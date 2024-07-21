// class BiFlowInfoDO {
//     Integer id;//自增id
//     String task;//hive表名_日期（yyyyMMddHHmmss）
//     String hiveTable;//指标所在的表
//     String hiveTableNum;//指标所在的表的编号
//     String hiveColumn;//对应的hive字段 如果是hbase的话带family  f:column
//     String hiveColumnType;//数据类型，可选值见ColumnType
//     String hiveColumnDesc;//对应的hive字段描述
//     Integer isMeta;//0 非指标，1 指标
//     String metaNameEN;//指标名称,全局唯一，一般以table编号+字段名组成
//     String metaNameCN;//指标中文显示名称
//     String metaDesc;//指标详细信息说明，如计算公式、统计口径及适用场景等
//     String bizGroup;//业务分组
//     String recommendStorage;//bi推荐的存储介质，如mysql hbase es等
//     String requiredParams;//必选参数，英文逗号分隔
//     String optionalParams;//可选参数，英文逗号分隔
//     Integer dataSourceId;//真实数据源id，外键
//     String features;//万能字段，isRowkey（true or false）、isNeedCreateTable（true or false）、isNewColumn（true or false）、hbaseFamily（存放hbase表字段对应的列簇信息）、biDeadline（bi完成截止日期）、metaDeadline（指标上线截止日期）
//     Integer status;//状态(1 =>提交,2=>审核中,3=>审核通过,4=>保存但不上线,5=>保存且上线,0=>删除)
//     Integer created;//创建时间
//     Integer updated;//更新时间
// }
export const BiFlowInfoDO = {}
