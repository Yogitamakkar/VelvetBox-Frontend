import { Button, Card, CardContent, Typography, Divider } from "@mui/material";
import { Edit3 } from "lucide-react";
import React from "react";
import ProfileFieldCard from "../../../../component/ProfileFieldCard";

export default function UserDetails() {
    const userInfo = [
        { label: "Full Name", value: "Ashok Kumar" },
        { label: "Email", value: "ashok.kumar@email.com" },
        { label: "Phone", value: "9021379136" },
        { label: "Date of Birth", value: "15/08/1990" }
    ];

    return (
        <div className="space-y-6">
            <Card elevation={2}>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Typography variant="h5" className="font-semibold text-gray-800">
                            Personal Information
                        </Typography>
                    </div>
                    
                    <div className="space-y-4">
                        {userInfo.map((item, index) => (
                            <ProfileFieldCard key={index} item={item}/>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}