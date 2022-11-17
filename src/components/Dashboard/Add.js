import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Add = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name: e.target.name.value,
      price: parseInt(e.target.price.value),
      image: e.target.image.value,
    };
    console.log(product)

    fetch("https://master-crud-server.vercel.app/product", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(product)
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.succeess){
        // alert("success")
       toast.success(`${data.message}`)
      } else {
        toast.error(`${data.error}`);
      }
    })
    .catch(err => {
      toast.error(`${err.message}`);
    })
    
  };
  
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
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
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
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
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
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>

          <div className="text-right">
            {/* <button type="submit">Add</button> */}
            <button type="submit"  className="p-4 bg-green-400 text-white font-bold ">Add</button>
          </div>
        </form>
      </div>
            <ToastContainer/>
    </div>
  );
};

export default Add;
