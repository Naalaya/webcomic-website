import React from 'react'
import HeaderItems from './Header-items'
import { IoIosHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { BsPersonFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import { MdOutlineCatchingPokemon } from "react-icons/md"
import DarkModeSwitch from './DarkModeSwitch';
import SearchBar from './SearchBar';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";


export default function Header() {
  return (
    <div className="flex bg-slate-200 dark:bg-gray-700 item-center justify-between p-3 pl-10">
      <div className='flex gap-5'>
        <HeaderItems title='Trang Chủ' address='/' Icon={IoIosHome} />
        <HeaderItems title='Thông Tin ' address='/about' Icon={FcAbout} />
        <SearchBar />
      </div>
      <div className='flex gap-5'>
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignUpButton mode='modal'/>
          <SignInButton mode='modal'/>
        </SignedOut>
        {/* <HeaderItems title='Đăng Ký' address='/' Icon={BsPersonFill} /> */}
        {/* <HeaderItems title='Đăng Nhập' address='/' Icon={MdLogin} /> */}
        <DarkModeSwitch />
      </div>

    </div>

  )
}
