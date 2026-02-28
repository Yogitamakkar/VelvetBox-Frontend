import { Divider, TextField, Typography } from "@mui/material";
import React from "react";

export default function ProfileFieldCard({item}){
    return(
        <div >
            <div className="flex flex-col sm:flex-row sm:items-center py-3">
                <Typography 
                    variant="body2" 
                    className="text-gray-600 font-medium mb-1 sm:mb-0 sm:w-1/3"
                >
                    {item.label}
                </Typography>
                <Typography 
                    variant="body1" 
                    className="text-gray-900 sm:flex-1"
                >
                    {item.value}
                </Typography>
            </div>
            {/* {index < userInfo.length - 1 && (
                <Divider className="opacity-30" />
            )} */}
        </div>
    )
}