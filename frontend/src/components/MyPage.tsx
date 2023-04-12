import { WoocommerceCustomerResponse } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MyPage() {
  const [user, setUser] = useState<WoocommerceCustomerResponse>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: user }: { data: WoocommerceCustomerResponse } = await axios.get("http://localhost:4000/users/", {
          withCredentials: true,
        });

        setUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Looking for user... please stand by</div>;
  }
  return (
    <div>
      <h2>
        Name: {user?.first_name} {user?.last_name}
      </h2>
      <h2>Email: {user?.email}</h2>
      <h2>Role: {user?.role}</h2>
      <h2>Username: {user?.username}</h2>
    </div>
  );
}
