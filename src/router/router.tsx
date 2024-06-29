import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";

import App from "../App";
import {Auth, Arror, Category,SubCategory , Brand , Settings , BrandCategory, SingleBrandCategory , Product , ProductDetalis , Stock , Banner} from "@pages"
import {HomeLayout} from "@layut"

const index = ()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<Auth />} />
            <Route path="/home/*" element={<HomeLayout />} >
                <Route index element={<Category />} />
                <Route path="category/:subcategory" element={<SubCategory /> } /> 
                <Route path="brands" element={<Brand />} />
                <Route path="brand-catigory" element={<BrandCategory />} />
                <Route path="brands/:brandId" element={<SingleBrandCategory/>} />
                <Route path="settings" element={<Settings />} />
                <Route path="products" element={<Product />} />
                <Route path="products/:id" element={<ProductDetalis/>} />
                <Route path="stock" element={<Stock />} />
                <Route path="banner" element={<Banner/>} />
            </Route>  
            <Route path="*" element={<Arror />} />
            
          </Route>
        )
      );
      return <RouterProvider router={router} />;
}

export default index;