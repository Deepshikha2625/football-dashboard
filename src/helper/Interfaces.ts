export type MenuItemProps = { icon: React.ReactNode; label: string; active?: boolean };
export interface SidebarProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
}
