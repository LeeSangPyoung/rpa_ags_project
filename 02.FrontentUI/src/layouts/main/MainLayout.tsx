import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { RPASider } from "../sidebar";
import { setNavigate } from "../../utils/navigation";



export const MainLayout: React.FC = () => {

  const navigate = useNavigate();

  setNavigate(navigate);


  return (
    <Layout className="min-h-screen gap-3 background-layout p-2">
      <RPASider />
      <Layout className="bg-transparent">
        <div className="bg-white h-full rounded-2xl ">
          <Outlet />
        </div>
      </Layout>
    </Layout>
  )
}
