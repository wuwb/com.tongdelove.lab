import { useEffect, useState } from 'react'
import { Accordion, Table } from '@mantine/core';

const TimestampPage = (props) => {
  const [currentTimestamp, setCurrentTimestamp] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCurrentTimestamp(+new Date())
    }, 1000)
  }, [])

  const dataSource1 = [
    {
      key: '1',
      language: 'Java',
      code: 'long epoch = System.currentTimeMillis()/1000',
    },
    {
      key: '2',
      language: 'JavaScript',
      code: 'Math.floor(new Date().getTime()/1000)',
    },
    {
      key: '3',
      language: 'PHP',
      code: 'time()',
    },
    {
      key: '4',
      language: 'Python',
      code: `
      import time;
      time.time()
      `,
    },
    {
      key: '5',
      language: 'Ruby',
      code: 'Time.now (or Time.new)',
    },
    {
      key: '6',
      language: 'Go',
      code: 'time.Now().Unix()',
    },
    {
      key: '7',
      language: 'MySQL',
      code: 'SELECT unix_timestamp(now())',
    },
    {
      key: '8',
      language: 'PowerShell',
      code: '[int][double]::Parse((Get-Date (get-date).touniversaltime() -UFormat %s))',
    },
    {
      key: '9',
      language: 'SQL Server',
      code: "SELECT DATEDIFF(s, '1970-01-01 00:00:00', GETUTCDATE())",
    },
    {
      key: '10',
      language: 'C#',
      code: `
      DateTimeOffset.Now.ToUnixTimeSeconds() (.NET Framework 4.6+/.NET Core)
      旧版本: var epoch = (DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds
      `,
    },
    {
      key: '11',
      language: 'C++11',
      code: `
      double now = std::chrono::duration_cast<std::chrono::second>
      (std::chrono::system_clock::now().time_since_epoch()).count()
      `,
    },
    {
      key: '12',
      language: 'Perl',
      code: 'time',
    },
    {
      key: '13',
      language: 'Objective-C',
      code: `
      [[NSDate date] timeIntervalSince1970]; (returns double) or NSString *currentTimestamp = [NSString stringWithFormat:@"%f", [[NSDate date] timeIntervalSince1970]];
      `,
    },
    {
      key: '14',
      language: 'Lua',
      code: 'epoch = os.time([date])',
    },
    {
      key: '15',
      language: 'AutoIT',
      code: `_DateDiff('s', "1970/01/01 00:00:00", _NowCalc())`,
    },
    {
      key: '16',
      language: 'Delphi',
      code: 'Epoch := DateTimetoUnix(Now)',
    },
    {
      key: '17',
      language: 'R',
      code: 'as.numeric(Sys.time())',
    },
    {
      key: '18',
      language: 'Erlang/OTP',
      code: `
      18+版本:system_time(seconds)
      旧版本: calendar:datetime_to_gregorian_seconds(calendar:universal_time())-719528*24*3600
      `,
    },
    {
      key: '19',
      language: 'PostgreSQL',
      code: 'SELECT extract(epoch FROM now())',
    },
    {
      key: '20',
      language: 'SQLite',
      code: `SELECT strftime('%s', 'now')`,
    },
    {
      key: '21',
      language: 'Oracle PL/SQL',
      code: `
      SELECT (CAST(SYS_EXTRACT_UTC(SYSTIMESTAMP) AS DATE) - TO_DATE('01/01/1970','DD/MM/YYYY')) * 24 * 60 * 60 FROM DUAL
      `,
    },
    {
      key: '22',
      language: 'IBM Informix',
      code: `
      SELECT dbinfo('utc_current') FROM sysmaster:sysdual
      `,
    },
    {
      key: '23',
      language: 'Visual FoxPro',
      code: `
      DATETIME() - {^1970/01/01 00:00:00} Warning: time zones not handled correctly
      `,
    },
    {
      key: '24',
      language: 'Adobe ColdFusion',
      code: '<cfset epochTime = left(getTickcount(), 10)>',
    },
    {
      key: '25',
      language: 'Tcl/Tk',
      code: 'clock seconds',
    },
    {
      key: '26',
      language: 'Unix/Linux Shell',
      code: 'date +%s',
    },
  ]
  const dataSource2 = [
    {
      key: '1',
      language: 'Java',
      code: `
      long epoch = new java.text.SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse("01/01/1970 01:00:00").getTime() / 1000
      `,
    },
    {
      key: '2',
      language: 'Javascript',
      code: 'Math.floor(new Date().getTime() / 1000)',
    },
    {
      key: '3',
      language: 'PHP',
      code: 'echo stortotime("2020/03/18"))',
    },
    {
      key: '4',
      language: 'Python',
      code: `
import calendar, time;
calendar.timegm(time.strptime('2000-01-01 12:34:00', '%Y-%m-%d %H:%M:%S'))
      `,
    },
    {
      key: '5',
      language: 'Ruby',
      code: 'Time.local(year, month, day, hour, minute, second, usec )',
    },
    {
      key: '6',
      language: 'MySQL',
      code: 'SELECT unix_timestamp(time)',
    },
    {
      key: '7',
      language: 'SQL Server',
      code: `SELECT DATEDIFF(s, '1970-01-01 00:00:00', GETUTCDATE())`,
    },
    {
      key: '8',
      language: 'AutoIT',
      code: `_DateDiff('s', "1970/01/01 00:00:00", "YYYY/MM/DD HH:MM:SS")`,
    },
    {
      key: '9',
      language: 'Delphi',
      code: `Epoch := DateTimeToUnix(StrToDateTime(myString))`,
    },
    {
      key: '10',
      language: 'R',
      code: 'as.numeric(as.POSIXct("YYYY-MM-dd HH:mm:ss", tz = "GMT", origin="1970-01-01"))',
    },
    {
      key: '11',
      language: 'PostgreSQL',
      code: `
      SELECT extract(epoch FROM date('2000-01-01 12:34'));
With timestamp: SELECT EXTRACT(EPOCH FROM TIMESTAMP WITH TIME ZONE '2018-02-16 20:38:40-08');
With interval: SELECT EXTRACT(EPOCH FROM INTERVAL '5 days 3 hours')
      `,
    },
    {
      key: '12',
      language: 'SQLite',
      code: `SELECT strftime('%s',timestring)`,
    },
    {
      key: '13',
      language: 'Adobe ColdFusion',
      code: 'int(parseDateTime(datetime).getTime()/1000)',
    },
    {
      key: '14',
      language: 'Tcl/Tk',
      code: 'clock seconds',
    },
    {
      key: '15',
      language: 'Unix/Linux Shell',
      code: 'date +%s -d"Jan 1, 1980 00:00:01"',
    },
    {
      key: '16',
      language: 'VBScript/ASP',
      code: 'DateDiff("s", "01/01/1970 00:00:00", time field)',
    },
  ]
  const dataSource3 = [
    {
      key: '1',
      language: 'Java',
      code: 'String date = new java.text.SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(new java.util.Date (epoch*1000))',
    },
    {
      key: '2',
      language: 'Javascript',
      code: 'new Date()',
    },
    {
      key: '3',
      language: 'PHP',
      code: 'echo date(output format, epoch)',
    },
    {
      key: '4',
      language: 'Python',
      code: `
      import time
timeStamp = 1557502800
timeArray = time.localtime(timeStamp)
otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
      `,
    },
    {
      key: '5',
      language: 'Ruby',
      code: 'Time.at(epoch)',
    },
    {
      key: '6',
      language: 'MySQL',
      code: 'FROM_UNIXTIME()',
    },
    {
      key: '7',
      language: 'PowerShell',
      code: `
      Function get-epochDate ($epochDate) {
        [timezone]::CurrentTimeZone.ToLocalTime(([datetime]'1/1/1970').AddSeconds($epochDate))
        }
      `,
    },
    {
      key: '8',
      language: 'SQL Server',
      code: `DATEADD(s, epoch, '1970-01-01 00:00:00')`,
    },
    {
      key: '9',
      language: 'C#',
      code: `
      private string epoch2string(int epoch) {
        return new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(epoch).ToShortDateString();
        }
      `,
    },
    {
      key: '10',
      language: 'Objective-C',
      code: 'NSDate * myDate = [NSDate dateWithTimeIntervalSince1970:epoch]; NSLog(@"%@", date)',
    },
    {
      key: '11',
      language: 'Lua',
      code: 'datestring = os.date([format[,epoch]])',
    },
    {
      key: '12',
      language: 'AutoIT',
      code: '_DateAdd("s", $EpochSeconds , "1970/01/01 00:00:00")',
    },
    {
      key: '13',
      language: 'Delphi',
      code: 'myString := DateTimeToStr(UnixToDateTime(Epoch))',
    },
    {
      key: '14',
      language: 'R',
      code: 'as.POSIXct(epoch, origin="1970-01-01", tz="GMT")',
    },
    {
      key: '15',
      language: 'PostgreSQL',
      code: `
      versions 8.1+: SELECT to_timestamp(epoch)
versions older: SELECT TIMESTAMP WITH TIME ZONE 'epoch' + epoch * INTERVAL '1 second'
      `,
    },
    {
      key: '16',
      language: 'SQLite',
      code: `
      SELECT datetime(epoch_to_convert, 'unixepoch')
local timezone: SELECT datetime(epoch_to_convert, 'unixepoch', 'localtime')
      `,
    },
    {
      key: '17',
      language: 'Oracle PL/SQL',
      code: `
      SELECT to_date('01-JAN-1970','dd-mon-yyyy')+(1526357743/60/60/24) from dual
      Replace 1526357743 with epoch
      `,
    },
    {
      key: '18',
      language: 'IBM Informix',
      code: `SELECT dbinfo('utc_to_datetime',epoch) FROM sysmaster:sysdual;`,
    },
    {
      key: '19',
      language: 'Adobe ColdFusion',
      code: `DateAdd("s",epoch,"1/1/1970");`,
    },
    {
      key: '20',
      language: 'Tcl/Tk',
      code: 'clock format 1325376000 Documentation',
    },
    {
      key: '21',
      language: 'Unix/Linux Shell',
      code: 'date -d @1520000000',
    },
  ]
  const columns = [
    {
      title: '语言（language）',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: '代码（code）',
      dataIndex: 'code',
      key: 'code',
    },
  ]

  const dataSource4 = [
    {
      key: '1',
      unit: '1分钟',
      count: '60',
    },
    {
      key: '2',
      unit: '1小时',
      count: '3600',
    },
    {
      key: '3',
      unit: '1天',
      count: '86400',
    },
    {
      key: '4',
      unit: '1周（星期）',
      count: '604800',
    },
    {
      key: '5',
      unit: '1个月（30.44天）',
      count: '2629743',
    },
    {
      key: '6',
      unit: '1年（365.24天）',
      count: '31556926',
    },
  ]
  const columns2 = [
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '数量',
      dataIndex: 'count',
      key: 'count',
    },
  ]

  return (
    <div>
      <div>
        <div>当前时间：{currentTimestamp} 毫秒</div>
        <div>当前时间：{parseInt(currentTimestamp / 1000, 10)} 秒</div>
        <div>当前时间：{Math.floor(currentTimestamp / 1000)} 秒</div>
        {/* <div>当前时间：{~~currentTimestamp} 毫秒</div> */}
        {/* <div>当前时间：{currentTimestamp^0} 毫秒</div> */}
        {/* <div>当前时间：{currentTimestamp<<0} 毫秒</div> */}
        <div>
          <Accordion defaultValue="1">
            <Accordion.Item key={1} value="1">
              <Accordion.Control>获取时间长</Accordion.Control>
              <Accordion.Panel>

                <Table
                  data={{
                    head: columns.map((item) => item.title),
                    body: dataSource1.map((item) => [item.key, item.language, item.code])
                  }}
                />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item key={2} value="2">
              <Accordion.Control >字符串转时间戳</Accordion.Control>
              <Accordion.Panel>

                <Table
                  data={{
                    head: columns.map((item) => item.title),
                    body: dataSource2.map((item) => [item.key, item.language, item.code])
                  }}
                />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item key={3} value="3">
              <Accordion.Control >时间戳转字符串</Accordion.Control>
              <Accordion.Panel>

                <Table
                  data={{
                    head: columns.map((item) => item.title),
                    body: dataSource3.map((item) => [item.key, item.language, item.code])
                  }}
                />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
        <div>
          <h3>什么是Unix时间戳？</h3>
          <p>
            Unix时间戳（Unix时间/POSIX时间）是自1970年1月1日（UTC /
            GMT午夜）以来经过的秒数。
          </p>
          <p>
            此页面上的转换器将以秒（10位数字）和毫秒（13位数字）为单位的时间戳转换为可读的日期。
          </p>
          <Table
            dataSource={dataSource4}
            columns={columns2}
            pagination={false}
          />
        </div>
      </div>
    </div>
  )
}

export default TimestampPage
