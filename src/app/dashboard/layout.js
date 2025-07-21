import Sidebar from "@/components/Dashboard/Sidebar";

export default async function DashboardLayout({ children }) {
  return (
    <div className="">
      <div className="row g-0">
        <div className="col-sm-2">
          <Sidebar />
        </div>
        <div className="col-sm-10 vh-100 overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  )
}