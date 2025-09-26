import { Divider, Layout, Menu } from 'antd';
import { useState } from 'react';
import skLogo from "../../asset/skLogo.svg";
import { CollapseIcon } from '../../components/shared';
import styles from "./RPASider.module.scss";
import { RpaUserInfo } from '../../components/RpaUserInfo';
import { useAuthStore } from '../../stores';
import { ADMIN_USER } from '../../constants/auth-roles';
import { adminMenuItem, userMenuItem } from './utils/menuItems';

const { Sider } = Layout;

export const RPASider: React.FC = () => {
  const [isCollapseMenu, setIsCollapseMenu] = useState<boolean>(false)
  const roles = useAuthStore((state) => state.roles)
  const isAdminAccess = roles.some((role) => ADMIN_USER.includes(role));



  return (
    <>
      <Sider collapsed={isCollapseMenu} collapsedWidth={96} width="20%" className="bg-transparent">
        <div className={`flex-row ${styles["glass-card"]}`} >
          <div>
            <div className={`flex ${isCollapseMenu ? 'justify-center' : 'justify-between'}`}>
              {!isCollapseMenu &&
                <img src={skLogo} alt=''/>
              }
              <CollapseIcon onClick={() => setIsCollapseMenu(!isCollapseMenu)} />
            </div>

            <Menu
              className={`${styles["menu"]} !border-0`}
              mode="inline"
              defaultSelectedKeys={['1']}
              items={isAdminAccess ? adminMenuItem : userMenuItem}
            />

          </div>
          <div>
            <Divider className='mb-3 border-[#FFFFFF33]'/>
            <RpaUserInfo isCollapsed={isCollapseMenu}/>
          </div>

        </div>

      </Sider>

    </>
  )
}
