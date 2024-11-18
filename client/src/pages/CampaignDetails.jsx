import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { logo3 } from '../assets';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    if (parseFloat(amount) + parseFloat(state.amountCollected) > parseFloat(state.target)) {
      alert("Donation exceeds the target amount.");
      return;
    }

    setIsLoading(true);
    try {
      await donate(state.pId, amount); 
      navigate('/home');
    } catch (error) {
      console.error("Donation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isCampaignActive = remainingDays > 0 && state.amountCollected < state.target;

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-20 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-[5px] bg-[#ffffff] mt-2 shadow-secondary">
            <div className="absolute h-full bg-[#ffde59]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full cursor-pointer">
                <img src={logo3} alt="user" className="w-[150px] h-[170px] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-black break-all">{state.owner}</h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Story</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#414141] leading-[26px] text-justify">{state.description}</p>
              </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Donators</h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[#414141] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                    <p className="font-epilogue font-normal text-[16px] text-[#414141] leading-[26px] break-ll">{item.donation}</p>
                  </div>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#414141] leading-[26px] text-justify">No donators yet. Be the first one!</p>
                )}
              </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Fund</h4>   

          <div className="mt-[20px] flex flex-col p-4 bg-[#ffde59] rounded-[10px] shadow-secondary">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#ffffff]">
              {isCampaignActive ? "Fund the campaign" : "Campaign has ended"}
            </p>

            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#ffffff] bg-transparent font-epilogue text-black text-[18px] leading-[30px] placeholder:text-[#ffffff] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!isCampaignActive}
              />

              <div className="my-[20px] p-4 bg-[#ffffff] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-black">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>

              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full"
                handleClick={handleDonate}
                disabled={!isCampaignActive} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails