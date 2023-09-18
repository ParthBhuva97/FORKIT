import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/users/getAllUsers").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);
  return (
    <div className="w-full flex items-start justify-start flex-col gap-5">
      <h1 className="font-bold drop-shadow-md text-indigo-500 text-xl">
        Users
      </h1>
      <div className="w-full px-5">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-6 py-4">
                        #
                      </th>
                      <th scope="col" class="px-6 py-4">
                        User Name
                      </th>
                      <th scope="col" class="px-6 py-4">
                        User ID
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-4">
                        UPI ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user,index)=>{
                        return (
                          <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              {user.user_name}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              {user.user_id}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              {user.email}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              {user.upi_id}
                            </td>
                          </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
