import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { logo3 } from '../assets';
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";


const CampaignDetails = ({ isAdmin }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address, approveCampaign, rejectCampaign } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    if (parseFloat(amount) + parseFloat(state.amountCollected) > parseFloat(state.target)) {
      setAlertMessage("Donation exceeds the target amount.");
      setAlertOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      await donate(state.pId, amount);
      setAlertMessage("Donation successful!");
      setAlertOpen(true);
      navigate("/home");
    } catch (error) {
      console.error("Donation failed", error);
      setAlertMessage("Donation failed. Please try again.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (pId) => {
    setIsLoading(true);
    try {
      await approveCampaign(pId);
      setAlertMessage(`Campaign ${pId} approved successfully.`);
      setAlertOpen(true);
      navigate("/home"); // Redirect after approval
    } catch (error) {
      console.error("Error approving campaign:", error);
      setAlertMessage("Failed to approve campaign. Check the console for details.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (pId) => {
    setIsLoading(true);
    try {
      await rejectCampaign(pId);
      setAlertMessage(`Campaign ${pId} rejected successfully.`);
      setAlertOpen(true);
      navigate("/home"); // Redirect after rejection
    } catch (error) {
      console.error("Error rejecting campaign:", error);
      setAlertMessage("Failed to reject campaign. Check the console for details.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isCampaignActive = state.status === 'approved' && remainingDays > 0;

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-20 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#ffffff] mt-2 shadow-secondary">
            <div
              className="absolute h-full bg-[#ffde59]"
              style={{
                width: `${calculateBarPercentage(state.target, state.amountCollected)}%`,
                maxWidth: '100%',
              }}
            ></div>
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
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
              Creator
            </h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full cursor-pointer">
                <img src={logo3} alt="user" className="w-[150px] h-[170px] object-contain" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-black break-all">
                  {state.owner}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Story</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#414141] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#414141] leading-[26px] break-ll">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#414141] leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#414141] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Fund</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#ffde59] rounded-[10px] shadow-secondary">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#ffffff]">
              {isCampaignActive ? "Fund the campaign" : "Campaign is not active or approved"}
            </p>

            {isCampaignActive && (
              <div className="mt-[30px]">
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#ffffff] bg-transparent font-epilogue text-black text-[18px] leading-[30px] placeholder:text-[#ffffff] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className="my-[20px] p-4 bg-[#ffffff] rounded-[10px]">
                  <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-black">
                    Back it because you believe in it.
                  </h4>
                  <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                    Support the project for no reward, just because it speaks to you.
                  </p>
                </div>

                <CustomButton
                  btnType="button"
                  title="Fund Campaign"
                  styles="w-full"
                  handleClick={handleDonate}
                />
              </div>
            )}
          </div>
        </div>

        {isAdmin && (
          <div className="flex justify-around mt-6">
            <button
              onClick={() => handleApprove(state.pId)}
              className="text-[#37ff2c] px-2 py-1 hover:scale-110 transition-transform"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(state.pId)}
              className="text-[#ff2323] px-2 py-1 hover:scale-110 transition-transform"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Reject
            </button>
          </div>
        )}
      </div>
      {/* Alert Section */}
      <Box
        sx={{
          position: "fixed",
          top: "4rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "400px",
          zIndex: 1000,
        }}
      >
        <Collapse in={alertOpen}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setAlertOpen(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alertMessage}
          </Alert>
        </Collapse>
      </Box>
    </div>
  );
};

export default CampaignDetails;
