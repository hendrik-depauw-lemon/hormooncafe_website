export function PrettyJson({ data }: { data: unknown }) {
    return <span className="whitespace-pre-wrap break-words">{JsonFormatter.format(data)}</span>;
}

class JsonFormatter {
    static format(v: unknown, indent = 0): string {
        const pad = '  '.repeat(indent);

        if (Array.isArray(v)) {
            return v
                .map((item) => {
                    if (JsonFormatter.isObj(item) || Array.isArray(item)) {
                        return `${pad}-\n${JsonFormatter.format(item, indent + 1)}`;
                    }
                    return `${pad}- ${JsonFormatter.inline(item)}`;
                })
                .join('\n');
        }

        if (JsonFormatter.isObj(v)) {
            return Object.entries(v)
                .map(([k, val]) => {
                    if (JsonFormatter.isObj(val) || Array.isArray(val)) {
                        return `${pad}${k}:\n${JsonFormatter.format(val, indent + 1)}`;
                    }
                    return `${pad}${k}: ${JsonFormatter.inline(val)}`;
                })
                .join('\n');
        }

        return pad + JsonFormatter.inline(v);
    }

    private static inline(v: unknown): string {
        return v === null ? 'null' : typeof v === 'string' ? v : String(v);
    }

    private static isObj(v: unknown): v is Record<string, unknown> {
        return typeof v === 'object' && v !== null && !Array.isArray(v);
    }
}
