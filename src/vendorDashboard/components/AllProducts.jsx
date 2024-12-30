import React,{useState,useEffect} from 'react';
import { API_Path } from '../data/ApiPath';
const AllProducts = () => {

    const[products,setProducts]=useState([]);
    const deleteProductById=async(productId)=>
    {
            try{
                   const response=await fetch(`${API_Path}/product/delete/${productId}`,{
                    method:'DELETE'
                   })
                   if(response.ok)
                   {
                      setProducts(products.filter(product=>product._id!==productId));
                      confirm("are you sure you want to delete product?");
                      alert('product deleted successfully');
                   }
               

            }
            catch(error)
            {
                alert('fail to delet product');
              console.log('fail to delete');
            }
    }
    const productsHandler=async()=>
    {
         const firmId=localStorage.getItem('firmId');
         try{
            const response=await fetch(`${API_Path}/product/getproduct/${firmId}`);
             const newProductsData=await response.json();
             setProducts(newProductsData.product);
             console.log(newProductsData.product);
         }
         catch(error)
         {
              console.error("failed to fetch products",error);
              alert('fail to fetch products');
         }
        
    }
    useEffect(()=>
        {
           productsHandler();
           console.log("this is useEffect");
        },[])
    return (
        <>
         <div className="allpages"></div>
        <div>
             {!products ?(<p>No products found</p>):(
                <table className="product-table">
                  <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>image</th>
                        <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                        {products.map((item)=>
                        {
                            return(
                                <>
                                   <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <img src={`${API_Path}/uploads/${item.image}`} alt={item.productName} style={{width:'50px',height:'50px'}}/>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={()=>deleteProductById(item._id)}>delete</button>
                                    </td>
                                   </tr>
                                </>
                            )
                        })}
                  </tbody>
                </table>
             )}
             
        </div>
        </>
    );
};

export default AllProducts;