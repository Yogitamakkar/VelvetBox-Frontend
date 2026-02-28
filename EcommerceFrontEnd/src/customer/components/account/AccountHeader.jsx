import React from "react";

export default function AccountHeader(){
    return(
        <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Account
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your orders, profile, and preferences
              </p>
        </div>
    )
}