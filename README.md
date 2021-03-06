# 背景
企业中大量业务数据保存在各个业务系统数据库中，过去通常的同步数据的方法有很多种：比如各个数据使用方在业务低峰期各种抽取所需数据(缺点是存在重复抽取而且数据不一致)；或者统一的数仓平台通过sqoop到各个系统中抽取数据(缺点是sqoop抽取方法时效性差，一般都是T+1的时效性)；或者是基于trigger或时间戳的方式获得增量的变更（缺点是对业务方侵入性大，带来性能损失等）。

但这些方案都不能算完美，我们在了解和考虑了不同实现方式后，认为要想同时解决数据一致性和实时性，比较合理的方法应该是基于日志的解决方案，同时能够提供消息订阅的方式给下游系统使用。DBus（数据总线）项目就是应这个需求而生的。

目前DBus在公司内部广泛使用，支持oracle，mysql，log, RocketMQ等数据源，这次开源版本支持mysql数据源（支持版本v5.6, v5.7）
DBus的主要潜在客户包括：
* 数仓平台和数据分析平台
* 实时营销决策
* 实时报表展示
* 异构数据实时同步
* 其他实时性要求高的系统


# 介绍
DBus 实时数据总线：是宜信公司技术研发中心Bridata团体开发的一款实时数据同步产品
![logo](https://github.com/BriData/DBus/blob/master/img/logo.png)
 
DBus专注于数据的收集及实时数据流计算，通过简单灵活的配置，以无侵入的方式对源端数据进行采集，采用高可用的流式计算框架，对公司各个IT系统在业务流程中产生的数据进行汇聚，经过转换处理后成为统一JSON的数据格式（UMS），提供给不同数据使用方订阅和消费，充当数仓平台、大数据分析平台、实时报表和实时营销等业务的数据源。

# 快速开始
全套DBus使用了诸多组件（Canal，zk，kafka，storm，mysql，influxdb，grafana），为了简单化，我们准备了All in One 包，包含了预先安装数据和一键启动脚本，具体请参考：https://github.com/BriData/DBus/wiki/QuickStart

# 相关文档
详细介绍 DBus请参考 [wiki](https://github.com/BriData/DBus/wiki)

常见问题可参考 [FAQ](https://github.com/BriData/DBus/wiki/FAQ)

系统介绍参考 [System Architecture](https://github.com/BriData/DBus/wiki/System-Architecture)

# 相关依赖部件说明：
| 名称       | 版本号  | 说明 |
| ----------|--------|-----|
| Canal     | v1.0.22 | DBus用于实时抽取binlog日志。DBus修改一个1文件, 具体配置可参考canal相关支持说明，支持mysql5.6，5.7 |
| Zookeeper | v3.4.6+ | 用于构建整个系统和提供配置通知等 |
| Kafka     | v0.10   | 用于存储相关数据和消息，提供订阅和发布的能力 |
| Storm     | v1.0.1  | 用于提供DBus流式计算 |
| Influxdb  | v0.13.0 | 用于记录实时监控数据 |
| Grafana   | v4.2.0  | 用于展示监控信息 |
| Sqoop     | v1.44   | DBus内部包含部分sqoop分片代码，并做一定修改，具体请参考wiki中说明 |
| Mysql     | v5.6，v5.7  | 存储DBus管理相关信息 |



# 限制：
* 被同步的Mysql blog需要是row模式
* 考虑到kafka的message大小不宜太大，目前设置的是最大10MB，因此不支持同步mysql MEDIUUMTEXT/MediumBlob和LongTEXT/LongBlob, 即如果表中有这样类型的数据会直接被替换为空。

# 相关资料:
与宜信[Wormhole](https://edp963.github.io/wormhole/)项目搭配使用将是最佳选择。

可参考：[如何基于日志，同步实现数据的一致性和实时抽取?](http://dbaplus.cn/news-21-872-1.html)

# 相关开源
宜信[Wormhole](https://edp963.github.io/wormhole/)

# 交流和问题反馈
邮件交流：  bridata@126.com

提交issue ： https://github.com/BriData/DBus/issues

微信群：
![weixi](https://github.com/BriData/DBus/blob/master/img/0weixi.png)
