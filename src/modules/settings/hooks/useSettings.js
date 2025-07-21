import {useContext} from "react";
import SettingsContext from "@/modules/settings/context/SettingsProvider";

export default function useSettings() {
  return useContext(SettingsContext);
}