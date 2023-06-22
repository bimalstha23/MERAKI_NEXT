import Image from 'next/image'
import Link from 'next/link'

export const NavBar = () => {
  return (
  <div className='flex flex-col'>
    <div className='flex flex-row justify-center items-center bg-gray gap-9'>
         <Image
      src="/Logo.png"
      height={61}
      width={61}
      alt="Picture of the author"
    />
     <div className="relative text-gray-600">
        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-20 rounded-lg text-sm focus:outline-none"
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
      <div className='flex text-white gap-4 font-black'>
<Link href="">Home</Link>
<Link href="">Collection</Link>
<Link href="">Products</Link>
      </div>
      <div className='flex text-white gap-5'>
    <Link href="">Cart</Link>
    <Link href="">Account</Link>
      </div>
    </div>

    <div className='flex flex-row justify-center items-center bg-primary text-black gap-4 p-2'>
<Link href="">ALL CATEGORIES</Link>
<Link href="">EARRINGS</Link>
<Link href="">HAIR STICKS</Link>
<Link href="">RINGS</Link>
<Link href="">BRACELETS</Link>
<Link href="">NECKLACE</Link>
<Link href="">CLIPS</Link>
    </div>
  </div>
  )
}
