# Football Match Tracking Dashboard

This project is a **Football Match Tracking Dashboard** built with **Next.js 14, TypeScript, ShadCN UI, and React Query**. It fetches football match data from the **SportMonks API** and displays it in a well-designed, responsive UI.

## **Features**
- Fetches football match data from the **SportMonks API**
- Displays matches along with **league information, teams, and scores**
- **Date switching feature** to view matches for different dates
- **ShadCN UI components** for a sleek design
- Uses **Sofia Sans** typography and a custom color scheme

## **Installation & Setup**
### **1. Clone the Repository**
```sh
git clone https://github.com/yourusername/football-score-dashboard.git
cd football-score-dashboard
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Set Up Environment Variables**
You need to **sign up** on [SportMonks](https://www.sportmonks.com/) and generate an API token.

1. **Make a copy** of the default environment file:
   ```sh
   cp default.env .env
   ```
2. **Open `.env`** and add your API key:
   ```env
   NEXT_PUBLIC_API_KEY=your_sportmonks_api_token
   ```

### **4. Run the Development Server**
```sh
npm run dev
```

The app will be available at: **http://localhost:3000**

## **Usage**
1. Select a date from the date picker to view matches for that day.


## **Tech Stack**
- **Next.js 14** (React framework)
- **TypeScript** (Static typing)
- **ShadCN UI** (Modern UI components)
- **React Query** (Data fetching & caching)
- **Tailwind CSS** (Styling)
- **Axios** (API requests)
- **Moment.js** (Date formatting)

