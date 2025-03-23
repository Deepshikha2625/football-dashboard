export type MenuItemProps = { icon: React.ReactNode; label: string; active?: boolean };
export type Url = string | undefined;
export interface SidebarProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
}
export interface Score {
    home: number;
    away: number;
  }
  
  export interface League {
    id: number;
    name: string;
    country: string;
    image_path?: string;
    url?:string;
  }
  
  
  export interface ResultInfo {
    winner?: string; // Adjust based on API response
    reason?: string;
    
  }
  export interface Participant {
    id: number;
    name: string;
    image_path?: string;
  }
  export interface Match {
    id: number;
    name: string;
    date: string;
    status: string;
    scores: any;
    league: League;
    result_info: string | number;
    url: string;
    live: boolean;
    starting_at: string;
    participants: Participant[];
    image_path:string
  }
  