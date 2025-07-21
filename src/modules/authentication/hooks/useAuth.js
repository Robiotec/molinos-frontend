import { useContext } from "react";
import AuthContext from "@/modules/authentication/context/AuthProvider";

export default function useAuth () {
  return useContext(AuthContext);
};