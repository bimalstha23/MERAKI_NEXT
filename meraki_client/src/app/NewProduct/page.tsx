import Link from "next/link"
import { Cart } from "../Cart/page"

export const NewProduct = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
<h1 className="font-black">New Products</h1>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 shadow-2xl">
<Cart image="" stock="" name="" price="" description=""/>
<Cart image="" stock="" name="" price="" description=""/>
<Cart image="" stock="" name="" price="" description=""/>
<Cart image="" stock="" name="" price="" description=""/>
<Cart image="" stock="" name="" price="" description=""/>
<Cart image="" stock="" name="" price="" description=""/>
<Cart image="" stock="" name="" price="" description=""/>
<Cart image="" stock="" name="" price="" description=""/>
</div>
<Link href="" className="text-error">See More</Link>
    </div>
  )
}
