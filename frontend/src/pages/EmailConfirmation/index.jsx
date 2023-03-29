import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getApiHandler } from "../../apiHandler";

function EmailConfirmation() {
  const { id, confirmationCode } = useParams();
  const [result, setResult] = useState("");

  const verifyUserEmail = async () => {
    const verifyUser = await getApiHandler(
      `/api/user/confirm/${id}/${confirmationCode}`
    );

    if (verifyUser.status) {
      setResult("Account Confirmed");
    } else {
      setResult("Verification Failed");
    }
  };

  useEffect(() => {
    if (confirmationCode) {
      verifyUserEmail();
    }
  }, []);
  return (
    <div>
      <div className="">{result}</div>
      <NavLink to="/signin">
        <div className="">Login</div>
      </NavLink>
    </div>
  );
}

export default EmailConfirmation;
