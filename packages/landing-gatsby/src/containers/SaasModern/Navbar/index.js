import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import NavbarWrapper from 'reusecore/src/elements/Navbar';
import Drawer from 'reusecore/src/elements/Drawer';
import Button from 'reusecore/src/elements/Button';
import Logo from 'reusecore/src/elements/UI/Logo';
import Box from 'reusecore/src/elements/Box';
import HamburgMenu from 'common/src/components/HamburgMenu';
import Container from 'common/src/components/UI/Container';
import { DrawerContext } from 'common/src/contexts/DrawerContext';
import ScrollSpyMenu from 'common/src/components/ScrollSpyMenu';

import LogoImage from 'common/src/assets/image/saasModern/papercut_logo_box.png';
import LogoImageAlt from 'common/src/assets/image/saasModern/papercut_logo_box.png';

const Navbar = ({ navbarStyle, logoStyle, logoWrapper, button, row, menuWrapper }) => {
  const Data = useStaticQuery(graphql`
    query {
      saasModernJson {
        MENU_ITEMS {
          label
          path
          offset
        }
      }
    }
  `);

  const { state, dispatch } = useContext(DrawerContext);

  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: 'TOGGLE',
    });
  };

  return (
    <NavbarWrapper {...navbarStyle} className="saas_navbar">
      <Container>
        <Box {...row}>
          <Box  {...logoWrapper}>
            <Logo
              href="/"
              logoSrc={LogoImage}
              title="Portfolio"
              logoStyle={logoStyle}
              className="main-logo"
            />
            <Logo
              href="/"
              logoSrc={LogoImageAlt}
              title="Portfolio"
              logoStyle={logoStyle}
              className="logo-alt"
            />
          </Box>
          <Box {...menuWrapper}>
            <ScrollSpyMenu
              className="main_menu"
              menuItems={Data.saasModernJson.MENU_ITEMS}
              offset={-70}
            />
            <a href="#interested_section" className="navbar_button">
              <Button {...button} title="SIGN UP FOR UPDATES" />
            </a>
            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#fff" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <ScrollSpyMenu
                className="mobile_menu"
                menuItems={Data.saasModernJson.MENU_ITEMS}
                drawerClose={true}
                offset={-100}
              />
              <a href="#interested_section" className="navbar_drawer_button">
                <Button {...button} title="SIGN UP FOR UPDATES" />
              </a>
            </Drawer>
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  logoWrapper: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

Navbar.defaultProps = {
  navbarStyle: {
    minHeight: '70px',
    display: 'block',
  },
  row: {
    flexBox: true,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoStyle: {
    maxWidth: ['120px', '130px'],

  },
  logoWrapper: {
    backgroundColor: 'white',
    padding: '10px',

  },
  button: {
    type: 'button',
    fontSize: '13px',
    fontWeight: '700',
    borderRadius: '4px',
    pl: '15px',
    pr: '15px',
    colors: 'secondaryWithBg',
    minHeight: 'auto',
    height: '40px',
  },
  menuWrapper: {
    flexBox: true,
    alignItems: 'center',
  },
};

export default Navbar;
