import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';

interface navListInterface {
    path: string,
    title :string,
    icon: JSX.Element,
}


const navList:navListInterface[] = [
    {
      path:"/home"  ,
      title:"Category",
      icon: <CategoryIcon />,
    },
    {
        path:"/home/products"  ,
        title:"Products",
        icon: <ProductionQuantityLimitsIcon />,
    },
    {
        path:"/home/workers"  ,
        title:"Workers",
        icon: <PeopleAltIcon />,
    },
]

export default navList;