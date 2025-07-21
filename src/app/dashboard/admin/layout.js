import AdminSidebar from "@/modules/administration/components/AdminSidebar";

export default function AdminLayout({children}) {
  return (
    <div className="container">
      <div className="m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}