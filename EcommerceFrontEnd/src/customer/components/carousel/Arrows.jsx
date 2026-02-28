
import { ChevronLeft, ChevronRight } from "lucide-react";

const Arrows = ({onClick,direction,className})=>{
    const isleft = direction === "left"
    return(
        <button
            onClick={onClick}
            className={`absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm text-white shadow-md transition-all duration-300 ${className}`}
        >
            {isleft ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
    )
}
export default Arrows;
