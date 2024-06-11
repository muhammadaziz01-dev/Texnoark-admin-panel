import * as React from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { toast  } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

import useProductStore from "@store-product"


export default function FadeMenu({id}: {id: number}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // my function start ----------------------

  
  // const navigate = useNavigate();
  const {deleteProductDetels} = useProductStore();

  const deleteData = async() => {
    try{
        const respons = await deleteProductDetels(id);
        if(respons.status === 200){
            toast.success("Delete product deleted")
            handleClose()
            setTimeout(()=>{
              window.location.reload()
            },1000)
        }
    }catch(err){
        toast.error("Something went wrong");
        handleClose()
    }
     
  }

  // my function end ----------------------

  return (
    <div>
      <button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        className="py-2 px-5 rounded-md bg-red-500 text-white font-medium hover:bg-red-700 duration-300 active:bg-red-500"
        
      >
        delete
      </button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        sx={{marginTop: 1}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <div className='px-4 py-2'>
            <h3 className=''>Sir, do you want to delete your account ?</h3>
            <div className='flex items-center justify-end gap-3 mt-2'>
                <button onClick={handleClose} className='py-1 px-2 rounded-md bg-[#D52200] text-white'>No</button>
                <button onClick={deleteData} className='py-1 px-2 rounded-md bg-[#D52200] text-white'>Yes</button>
            </div>
        </div>
        
        </Menu>
    </div>
  );
}
