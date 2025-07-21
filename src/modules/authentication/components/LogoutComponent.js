'use client'

import {useEffect} from "react";
import useAuth from "@/modules/authentication/hooks/useAuth";

export default function LogoutComponent() {

  const { handleLogout } = useAuth();

  useEffect(() => {
    if ( typeof window !== "undefined" ) {
      handleLogout();
    }
  }, []);

  return (
    <>
      Cerrando sesión...
    </>
  )
}