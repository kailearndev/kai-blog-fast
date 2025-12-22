import { AuthService } from "@/services/auth";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await AuthService.getMe();
    console.log("User Info:", response);
  };
  return <div>Dashboard Page</div>;
};

export default Dashboard;
