import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { NavbarAdmin, DisplayCampaigns } from '../components';

const AdminPortal = () => {
  const { getPendingCampaigns, contract } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchPendingCampaigns = async () => {
      if (contract) {
        setIsLoading(true);
        const data = await getPendingCampaigns();
        setCampaigns(data);
        setIsLoading(false);
      }
    };

    fetchPendingCampaigns();
  }, [contract]);

  return (
    <div>
      <NavbarAdmin />
      <DisplayCampaigns
        title="Pending Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default AdminPortal;
