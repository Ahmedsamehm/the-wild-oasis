import React from "react";
import LayOutForm from "../UI/LayOutForm";
import Header from "../UI/Header";

function Users() {
  const Fields = [
    {
      label: "FirstName",
      type: "text",
    },
    {
      label: "Email address",
      type: "email",
    },
    {
      label: "Password (min 8 characters)",
      type: "password",
    },
    {
      label: "Repeat password",
      type: "password",
    },
  ];
  return (
    <>
      <Header className={`" w-[20vw] lg:w-[30vw] xl:w-[30vw]  "`}>Users</Header>
      <LayOutForm Fields={Fields} />
    </>
  );
}

export default Users;
