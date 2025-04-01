import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'
import { NavigationMenu, NavigationMenuList } from './ui/navigation-menu'

const NavBarComponent = () => {
  return (
    <Navbar fluid rounded>
    <NavbarBrand as={Link} href="/" className='order-2 '>
      <img src="/assets/SBLogo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Study Buddies</span>
    </NavbarBrand>
    <NavbarToggle className='order-1'/>
    <NavbarCollapse className='order-3'>
    </NavbarCollapse>
      <NavbarLink href="#" active>
        Home
      </NavbarLink>
      <NavbarLink as={Link} href="#">
        About
      </NavbarLink>
      <NavbarLink href="#">Services</NavbarLink>
      <NavbarLink href="#">Pricing</NavbarLink>
      <NavbarLink href="#">Contact</NavbarLink>
  </Navbar>
  )
}

export default NavBarComponent