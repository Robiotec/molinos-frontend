import {useContext} from "react";
import ReportsContext from "@/modules/reports/context/ReportsProvider";

export default function useReports() {
  return useContext(ReportsContext);
}