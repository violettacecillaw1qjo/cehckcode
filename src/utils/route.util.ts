export const getRouterQuery = ({
    multi,
    decode,
}: {
    multi?: boolean;
    decode?: boolean;
} = {}) => {
    const params = Object.fromEntries(
        window.location.search
            .substring(1)
            .split('&')
            .map((param) => {
                const parts = param.split('=');
                parts[0] = decodeURIComp(parts[0]);
                if (multi) {
                    parts[1] = parts?.[1]?.split(',').map((i) => (decode ? decodeURIComp(i) : i)) as any;
                } else {
                    parts[1] = decode ? decodeURIComp(parts[1]) : parts[1];
                }
                return parts;
            })
            .filter((i) => i[0]),
    );
    return params;
};

export const decodeURIComp = (str = '') => {
    str = String(str || '');
    if (!str) {
        return str;
    }
    try {
        return decodeURIComponent(str);
    } catch {
        return str;
    }
};
