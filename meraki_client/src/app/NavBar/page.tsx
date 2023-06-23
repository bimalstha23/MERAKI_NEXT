'use client'
import { Gudea } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import {GiHamburgerMenu} from "react-icons/gi"
import { Drawer } from "@mui/material";
import { ImCross } from "react-icons/im";
import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'EARRINGS',
  'HAIR STICKS',
  'RINGS',
  'BRACELETES',
  'NECKLACE',
  'CLIPS',
];
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export const NavBar = () => {
  const [searchparam, setSearchParam] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleClose = () => {
    setShowMenu(false);
  };
  const showmenu = showMenu ? "block " : "hidden";
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
  <div className='flex flex-col'>
    <div className='flex flex-row justify-center items-center bg-gray gap-9'>
         <Image
      src="/Logo.png"
      height={61}
      width={61}
      alt="Picture of the author"
    />
      <button className=" sm:hidden max-sm:block text-white">
            <GiHamburgerMenu size={30} onClick={() => setShowMenu(true)} />
          </button>
     <div className="relative text-gray-600">
        <input className="border-2 border-gray-300 bg-white h-10 px-5 max-sm:px-0 max-sm:pr-0 pr-20 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search"/>
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 56.966 56.966" 
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
      <div className='flex text-white gap-4 font-black max-sm:hidden'>
<Link href="">Home</Link>
<Link href="">Collection</Link>
<Link href="">Products</Link>
      </div>
      <div className='flex text-white gap-5 max-sm:hidden'>
    <Link href="">Cart</Link>
    <Link href="">Account</Link>
      </div>
    </div>

    <div className='flex flex-row justify-center items-center bg-primary text-black gap-4 p-2'>

<div className='md:hidden'>
<FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>All Categories</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>All Categories</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
</div>
<div className='max-sm:hidden'>

<Link href="">ALL CATEGORIES</Link>
<Link href="">EARRINGS</Link>
<Link href="">HAIR STICKS</Link>
<Link href="">RINGS</Link>
<Link href="">BRACELETS</Link>
<Link href="">NECKLACE</Link>
<Link href="">CLIPS</Link>
</div>
    </div>
  
    <div>
    <Drawer
        open={showMenu}
        onClose={handleClose}
        anchor="right"
        className="max-sm:block hidden"
      >
        <div className="h-full bg-black flex justify-center items-center flex-col">
          <button className="text-white pt-16">
            <ImCross size={40} onClick={() => setShowMenu(false)} />
          </button>
          <div className="max-sm:flex flex-col justify-center items-center   w-[50vh] bg-black h-full ">
            <div className={`${showmenu} max-sm:block w-full text-center text-white`}>
              <ul className="list-none flex flex-col gap-10">
              <Link href="">Home</Link>
<Link href="">Collection</Link>
<Link href="">Products</Link>
<Link href="">Cart</Link>
<Link href="">Account</Link>
              </ul>
            
            </div>
          </div>
        </div>
      </Drawer>
    </div>
   
  </div>
  )
}
