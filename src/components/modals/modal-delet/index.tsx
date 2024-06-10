import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import DeleteIcon from "@mui/icons-material/Delete";
import { toast  } from 'react-toastify';

import useBrandStore from '@store-brand';
import useCategoryStore from '@stor-category';
import useBrandCategoryStore from '@store-brand-category';
import useSubCategoryStore from '@store-sub-category';
import useProductStore from '@store-product';
import useStockStore from '@store-stock';




export default function FadeMenu({id , title}:{id:number , title : string}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // my function start ----------------------
 const {deleteBrand} = useBrandStore();
 const {deleteDataCategory} = useCategoryStore();
 const {deleteBrandCategory} = useBrandCategoryStore();
 const {deleteDataSubCatigory} = useSubCategoryStore();
 const {deleteProduct} = useProductStore();
 const {deleteStock} = useStockStore();


  
  const deleteData = async() => {
    if(title == "brand"){
      try{
          const staus = await deleteBrand(id)
        if(staus === 200){
          handleClose()
          toast.success("Brand deleted successfully")
        } 
      }catch(err:any){
          toast.error("Error " + err?.message)
          console.log(err);
      }
    }else if (title == "category"){
      try{
          const staus = await deleteDataCategory(id)
        if(staus === 200){
          handleClose()
          toast.success("Category deleted successfully")
        } 
      }catch(err:any){
          toast.error("Error " + err?.message)
          console.log(err);
      }
    }else if (title == "brand-category"){
      try{
        const staus = await deleteBrandCategory(id)
      if(staus === 200){
        handleClose()
        toast.success("Category deleted successfully")
      } 
    }catch(err:any){
        toast.error("Error " + err?.message)
        console.log(err);
    }
    }else if (title == "sub-category"){
      try{
        const staus = await deleteDataSubCatigory(id)
      if(staus === 200){
        handleClose()
        toast.success("Category deleted successfully")
      } 
    }catch(err:any){
        toast.error("Error " + err?.message)
        console.log(err);
    }
    }else if (title == "product"){
      try{
        const staus = await deleteProduct(id)
      if(staus === 200){
        handleClose()
        toast.success("Category deleted successfully")
      } 
    }catch(err:any){
        toast.error("Error " + err?.message)
        console.log(err);
    }
    }else if (title == "stock"){
      try{
        const staus = await deleteStock(id)
      if(staus === 200){
        handleClose()
        toast.success("Category deleted successfully")
      } 
    }catch(err:any){
        toast.error("Error " + err?.message)
        console.log(err);
    }
    }
  }

  // my function end ----------------------

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        
      >
        <DeleteIcon/>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{marginTop: 1}}
      >
        <div className='px-4 py-2'>
            <h3 className=''>Are you sure you want to delete?</h3>
            <div className='flex items-center justify-end gap-3 mt-2'>
                <button onClick={handleClose} className='py-1 px-2 rounded-md bg-[#D52200] text-white'>No</button>
                <button onClick={deleteData} className='py-1 px-2 rounded-md bg-[#D52200] text-white'>Yes</button>
            </div>
        </div>
        
        </Menu>
    </div>
  );
}
