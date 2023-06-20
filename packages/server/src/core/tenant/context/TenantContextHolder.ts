

export class TenantContextHolder {
    static tenantId;

    static setTenantId(id) {
        TenantContextHolder.tenantId = id;
    }

    static getTenantId() {
        return TenantContextHolder.tenantId;
    }
}
