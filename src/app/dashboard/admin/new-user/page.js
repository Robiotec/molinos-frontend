import NewUserForm from "@/modules/administration/components/NewUserForm";
import UserList from "@/modules/administration/components/UserList";

export default function NewUser() {
  return (
    <div className="container">
      <NewUserForm />
      <hr/>
      <UserList />
    </div>
  )
}