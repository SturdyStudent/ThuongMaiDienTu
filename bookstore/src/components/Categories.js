import "../components/Categories.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {ChangeHistoryIcon} from '@mui/material/ChangeHistory';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
export default function Category(){
    const dataTest=[
        {
            "name":"hoang"
        },
        {
            "name":"hoang"
        },
        {
            "name":"hoang"
        },
    ]
    return(<>
        <ul className="ul-cate">
            {dataTest.map((data,index)=>{
                return(
                    <li  className="li-cate" key={index}>{data.name}<ThreeDRotation/></li>
                )
            })}
            
        </ul>
    </>)
}