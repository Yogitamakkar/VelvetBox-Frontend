import { useState } from "react"
import SellerLoginForm from "./SellerLoginForm";

const BecomeSeller = () => {
    const [isLogin,setIsLogin] = useState(false)
    const handleShowPage = () => {
        setIsLogin(!isLogin)
    }
    return(
        <div className="grid md:gap-10 grid-cols-3 min-h-screen">
            <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md">
                 {isLogin ? (
                    <SellerLoginForm handleShowPage={handleShowPage} />
                 ) : (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-2xl font-bold">Become a Seller</h1>
                            <p className="text-gray-500">Create your seller account to start selling.</p>
                        </div>
                        {/* Placeholder for registration form */}
                        <div className="text-center mt-6">
                            <p className="text-sm">
                                Already have an account?{' '}
                                <button
                                    onClick={handleShowPage}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                 )}
            </section>
        </div>
    )
}