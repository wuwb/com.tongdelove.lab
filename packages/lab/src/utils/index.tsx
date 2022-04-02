export const getDNSPrefetchValue = (domain: string): string | null => {
    if (!domain) return null;
    if (domain.startsWith('http')) return domain.replace(/https?:/, '');
    if (domain.startsWith('//')) return domain;
    return `//${domain}`;
}
