import {useContext} from "react";
import AdminContext from "@/modules/administration/context/AdminProvider";

export default function useAdmin() {
  return useContext(AdminContext);
}