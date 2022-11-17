import { Dropdown, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [refresh, setRefresh] = useState(false)
  useEffect(()=>{

    fetch("http://localhost:5000/product")
    .then(res  => res.json())
    .then(data => {
      console.log(data.data)
      if(data.success){
        // toast("data loaded")
        setProducts(data.data)
      }else{
        toast(`${data.error}`)
      }
    })
    .catch(err => toast(`${err.message}`))
    
  } ,[refresh]);

const navigate = useNavigate()

const handleEdit = (id)=> {
  // console.log("Edit button is clicked", id)
  navigate(`/dashboard/product/edit/${id}`)
}



const handleDelete = (id) =>{
  // console.log("Delete button is clicked", id)
  fetch(`http://localhost:5000/product/${id}`, {
    method: "DELETE",
  }).then(res => res.json())
  .then(data =>{
    console.log(data)
    if(data.success){
      toast.success(`${data.message}`)
      setRefresh(!refresh)
    }
    else{
      toast.error(`${data.error}`)
    }
  }).catch( err => toast(err.message) )
}

  return (
    <div className="w-full">
      {products.length}
    <Table striped={true}>
  <Table.Head>
    <Table.HeadCell>
      Image
    </Table.HeadCell>
    <Table.HeadCell>
      Name
    </Table.HeadCell>
    <Table.HeadCell>
      Price
    </Table.HeadCell>
    <Table.HeadCell>
      Actions
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        Edit
      </span>
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">
    {products.map(product => {
      return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>
        <img style={{width: '50px'}} src={product.image} alt={product.name} />
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      {product.name}
      </Table.Cell>

      <Table.Cell>
       ${product.price}
      </Table.Cell>
      <Table.Cell>
      <Dropdown
  label="Action " arrowIcon={false}
  dismissOnClick={false}
>
  <Dropdown.Item onClick={()=> handleEdit(product._id)}>
    edit
  </Dropdown.Item>
  <Dropdown.Item onClick={()=> handleDelete(product._id)}>
    Delete
  </Dropdown.Item>
</Dropdown>
      </Table.Cell>
    </Table.Row>
    })}
   
  </Table.Body>
</Table>
    </div>
  );
};

export default AllProducts;
