import React from "react";

const Dots = ({length,currentIndex,setCurrentIndex , className})=>{
    return(
        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 ${className}`}>
            {Array.from({length}).map((_,i)=>(
                <button
                    key={i}
                    onClick={()=>setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentIndex === i
                        ? "bg-white w-6" // Active dot is wider
                        : "bg-gray-400 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                />
            ))}
        </div>
    )
}

export default Dots;
