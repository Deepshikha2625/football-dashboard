"use client";
import { fetchMatches } from "@/app/api-services/APIServices";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { generateDateTabs } from "@/helper/commonFunction";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ChevronDown, CircleDot, Search } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import sportsBanner from "../images/sports-banner.png";
import Loader from "./Loader";
export default function MatchDashboard() {
    const [selectedCategory, setSelectedCategory] = useState("All Matches");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [viewCalendar, setViewCalendar] = useState(false)
    const dates = generateDateTabs();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [tempDate, setTempDate] = useState<Date | null>(null);
    const { data: matches = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["matches", selectedDate],
        queryFn: () => fetchMatches(selectedDate),
    });
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = moment(e.target.value, "YYYY-MM-DD").toDate();
        setTempDate(newDate);
        // setIsDialogOpen(false);
        setViewCalendar(true)
    };
    const handleSubmit = () => {
        if (tempDate) {
            setSelectedDate(tempDate);
            refetch(); // Manually trigger API call
        }
        setIsDialogOpen(false); // Close dialog
    };
    const getCurrentScore = (scores: any[]) => {
        const currentScores = scores.filter(score => score.description === "CURRENT");
        const homeScore = currentScores.find(score => score.score.participant === "home")?.score.goals || 0;
        const awayScore = currentScores.find(score => score.score.participant === "away")?.score.goals || 0;
        return { homeScore, awayScore };
    };
    return (
        <>
    
        <div className="p-4 bg-[#222222] rounded-md text-white">
            <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between bg-[#222222] p-3 rounded-md">
                    <Image
                        src={sportsBanner}
                        alt="Spain"
                        width={400}  // Increase width
                        height={250} // Increase height
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4 mb-4">
                {/* Live Indicator */}
                <div className="flex items-center text-[#C3CC5A] space-x-1">
                    <CircleDot size={16} />
                    <span className="font-medium">Live (1)</span>
                </div>
                {/* Search */}
                <div className="flex flex-grow items-center bg-[#303030] p-2 rounded-md">
                    <Search size={18} className="text-white" />
                    <input type="text" placeholder="Search For Matches" className="ml-2 w-full bg-transparent outline-none" />
                </div>
                {/* Category Dropdown */}
                <button className="flex items-center bg-[#303030] p-2 rounded-md space-x-2">
                    <span>{selectedCategory}</span>
                    <ChevronDown size={16} />
                </button>
            </div>

            {/* Date Tabs */}
            <div className="flex space-x-2 mb-4 overflow-x-auto">
                {dates.map((date) => (
                    <button
                        key={date.value}
                        className={cn(
                            "px-3 py-2 rounded-md text-sm",
                            moment(selectedDate).format("YYYY-MM-DD") === date.value
                                ? "bg-[#C3CC5A] text-black"
                                : "bg-[#303030]"
                        )}
                        onClick={() => { setSelectedDate(moment(date.value, "YYYY-MM-DD").toDate()); setViewCalendar(false); }}
                    >
                        {date.label}
                    </button>
                ))}
                {/* Date Picker Button */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className={cn(
                                "flex items-center px-3 py-2 rounded-md",
                                viewCalendar ? "bg-[#C3CC5A] text-black" : "bg-[#303030]"
                            )}
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <Calendar size={16} className="mr-1" />
                            {tempDate && viewCalendar ? moment(tempDate).format("ddd DD MMM") : " View Calendar"}

                        </Button>
                    </DialogTrigger>

                    {/* Dialog Content */}
                    <DialogContent className="bg-[#222222] p-6 rounded-lg">
                        <h2 className="text-lg font-semibold text-white mb-4">Select Date</h2>

                        {/* Date Input */}
                        <input
                            type="date"
                            className="p-2 rounded-md bg-[#303030] text-white w-full"
                            value={tempDate ? moment(tempDate).format("YYYY-MM-DD") : ""}
                            onChange={handleDateChange} // Close on selecting a date
                        />

                        {/* Close Button */}
                        <div>
                            <Button className="mt-4" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button className="mt-4" onClick={() => setIsDialogOpen(false)}>
                                Close
                            </Button>
                        </div>

                    </DialogContent>
                </Dialog>
            </div>

            {/* Matches Table */}
            {matches?.length !== 0 ? (
                <div className="bg-[#111111] p-4 rounded-lg">
                    {matches.map((data, index) => {
                        const currentScore = getCurrentScore(data?.scores || []);

                        return (
                            <div key={index} className="bg-[#222222] rounded-md mb-3 p-3 shadow-md">
                                {/* League Title */}
                                <div className="flex items-center space-x-3 p-2 bg-black">
                                    {/* League Icon with Visible Background */}
                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white p-1">
                                        <Image
                                            src={data?.league?.image_path || "/fallback-image.png"}
                                            alt={data?.league?.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    </div>

                                    {/* League Name */}
                                    <span className="text-[#C3CC5A] font-semibold">{data?.league?.name}</span>

                                    {/* Result Info (if available) */}
                                    {data?.result_info && <span className="text-gray-400 text-sm">({data?.result_info})</span>}
                                </div>


                                {/* Match Row */}
                                <div className="flex items-center justify-between py-2 border-b border-[#303030] last:border-none">
                                    {/* Match Time / Live Indicator */}
                                    <span className={data?.live ? "text-green-400 font-bold" : "text-gray-300"}>
                                        {data?.live ? "Live" : moment(data?.starting_at).format("HH:mm")}
                                    </span>

                                    {/* Teams & Score */}
                                    <div className="flex items-center justify-center w-full space-x-4">
                                        {/* Home Team */}
                                        <div className="flex items-center space-x-2">
                                            <span className="text-white">{data?.participants[0]?.name}</span>
                                            <Image src={data?.participants[0]?.image_path} alt="Home" width={20} height={20} />
                                        </div>

                                        {/* Score */}
                                        <span className="font-bold text-white">{currentScore.homeScore} - {currentScore.awayScore}</span>

                                        {/* Away Team */}
                                        <div className="flex items-center space-x-2">
                                            <Image src={data?.participants[1]?.image_path} alt="Away" width={20} height={20} />
                                            <span className="text-white">{data?.participants[1]?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-400 text-center">No Data Found</p>
            )}

        </div>
        {isLoading  ? <Loader/> : null}
        </>
    );
}
