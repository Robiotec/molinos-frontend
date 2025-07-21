'use client';

import { AuthProvider } from "@/modules/authentication/context/AuthProvider";
import {CurrentsProvider} from "@/modules/mills/context/CurrentsProvider";
import {AdminProvider} from "@/modules/administration/context/AdminProvider";
import {SettingsProvider} from "@/modules/settings/context/SettingsProvider";
import {ReportsProvider} from "@/modules/reports/context/ReportsProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CurrentsProvider>
        <AdminProvider>
          <SettingsProvider>
            <ReportsProvider>
              {children}
            </ReportsProvider>
          </SettingsProvider>
        </AdminProvider>
      </CurrentsProvider>
    </AuthProvider>
  )
}