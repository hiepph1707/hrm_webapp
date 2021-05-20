import { ProSidebar, Menu, MenuItem, SubMenu,SidebarHeader, SidebarFooter,SidebarContent } from 'react-pro-sidebar';
import { FaFileContract,FaRegNewspaper,FaRegChartBar,FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { BsPeopleCircle } from 'react-icons/bs';
import { FaNetworkWired, FaSignOutAlt } from 'react-icons/fa';
import { FaRegCreditCard } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import { HiMenu } from 'react-icons/hi';
import { BsCalendar } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import {useCookies} from 'react-cookie';
import {
  Link
} from "react-router-dom";
import {COOKIE_USER_NAME,COOKIE_USER_PERMISSION,ROLE_HRM_ADMIN} from '../common/Constant'
import { BiClipboard } from "react-icons/bi";

function SideBar({isCollapse,isToggle,handleToggleSidebar,username}){
  const [cookies,setCookies,removeCookies] = useCookies([COOKIE_USER_PERMISSION])


  const _rederLinkSetting = () => {
    if(cookies.user_role && cookies.user_role.includes(ROLE_HRM_ADMIN)){
      return   <SubMenu  icon={<IoSettingsSharp />} title="Hệ thống">
                <MenuItem><Link to="/home/setting/">Import chấm công</Link></MenuItem>
              </SubMenu>
    }else{
      return ""
    }

  }

	return(
		<ProSidebar
		collapsed={isCollapse}
		toggled={isToggle}
		breakPoint="md"
		onToggle={handleToggleSidebar}
		>
			<SidebarHeader>
		        <div
		          style={{
		            padding: '24px',
		            textTransform: 'uppercase',
		            fontWeight: 'bold',
		            fontSize: 14,
		            margin:'auto',
		            textAlign: 'center',
		            letterSpacing: '1px',
		            overflow: 'hidden',
		            textOverflow: 'ellipsis',
		            whiteSpace: 'nowrap',
		          }}
		        >
					<div className="timekeeping-menu-icon">
						<BsPeopleCircle />
					</div>

					<div className="timekeeping-menu-user text-wrap" style={{overflowWrap:"anywhere"}}>
						<span>{username}</span>
					</div>
		        </div>
		      </SidebarHeader>

			<SidebarContent>
				<Menu iconShape="circle">
				    <MenuItem icon={<BsCalendar />}><Link to="/home/timekeeping/">Chấm công</Link></MenuItem>
				    <MenuItem icon={<FaRegCreditCard />}><Link to="/home/paycheck/">Phiếu lương</Link></MenuItem>
            {_rederLinkSetting()}
				</Menu>
			</SidebarContent>
		</ProSidebar>
	)
}

export default SideBar
