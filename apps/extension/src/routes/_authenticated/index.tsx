import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@tongdelove/ui/components/button'
import { Checkbox } from '@tongdelove/ui/components/checkbox'
import { Label } from '@tongdelove/ui/components/label'
import { storage } from 'wxt/utils/storage'
import { useSettings } from '../../hooks/useSettings'
import { STORAGE_KEY_HIDE_ALERT } from '@/constants/app'

export const Route = createFileRoute('/_authenticated/')({
    component: () => {

        const [hideAlert, setHideAlert] = useState(false);

        const { settings, updateSetting, loading } = useSettings();
        const categories = ['shipping', 'order', 'ui'];


        // 3. 处理变更：保存并通知 Main World
        const handleCheckboxChange = async (checked: boolean) => {
            setHideAlert(checked);

            // A. 保存到 Storage (持久化)
            await storage.setItem(STORAGE_KEY_HIDE_ALERT, checked);

            // B. 发送事件给 Main World (实时生效)
            window.dispatchEvent(new CustomEvent(EVENT_CONFIG_UPDATED, {
                detail: { hideReadyToShip: checked },
                composed: true,
                bubbles: true
            }));
        };

        // 2. 初始化：从存储中读取设置
        useEffect(() => {
            const loadSettings = async () => {
                const storedValue = await storage.getItem<boolean>(STORAGE_KEY_HIDE_ALERT);
                // 默认为 false
                setHideAlert(!!storedValue);
            };
            loadSettings();
        }, []);

        return (
            <div className="flex-1 overflow-y-auto">
                <Button>测试按钮2</Button>
                <div className="grid">
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <Checkbox
                            id="hide-alert"
                            checked={hideAlert}
                            onCheckedChange={handleCheckboxChange}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label
                                htmlFor="hide-alert"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                隐藏待装箱发货提醒
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                开启后，页面上将不再弹出红色的发货提醒框。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})
