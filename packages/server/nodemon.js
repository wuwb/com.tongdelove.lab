module.exports = {
    watch: ['src'],
    ext: 'ts',
    exec: 'IS_TS_NODE=true node-ts -r tsconfig-paths/register src/main.ts'
}
