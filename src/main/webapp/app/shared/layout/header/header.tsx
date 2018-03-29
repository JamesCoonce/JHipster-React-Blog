import './header.css';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import {
  Navbar, Nav, NavItem, NavLink, NavbarToggler, NavbarBrand, Collapse,
  UncontrolledNavDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {
  FaHome, FaThList, FaUserPlus, FaUser, FaFlag, FaHeart,
  FaList, FaTasks, FaDashboard, FaBook, FaWrench, FaSignIn, FaSignOut,
  FaClockO, FaHddO,
  // tslint:disable-next-line
  FaRoad, FaAsterisk
} from 'react-icons/lib/fa';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { locales } from '../../../config/translation';
import appConfig from '../../../config/constants';

export interface IHeaderProps {
  isAuthenticated: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}
const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img
      src="static/images/logo-jhipster-react.svg"
      alt="Logo"
    />
  </div>
);
export class Header extends React.Component<IHeaderProps, { menuOpen: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  handleLocaleChange = event => {
    this.props.onLocaleChange(event.target.value);
  }

  renderDevRibbon = () => (
    process.env.NODE_ENV === 'development' ?
      <div className="ribbon dev"><a href=""><Translate contentKey="global.ribbon.dev" /></a></div> :
      null
  )

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { currentLocale, isAuthenticated } = this.props;
    const entityMenuItems = [
      (
        <DropdownItem tag={Link} key="post" to="/post">
          <FaAsterisk />&nbsp;
          Post
        </DropdownItem>
      ),
      /* jhipster-needle-add-entity-to-menu - - JHipster will add entities to the menu here */
      <span key="dummy-placeholder"/> /* workaround to avoid error when there are no entities */
    ];
    /* jhipster-needle-add-element-to-menu - JHipster will add entities to the menu here */
    const adminMenuItems = [
      <DropdownItem tag={Link} key="user-management" to="/admin/user-management"><FaUser /> User Management</DropdownItem>,
      <DropdownItem tag={Link} key="metrics" to="/admin/metrics"><FaDashboard /> Metrics</DropdownItem>,
      <DropdownItem tag={Link} key="health" to="/admin/health"><FaHeart /> Health</DropdownItem>,
      <DropdownItem tag={Link} key="configuration" to="/admin/configuration"><FaList /> Configuration</DropdownItem>,
      /* TODO: audit menu */
      <DropdownItem tag={Link} key="logs" to="/admin/logs"><FaTasks /> Logs</DropdownItem>,
      /* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */
      <DropdownItem tag={Link} key="docs" to="/admin/docs"><FaBook /> API Docs</DropdownItem>    ];
    const accountMenuItems = [];
    if (isAuthenticated) {
      accountMenuItems.push(
        <DropdownItem tag={Link} key="settings" to="/account/settings"><FaWrench /> Settings</DropdownItem>,
        <DropdownItem tag={Link} key="password" to="/account/password"><FaClockO /> Password</DropdownItem>,
        <DropdownItem tag={Link} key="logout" to="/logout"><FaSignOut /> Logout</DropdownItem>
      );
    } else {
      accountMenuItems.push(
        <DropdownItem tag={Link} key="login" to="/login"><FaSignIn /> Login</DropdownItem>,
        <DropdownItem tag={Link} key="register" to="/register"><FaSignIn /> Register</DropdownItem>
      );
    }

    return (
      <div id="app-header">
        {this.renderDevRibbon()}
        <LoadingBar className="loading-bar"/>
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <NavbarBrand tag={Link} to="/" className="brand-logo">
            <BrandIcon />
            <span className="brand-title"><Translate contentKey="global.title">Reacthip</Translate></span>
            <span className="navbar-version">{appConfig.VERSION}</span>
          </NavbarBrand>
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/" className="d-flex align-items-center">
                  <FaHome />
                  <span>Home</span>
                </NavLink>
              </NavItem>
              {isAuthenticated ? [
                <UncontrolledNavDropdown key="entities">
                  <DropdownToggle nav caret className="d-flex align-items-center">
                    <FaThList />
                    <span>Entities</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    {entityMenuItems}
                  </DropdownMenu>
                </UncontrolledNavDropdown>,
                <UncontrolledNavDropdown key="admin">
                  <DropdownToggle nav caret className="d-flex align-items-center">
                    <FaUserPlus />
                    <span>Administration</span>
                  </DropdownToggle>
                  <DropdownMenu right style={{ width: '120%' }}>
                    {adminMenuItems}
                  </DropdownMenu>
                </UncontrolledNavDropdown>
              ] : null}
              { locales.length > 1 ?
                <UncontrolledNavDropdown>
                  <DropdownToggle nav caret className="d-flex align-items-center">
                    <FaFlag />
                    <span>{currentLocale.toUpperCase()}</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    {locales.map(lang => <DropdownItem key={lang} value={lang} onClick={this.handleLocaleChange}>{lang.toUpperCase()}</DropdownItem>)}
                  </DropdownMenu>
                </UncontrolledNavDropdown> : null
              }
              <UncontrolledNavDropdown>
                <DropdownToggle nav caret className="d-flex align-items-center">
                  <FaUser />
                  <span>Account</span>
                </DropdownToggle>
                <DropdownMenu right>
                  {accountMenuItems}
                </DropdownMenu>
              </UncontrolledNavDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
