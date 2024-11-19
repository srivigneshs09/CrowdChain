// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        string status; // New field: "pending", "approved", "rejected"
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.status = "pending"; // Default status

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function approveCampaign(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(keccak256(bytes(campaign.status)) == keccak256(bytes("pending")), "Campaign is not pending.");
        campaign.status = "approved";
    }

    function rejectCampaign(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(keccak256(bytes(campaign.status)) == keccak256(bytes("pending")), "Campaign is not pending.");
        campaign.status = "rejected";
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];

        require(
            keccak256(bytes(campaign.status)) == keccak256(bytes("approved")),
            "Only approved campaigns can accept donations."
        );
        require(campaign.amountCollected < campaign.target, "Target amount already reached.");
        require(campaign.amountCollected + msg.value <= campaign.target, "Donation exceeds remaining target.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        (bool sent, ) = payable(campaign.owner).call{value: msg.value}("");
        if (sent) {
            campaign.amountCollected += msg.value;
        }
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
