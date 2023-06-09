let class2type = {
    '[object Array]': 'array',
    '[object Boolean]': 'boolean',
    '[object Date]': 'date',
    '[object Error]': 'error',
    '[object Function]': 'function',
    '[object Number]': 'number',
    '[object Object]': 'object',
    '[object RegExp]': 'regexp',
    '[object String]': 'string'
}

export default value => {
    return typeof value === 'object' || typeof value === 'function'
        ? class2type[toString.call(value)] || 'object'
        : typeof value
}
