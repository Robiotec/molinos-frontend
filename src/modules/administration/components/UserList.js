'use client';

import {useEffect} from "react";
import useAdmin from "@/modules/administration/hooks/useAdmin";

export default function UserList() {

  const { loading, users, loadUsers } = useAdmin();

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading && users.length === 0) {
    return (
      <div className="card" aria-hidden="true">
        <div className="card-body">
          <p className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-12"></span>
            <span className="placeholder col-12"></span>
          </p>
        </div>
      </div>
    )
  }

  if (!loading && users.length !== 0) {
    return (
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo electrónico</th>
                <th scope="col">Rol</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user) => {

              return (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.roles.map((rol) => (`${rol.name} `))}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }



}