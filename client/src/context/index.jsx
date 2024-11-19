import React, { useContext, createContext, useEffect } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite, useNetwork, useNetworkMismatch, useSwitchChain } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading: contractLoading } = useContract('0x9b1466A8a0994443574f6b35eE2804d5c51Ee641'); 
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
        targetAsString,
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
      pId: i,
      status: campaign.status
    }));

    return parsedCampaings;
  };

  const getPendingCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    console.log("All Campaigns: ", allCampaigns); 
    const pendingCampaigns = allCampaigns.filter((campaign) => {
      console.log("Campaign Status: ", campaign.status); 
      return campaign.status === "pending";
    });
  
    console.log("Pending Campaigns: ", pendingCampaigns); 
    return pendingCampaigns;
  };
  
  
  
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    return filteredCampaigns;
  };

  // Updated donate function to respect the new contract behavior
  const donate = async (pId, amount) => {
    try {
      const amountInWei = ethers.utils.parseEther(amount.toString());
      const data = await contract.call('donateToCampaign', [pId], {
        value: amountInWei,
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

  const approveCampaign = async (pId) => {
    try {
      // Approve on smart contract
      await contract.call('approveCampaign', [pId]);

      // Update Firestore status
      const q = query(collection(db, "campaigns"), where("pId", "==", pId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const campaignDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "campaigns", campaignDoc.id), { status: "approved" });
      } else {
        console.error("No Firestore document found with pId:", pId);
      }
    } catch (error) {
      console.error("Error approving campaign:", error);
      throw error;
    }
  };

  // Reject a campaign
  const rejectCampaign = async (pId) => {
    try {
      // Reject on smart contract
      await contract.call('rejectCampaign', [pId]);

      // Update Firestore status
      const q = query(collection(db, "campaigns"), where("pId", "==", pId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const campaignDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "campaigns", campaignDoc.id), { status: "rejected" });
      } else {
        console.error("No Firestore document found with pId:", pId);
      }
    } catch (error) {
      console.error("Error rejecting campaign:", error);
      throw error;
    }
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
        getDonations,
        getPendingCampaigns,
        approveCampaign,
        rejectCampaign
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
