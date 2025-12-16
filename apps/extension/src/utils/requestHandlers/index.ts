type RequestModifier = {
    match: (url: string) => boolean
    action: (data: any) => any
}

export const requestModifiers: RequestModifier[] = [
    {
        match: (url) => url.includes('/api/kiana/gamblers/marketing/enroll/pop/apply'),
        action: (data) => {
            if (data && Array.isArray(data.approvedList) && data.approvedList.length > 0) {
                const rejected = Array.isArray(data.rejectedList) ? data.rejectedList : []
                data.rejectedList = [...new Set([...rejected, ...data.approvedList])]
                data.approvedList = []
            }
            return data
        },
    },
]