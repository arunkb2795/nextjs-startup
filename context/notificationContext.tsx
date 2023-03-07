import { createContext, PropsWithChildren, useState } from "react";

export interface NotificationStates {
    title: string,
    message: string;
    status: boolean;
}
export type NotificationContextType = {
    notification: NotificationStates | null;
    showNotification: (notificationData: NotificationStates) => void;
    hideNotification: () => void;
};

export const NotificationContext = createContext<NotificationContextType | null>({
    notification: null,
    showNotification: function (notificationData) { },
    hideNotification: function () { },
})

export function NotificationContextProvider({ children }: PropsWithChildren) {
    const [activeNotification, setActiveNotification] = useState<NotificationStates | null>(null)

    const showNotificationHandler = (notificationData: NotificationStates) => {
        setActiveNotification(notificationData)
    }

    const hideNotificationHandler = () => {
        setActiveNotification(null)
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={context}>
            {children}
        </NotificationContext.Provider>
    )
}
