import AddressCard from "../../checkout/AddressCard";

export default function SavedAddresses(){
    return(
        <>
             <div className='bg-white px-10 py-5 mt-4 shadow shadow-lg rounded-xl'>
                    <AddressCard/>
                  </div>
                  <div className='bg-white px-10 py-5 mt-4 shadow shadow-lg rounded-xl'>
                    <AddressCard/>
                  </div> 
        </>
    )
}