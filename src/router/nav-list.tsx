import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

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
        path:"/home/brands"  ,
        title:"Brands",
        icon: <MilitaryTechIcon />,
    },
    {
        path:"/home/brand-catigory"  ,
        title:"Brand-Catigory",
        icon: <DynamicFeedIcon />,
    },
    {
        path:"/home/models"  ,
        title:"Models",
        icon: <ModelTrainingIcon />,
    },
    {
        path:"/home/products"  ,
        title:"Products",
        icon: <ProductionQuantityLimitsIcon />,
    },
    {
        path:"/home/stock"  ,
        title:"Stock",
        icon: <MonetizationOnIcon />,
    },
    {
        path:"/home/settings"  ,
        title:"Settings",
        icon: <SettingsIcon />,
    },
    {
        path:"/home/banner"  ,
        title:"Banner",
        icon: <ViewCarouselIcon />,
    },
]

export default navList;