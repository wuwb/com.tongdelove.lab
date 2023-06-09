interface QueryResult {
    getRowResults(): RowResult[];
    getQueryTime(): number;
}

interface RowResult {
    [key: string]: Value;
}

interface Value {
    asString(): string;
    getVal(): any;
}

function getPrintable(queryResult: QueryResult): string {
    const stringBuilder = new StringBuilder();
    const rowResults = queryResult.getRowResults();
    if (!rowResults || rowResults.length === 0) {
        stringBuilder.append(`0 row in set (${queryResult.getQueryTime()} ms)`);
        return stringBuilder.toString();
    }

    // 获取各列的最大长度
    const header: Record<string, number> = {};
    for (const rowResult of rowResults) {
        for (const [colName, colValue] of Object.entries(rowResult)) {
            if (!colName || !colValue) {
                continue;
            }

            let colStrValue = colValue.asString() ?? 'NULL';
            let maxLen = header[colName];
            if (!maxLen || maxLen < colStrValue.length) {
                maxLen = Math.max(colStrValue.length, colName.length);
                header[colName] = maxLen;
            }
        }
    }

    // 构建分割线和表头
    const lineSplitStringBuilder = new StringBuilder();
    const lineHeaderStringBuilder = new StringBuilder();
    for (const [name, maxLen] of Object.entries(header)) {
        const paddedName = fillBlank(name, maxLen);
        const lineSep = '-'.repeat(maxLen + 2);

        lineSplitStringBuilder.append(`+${lineSep}`);
        lineHeaderStringBuilder.append(`| ${paddedName} `);
    }
    lineSplitStringBuilder.append("+\n");
    lineHeaderStringBuilder.append("|\n");

    // 输出表头和分割线
    stringBuilder.append(lineSplitStringBuilder.toString());
    stringBuilder.append(lineHeaderStringBuilder.toString());
    stringBuilder.append(lineSplitStringBuilder.toString());

    // 输出数据行
    for (const rowResult of rowResults) {
        const rowDataStringBuilder = new StringBuilder();
        for (const [name, maxLen] of Object.entries(header)) {
            const value = rowResult[name];
            const strValue = (value?.getVal() === null ? 'NULL' : value?.asString()) ?? 'NULL';
            const paddedValue = fillBlank(strValue, maxLen);

            rowDataStringBuilder.append(`| ${paddedValue} `);
        }
        rowDataStringBuilder.append("|\n");
        stringBuilder.append(rowDataStringBuilder.toString());
    }

    // 输出表格统计信息
    stringBuilder.append(lineSplitStringBuilder.toString());
    stringBuilder.append(`${rowResults.length} row in set (${queryResult.getQueryTime()} ms)`);

    return stringBuilder.toString();
}

function fillBlank(str: string, len: number): string {
    return str.padEnd(len - str.length + str.replace(/[^\x00-\xff]/g, ' ').length);
}

class StringBuilder {
    private strings: string[];

    constructor() {
        this.strings = [];
    }

    append(str: string): StringBuilder {
        this.strings.push(str);
        return this;
    }

    toString(): string {
        return this.strings.join('');
    }
}


export function fillString(str: string, len: number = 80, padChar = ' '): string {
    if (str.length >= len) {
        return str;
    }

    const half = Math.floor((len - str.length) / 2);
    const leftPad = padChar.repeat(half);
    const rightPad = padChar.repeat(len - str.length - half);

    return leftPad + str + rightPad;
}
