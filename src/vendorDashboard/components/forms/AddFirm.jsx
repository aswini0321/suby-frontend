import React,{useState} from 'react';
import { API_Path } from '../../data/ApiPath';

const AddFirm=()=>
    {
         const [firmName,setFirmName]=useState("");
         const [area,setArea]=useState("");
         const [category,setCategory]=useState([]);
         const [region,setRegion]=useState([]);
         const[offer,setOffer]=useState("");
         const[file,setFile]=useState(null);
         const handleImageUpload=(event)=>
         {
              const selectedImage=event.target.files[0];
              setFile(selectedImage);
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
         const handleRegionChange=(event)=>
            {
                const value=event.target.value;
                if(region.includes(value))
                {
                   setRegion(region.filter((item)=>item!=value));
                }
                else
                {
                   setRegion([...region,value])
                }
            }
         const handleFirmSubmit=async(e)=>
         {
              e.preventDefault();
              try{
                   const loginToken=localStorage.getItem('loginToken');
                   if(!loginToken)
                   {
                       console.log("user not authenticated")
                   }
                   const formData=new FormData();
                   formData.append('firmName',firmName);
                   formData.append('area',area);
                   formData.append('offer',offer);
                   category.forEach((value)=>{
                    formData.append('category',value)
                   })
                   region.forEach((value)=>{
                    formData.append('region',value);
                   })
                   formData.append('image',file);
                   const response=await fetch(`${API_Path}/firm/add-firm`,
                    {
                        method:'POST',
                        headers:
                        {
                            'token':`${loginToken}`
                        },
                        body:formData
                    }
                   );
                   const data=await response.json();
                   if(response.ok)
                   {
                        console.log(data);
                        alert("firm added successfully");
                        const firmId=data.firmId;
                        localStorage.setItem('firmId',firmId)
                        setFirmName("");
                        setArea("");
                        setCategory([]);
                        setRegion([]);
                        setOffer("")
                        setFile(null)

                   }
                   else if(data.message=="vendor can have only one firm")
                   {
                      alert("firm exists only 1 firm can be added");
                   }
                   else{
                    alert('fail to add firm');
                   }
              }
              catch(error)
              {
                   alert("fail to add firm");
                   console.error(error);
              }
         }

    return (
        <>
         <div className="allpages"></div>
        <div className="firmSection">

           <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h1> ADD FIRM</h1>
            <label>Firm Name</label>
            <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
            <label>Area</label>
            <input type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)}/>
            {/* <label>Category</label>
            <input type="text"/> */}
            <div className="check-inp">
                <label>Category</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                    <label>Veg</label>
                    <input type="checkbox" name="veg" checked={category.includes('veg')} onChange={handleCategoryChange} value="veg"/>
                </div>
                <div className="checkboxContainer">
                    <label>Non-Veg</label>
                    <input type="checkbox" name="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} value="non-veg"/>
                </div>
                </div>
            </div>
            <div className="reg-inp">
                <label>Region</label>
                <div className="inputsContainer">
                <div className="regboxContainer">
                    <label>South-Indian</label>
                    <input type="checkbox" checked={region.includes('south-indian')} onChange={handleRegionChange} value="south-indian"/>
                </div>
                <div className="regboxContainer">
                    <label>North-Indian</label>
                    <input type="checkbox" checked={region.includes('north-indian')} onChange={handleRegionChange} value="north-indian"/>
                </div>
                <div className="regboxContainer">
                    <label>Chinese</label>
                    <input type="checkbox" checked={region.includes('chinese')} onChange={handleRegionChange}
                    value="chinese"/>
                </div>
                <div className="regboxContainer">
                    <label>Bakery</label>
                    <input type="checkbox" checked={region.includes('bakery')} onChange={handleRegionChange} value="bakery"/>
                </div>
                </div>
            </div>
            <label>Offer</label>
            <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
            <label>Firm Image</label>
            <input type="file" name='image' onChange={handleImageUpload}/><br/>
            <div className="btnSubmit">
            <button type="submit">Submit</button>
            </div>
            </form> 
        </div>
        </>
    );
}

export default AddFirm;