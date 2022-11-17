import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const EditProduct = () => {
  // useParams diye amra kon id ta edit korteci ata check korteci 
  const router = useParams()
  const {id} = router
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const [refresh, setRefresh] = useState(false)
  useEffect(()=>{

    fetch(`https://master-crud-server.vercel.app/product/${id}`)
    .then(res  => res.json())
    .then(data => {
      console.log(data.data)
      if(data.success){
        // toast("data loaded")
        setProduct(data.data)
      }else{
        toast(`${data.error}`)
      }
    })
    .catch(err => toast(`${err.message}`))
    
  } ,[refresh, id]);
  console.log(product)


  const handleSubmit = async(event)=>{
    event.preventDefault()
    // const form = event.target ;
    // const name = form.name.value ;
    // const price = form.price.value;
    // const image = form.image.text;
const product  = {
  name: event.target.name.value,
  price: event.target.price.value,
  image: event.target.image.value,
  }
  console.log(product) 

  // akn new data fetch kore server a patai dibo 
  fetch(`https://master-crud-server.vercel.app/product/${id}`, {
    method: "PATCH", 
    headers: {
      "content-type" : "application/json"
    },
    body: JSON.stringify(product)
  })
  .then(res => res.json())
  .then(data => {
    if(data.success){
      toast.success(`${data.message}`)
      navigate("/dashboard/products")
    }else{
      toast.error(`${data.error}`)
    }
  })
  .catch(err => toast.error(`${err.message}`))

  }
  return (
    <div className="py-36 px-10  w-1/3 mx-auto my-auto">
      <div className="bg-white p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-5">
            <label className="inline-block w-40 mr-6 text-right font-bold text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" defaultValue={product?.name}
            />
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-40 mr-6 text-right font-bold text-gray-600">
              Price
            </label>
            <input
              type="text"
              name="price"
              placeholder="price"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" defaultValue={product?.price}
            />
          </div>

          <div className="flex items-center mb-10">
            <label className="inline-block w-40 mr-6 text-right font-bold text-gray-600">
              Image
            </label>
            <input
              type="text"
              name="image"
              placeholder="url"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" defaultValue={product?.image}
            />
         
           <> <img style={{width: '100px'}} src={product?.image} alt="" /></>
          </div>

          <div className="text-right">
            {/* <button type="submit">Add</button> */}
            <button type="submit"  className="p-4 bg-green-400 text-white font-bold ">Add</button>
          </div>
        </form>
      </div>
            {/* <ToastContainer/> */}
    </div>
  );
};

export default EditProduct;