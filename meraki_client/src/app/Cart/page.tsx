import Image from 'next/image'


export const Cart = ({image,stock,name,price,description}) => {
  return (
    <div className="flex flex-col justify-center items-center border">
 <Image
      src={image}
      width={330}
      height={250}
      alt="Picture of the author"
    />
<span>{stock}</span>
<h1>{name}</h1>
<p>{description}</p>
<h1>{price}</h1>
<button className='bg-gray text-white'>Add to cart</button>
    </div>
  )
}


