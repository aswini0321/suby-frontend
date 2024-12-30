import React,{useState} from 'react';
import { API_Path } from '../../data/ApiPath';
const AddProduct=()=>
    {
        const[productName,setProductName]=useState("");
        const[price,setPrice]=useState("");
        const[category,setCategory]=useState([]);
        const[bestSeller,setBestSeller]=useState(false);
        const[description,setDescription]=useState("");
        const[image,setImage]=useState(null);
        const handleImageUpload=(event)=>
            {
                 const selectedImage=event.target.files[0];
                 setImage(selectedImage);
            }
            const handleCategoryChange=(event)=>
            {
                const value=event.target.value;
                if(category.includes(value))
                {
                   setCategory(category.filter((item)=>item!=value));
                }
                else
                {
                   setCategory([...category,value])
                }
            }
            const handleBestSeller=(event)=>
            {
                    const value=event.target.value==="true";
                    setBestSeller(value);
            }
        const handleAddProduct=async(e)=>
        {
            e.preventDefault();
            try
            {
                const loginToken=localStorage.getItem('loginToken');
                const firmId=localStorage.getItem('firmId');
                if(!loginToken || !firmId)
                {
                    console.log("user not authenticated");
                }
                const formData=new FormData();
                                   formData.append('productName',productName);
                                   formData.append('price',price);
                                   category.forEach((value)=>{
                                    formData.append('category',value)
                                   })
                                   formData.append('image',image);
                                   formData.append('description',description);
                                   formData.append('bestseller',bestSeller);
                                   const response=await fetch(`${API_Path}/product/add-product/${firmId}`,
                                    {
                                        method:'POST',
                                        body:formData
                                    }
                                   );
                const data= await response.json();
                if(response.ok)
                {
                    console.log(data);
                    alert('product added successfully');
                    setProductName("");
                        setPrice("");
                        setCategory([]);
                        setBestSeller(false);
                        setDescription("")
                        setImage(null)
                }
            }
            catch(error)
            {
                console.error(error);
                  alert("product add failed");
            }
        }
    return (
        <>
         <div className="allpages"></div>
        <div className="firmSection">

           <form className="tableForm" onSubmit={handleAddProduct}>
            <h1> ADD PRODUCT</h1>
            <label>Product Name</label>
            <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)}/>
            <label>Price</label>
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <div className="check-inp">
                <label>Category</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                    <label>Veg</label>
                    <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
                </div>
                <div className="checkboxContainer">
                    <label>Non-Veg</label>
                    <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
                </div>
                </div>
            </div>
            <label>Product Image</label>
            <input type="file" name='image' onChange={handleImageUpload}/><br/>
            <div className="check-inp">
                <label>BestSeller</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                    <label>Yes</label>
                    <input type="radio" value="true" checked={bestSeller===true} onChange={handleBestSeller}/>
                </div>
                <div className="checkboxContainer">
                    <label>No</label>
                    <input type="radio" value="false" checked={bestSeller===false} onChange={handleBestSeller}/>
                </div>
                </div>
            </div>
            <label>Description</label>
            <input type="text" value={description}  onChange={(e)=>setDescription(e.target.value)} />
            <div className="btnSubmit">
            <button type="submit">Submit</button>
            </div>
            </form> 
        </div>
        </>
    );
}

export default AddProduct;