import { Check, X, Package, Truck, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function OrderStepper({orderStatus}) {

  const steps = [
    { 
      name: "Order Placed", 
      description: "on Thu, 11 Jul", 
      value: "PLACED",
      icon: Check
    },
    {
      name: "Packed", 
      description: "Item Packed in Dispatch Warehouse", 
      value: "CONFIRMED",
      icon: Package
    },
    {
      name: "Shipped", 
      description: "by Mon, 15 Jul", 
      value: "SHIPPED",
      icon: Truck
    },
    {
      name: "Arriving", 
      description: "by 16 Jul - 18 Jul", 
      value: "ARRIVING",
      icon: MapPin
    },
    {
      name: "Arrived", 
      description: "Package delivered", 
      value: "DELIVERED",
      icon: Check
    }
  ];

  const cancelledSteps = [
    {
      name: "Order Placed",
      description: "on Thu, 11 Jul",
      value: "PLACED",
      icon: Check
    },
    {
      name: "Order Cancelled",
      description: "on Thu, 11 Jul",
      value: "CANCELLED",
      icon: X
    }
  ];

  const [statusSteps, setStatusSteps] = useState(steps);

  useEffect(() => {
    if(orderStatus?.toUpperCase() === "CANCELLED") {
      setStatusSteps(cancelledSteps);
    } else {
      setStatusSteps(steps);
    }
  }, [orderStatus]);
  
  const getStepIndex = (status) => {
    return statusSteps.findIndex(step => step.value === status?.toUpperCase());
  }

  const getCurrentIndex = () => {
    return getStepIndex(orderStatus);
  }
   
  const getStepStatus = (stepIndex) => {
    const currentIndex = getCurrentIndex();
    const isCancelled = orderStatus?.toUpperCase() === "CANCELLED";

    if(isCancelled) {
      if(stepIndex === 0) return "completed";
      if(stepIndex === 1) return "cancelled";
      return "inactive";
    }
    
    if(stepIndex < currentIndex) return "completed";
    if(stepIndex === currentIndex) return "current";
    return "upcoming";
  }

  const getStepStyles = (status, isLast) => {
    const baseStyles = "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200";
    
    switch (status) {
      case "completed":
        return `${baseStyles} bg-teal-500 text-white`;
      case "current":
        return `${baseStyles} bg-blue-500 text-white`;
      case "cancelled":
        return `${baseStyles} bg-red-500 text-white`;
      case "upcoming":
        return `${baseStyles} bg-gray-200 text-gray-400`;
      default:
        return `${baseStyles} bg-gray-200 text-gray-400`;
    }
  };

  const getLineStyles = (status) => {
    switch (status) {
      case "completed":
        return "bg-teal-500";
      case "cancelled":
        return "bg-red-500";
      case "current":
        return "bg-blue-500";
      default:
        return "bg-gray-200";
    }
  };

  const getTextStyles = (status) => {
    switch (status) {
      case "cancelled":
        return "text-red-600";
      case "current":
        return "text-blue-600";
      case "completed":
        return "text-gray-800";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white p-6 w-full mx-auto">
      <div className="space-y-0 ">
        {statusSteps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === statusSteps.length - 1;
          const IconComponent = step.icon;

          return (
            <div key={index} className="relative">
              <div className="flex items-start">
                <div className="flex flex-col items-center">
                  <div className={getStepStyles(status, isLast)}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 h-8 mt-2 ${getLineStyles(getStepStatus(index + 1))}`} />
                  )}
                </div>
                <div className="ml-4 pb-8">
                  <h3 className={`font-medium ${getTextStyles(status)}`}>
                    {step.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}