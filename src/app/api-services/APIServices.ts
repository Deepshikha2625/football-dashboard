import { Match } from "@/helper/Interfaces";
import axios from "axios";
import moment from "moment";

export const fetchMatches = async (date: Date): Promise<Match[]> => {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const response = await axios.get(`/api/matches?date=${formattedDate}`);
  return response?.data?.data ?? []; // Ensure it returns an empty array if undefined
};
export const fetchTvStationNews = async (): Promise<Match[]> => {
  const response = await axios.get(`/api/tv-station`);
  return response?.data?.data ?? []; // Ensure it returns an empty array if undefined
};
