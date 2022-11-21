import "../components/Categories.css"
import {IoCaretUpOutline} from "react-icons/io5"
import {dataTest} from '../DataCategories'
export default function Category(){
    
    return(<>
    <div className="category-icons">
    </div>
    <div className="category-items"> 
         <ul className="ul-cate">
            {dataTest.map((data,index)=>{
                return(
                    <li  className="li-cate" key={index}>{data.name}</li>
                )
            })}
            
        </ul>
    </div>
   
    </>)
}