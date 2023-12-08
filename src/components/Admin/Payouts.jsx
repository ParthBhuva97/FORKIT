import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Payouts = () => {
  const [users, setUsers] = useState([]);
  const [reciever, setReciever] = useState("");
  const refId = useRef();
  const [paymentModal, setPaymentModal] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3000/users/getPayouts").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  function handlePayout(user) {
    setReciever(user);
    setPaymentModal(!paymentModal);
  }
  return (
    <>
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
                          Email
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Amount
                        </th>
                        <th scope="col" class="px-6 py-4">
                          UPI ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => {
                        return (
                          <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              {user.user_name}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              {user.email}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              {user.total_approved_amount} &#8377;
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              {user.upi_id}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              <div
                                className="flex items-center justify-center bg-blue-500 text-white rounded-lg shadow-md py-2 px-3 cursor-pointer"
                                onClick={() => {
                                  handlePayout(user);
                                }}
                              >
                                Pay Now
                              </div>
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
      {paymentModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Reference ID</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setPaymentModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="w-full">
                    <input
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter Reference ID"
                      id="name"
                      ref={refId}
                      required
                    ></input>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>{
                      setPaymentModal(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>{
                      console.log(refId.current.value);
                      axios
                        .post("http://localhost:3000/payment/sendMail", {
                          reciever: reciever,
                          refId: refId.current.value,
                        })
                        .then((response) => {
                          console.log(response.data);
                        });
                          setPaymentModal(false);

                    }}
                  >
                    Send Mail
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Payouts;
