import { useEffect, useState } from "react";
function Rowtab(props){

  const checkBoxEventChangeHandler=(e)=>{
      props.getPriceHandler(props.data.price,e.target.checked);
  }
    return(
        <tr>
          {/* all the row items to be displayed */}
          {/* display the ingredients image  */}
          
          <td className="col-4"><img style={{height:"90px",width:"90px"}} src={props.data.image} alt='#' /></td>
              
                    
          <td className="pt-5"><h6> {props.data.tname}  ₹{props.data.price}</h6></td>

              {/* checkbox */}
          <td className="pt-5">
            <div className="form-check">
            <input className="form-check-input ms-2" type="checkbox" value={props.data.price} onChange={checkBoxEventChangeHandler}/>
            <label className="form-check-label">
              <h6>Add</h6>
            </label>
            </div>
          </td>

        </tr>

    )
}
export default Rowtab;
