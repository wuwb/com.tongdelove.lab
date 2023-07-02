const { cpus } = require('os');
const { execSync } = require('child_process');
const nodePath = execSync(`npm root --quiet -g`, {
    encoding: 'utf-8',
}).split('\n')[0];

const cpuLen = cpus().length;

/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
    apps: [
        {
            name: 'dowu-server', // 项目名字,启动后的名字
            script: '../../dist/server/src/main.js', // 执行的文件
            cwd: './', // 根目录
            args: '--color', // 传递给脚本的参数
            watch: false, // 开启监听文件变动重启
            ignore_watch: ['node_modules', 'public', 'logs'], // 不用监听的文件
            exec_mode: 'cluster_mode', // cluster, fork
            instances: Math.max(2, cpuLen), //'2', // max表示最大的 应用启动实例个数，仅在 cluster 模式有效 默认为 fork
            instance_var: 'INSTANCE_ID',
            autorestart: true, // 默认为 true, 发生异常的情况下自动重启
            max_memory_restart: '1G',
            error_file: './logs/app-err.log', // 错误日志文件
            out_file: './logs/app-out.log', // 正常日志文件
            merge_logs: true, // 设置追加日志而不是新建日志
            log_date_format: 'YYYY-MM-DD HH:mm:ss', // 指定日志文件的时间格式
            min_uptime: '60s', // 应用运行少于时间被认为是异常启动
            max_restarts: 30, // 最大异常重启次数
            restart_delay: 60, // 异常重启情况下，延时重启时间
            node_args: '',
            env: {
                // 环境参数，当前指定为开发环境
                NODE_ENV: 'development',
                DOTENV_CONFIG_PATH: '.env.development',
                DEBUG_COLORS: true,
                NODE_PATH: nodePath,
            },
            env_production: {
                // 环境参数,当前指定为生产环境
                NODE_ENV: 'production',
                NODE_PATH: nodePath,
            },
            env_test: {
                // 环境参数,当前为测试环境
                NODE_ENV: 'test',
            },
        },
    ],

    deploy: {
        production: {
            user: 'root',
            host: '118.24.105.97',
            ref: 'origin/master',
            repo: 'ssh://git@github.com/wuwb/com.tongdelove.lab.git',
            path: '/var/www/dowu',
            'post-setup': 'ls -la',
            'post-deploy': 'pnpm install && pnpm run build && pm2 reload ecosystem.config.js --env production',
        },
    },
};
