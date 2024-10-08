const commonStyles='min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white'
import { Spotlight } from "../comp/ui/Spotlight";
const Welcome = () =>{
    return(
        <>
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
            <div className="flex w-full justify-center items-center ">
                <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                    <div className="flex flex-1 justify-start flex-col md:mr-10">
                    
                        <h1 className="text-3xl sm:text-5xl text-white ">
                            CrowdFunding For EveryOne
                        </h1>
                        <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base ">
                            Explore the Crypto World and  make yourself Comfortable
                        </p>
                        <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 ">
                            <div className={`rounded-tl-2xl ${commonStyles}`}>
                                Relaiability
                            </div>
                            <div className={commonStyles}>
                                Security
                            </div>
                            <div className={`rounded-tr-2xl ${commonStyles}`}>
                                Ethereum
                            </div>
                            <div className={`rounded-bl-2xl ${commonStyles}`}>
                                Web 3.0
                            </div>
                            <div className={commonStyles}>
                                Low Cost
                            </div>
                            <div className={`rounded-br-2xl ${commonStyles}`}>
                                BlockChain
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default Welcome;