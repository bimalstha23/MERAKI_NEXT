import Image from 'next/image'
import Link from 'next/link'
export const Login = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className='flex border p-3 rounded-2xl'>
 <Image
      src="/Meraki.png"
      width={300}
      height={300}
      alt="Picture of the author"
    />
    <form className='flex flex-col justify-center items-center'>
<div className='flex flex-row justify-start items-start gap-4'>
    <Image
      src="/Logo.png"
      width={30}
      height={30}
      alt="Picture of the author"
    />
    <h1 className='font-black text-textHighlight text-3xl'>Create Account</h1>
</div>
<div className='flex flex-col justify-start items-start'>
<div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
    </div> 
    <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
    </div> 
</div>
<div className='flex flex-col justify-center items-center'>
<Link href="" className='bg-black text-white p-2'>Sign in</Link>
<span>ALready have an account?<Link href="" className='bg-error'>Log in</Link></span>
</div>
<div className='flex flex-col justify-center items-center'>
  <span>Sign in with </span>
</div>
    </form>
    </div>
      </div>
  )
}
