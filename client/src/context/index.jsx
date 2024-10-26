import React, { useContext, createContext, useEffect } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite, useNetwork, useNetworkMismatch, useSwitchChain } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading: contractLoading } = useContract('0x6835f52eb41fE2128A8167892B38eD8ea186FC72'); 
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  
  const address = useAddress();
  const connect = useMetamask();
  const mismatch = useNetworkMismatch();
  const switchChain = useSwitchChain();
  const { chainId } = useNetwork();

  useEffect(() => {
    if (mismatch) {
      switchChain(11155111); // Sepolia testnet chainId
    }
  }, [mismatch, switchChain]);

  console.log("Address: ", address);
  console.log("Contract: ", contract);
  console.log("Chain ID from Network Hook: ", chainId);
  console.log("Network Mismatch: ", mismatch);

  // Adjusted publishCampaign to match the smart contract changes
  const publishCampaign = async (form) => {
    try {
      const targetAsString = String(form.target); // convert the target to a string if needed
      const data = await createCampaign({
      args: [
        address, 
        form.title, 
        form.description, 
        ethers.utils.parseEther(targetAsString),  // parseEther expects a string value
        new Date(form.deadline).getTime(), 
        form.image,
      ],
    });

      console.log("Campaign creation success", data);
    } catch (error) {
      console.log("Campaign creation failure", error);
    }
  };

  // Updated to match the new contract logic
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');
    
    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      isFunded: campaign.isFunded, // New field
      pId: i
    }));

    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    return filteredCampaigns;
  };

  // Updated donate function to respect the new contract behavior
  const donate = async (pId, amount) => {
    try {
      const data = await contract.call('donateToCampaign', [pId], {
        value: ethers.utils.parseEther(amount),
      });
      console.log("Donation success", data);
    } catch (error) {
      console.log("Donation failure", error);
    }
  };

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
