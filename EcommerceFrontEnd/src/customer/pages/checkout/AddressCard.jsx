import { Radio } from "lucide-react";
import { useFormik } from 'formik';
import React from "react";

export default function AddressCard(){
    const handleChange=(e)=>{
        console.log(e.target.value)
    }
    
    return (
        <div>
            <div>
                <Radio 
                    checked = {true}
                    onChange={handleChange}
                    value=""
                    name="radio-button"
                />
            </div>
            <div className="space-y-3 pt-3">
                <h1>GiftHaven</h1>
                <p>mohali india </p>
                <p>
                    <strong>Mobile: </strong> 9898989899
                </p>
            </div>
        </div>
    )
}