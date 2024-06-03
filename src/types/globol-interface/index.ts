interface Heder{
    title:string;
    value:string;
}
interface Body {
    id: number;
    [key: string]:any;
}

export interface Props {
  heders: Heder[];
  body: Body[];
  skelatonLoader: boolean;
  deletIdData?:(id:string)=> any;
}