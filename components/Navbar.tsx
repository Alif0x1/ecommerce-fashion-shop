import React from 'react'
import { Container } from './ui/Container'
import Link from 'next/link'
import { MainNav } from './main-nav'
import { getCategorys } from '@/actions/get-categorys'
import NavbarActions from './navbar-actions';



export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategorys()
  return (
    <div className="border-b">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="text-xl font-bold text-gray-900 transition-colors duration-200 hover:text-gray-700">
              OnlineLifestyle
            </p>
          </Link>

          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
}

export default Navbar
