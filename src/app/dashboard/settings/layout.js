import SettingsSidebar from "@/modules/settings/components/SettingsSidebar";

export default function SettingsLayout({children}) {
  return (
    <div className="container">
      <div className="m-3">
        <div className="row">
          <div className="col-md-3">
            <SettingsSidebar />
          </div>
          <div className="col-md-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}