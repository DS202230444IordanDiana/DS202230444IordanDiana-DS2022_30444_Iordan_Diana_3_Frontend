import React from "react";

export const AdminHomepage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return <div>Hello, {user.username}</div>;
};
