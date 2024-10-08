import React from 'react';

const FundraisingInfoSection = () => {
    return (
        <div className="flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-8  bg-gray-900 ">
            <div className="max-w-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Fundraising on CrowdChain is easy, powerful, and trusted.
                </h2>
                <p className="text-white leading-relaxed mb-6">
                    Get what you need to help your fundraiser succeed on CrowdChain, whether you’re raising money for yourself, friends, family, or charity. With no fee to start, CrowdChain is the world’s leading <a href="#" className="text-blue-800 underline">crowdfunding platform</a>—from <a href="#" className="text-blue-800 underline">memorial tributes</a> and funerals to <a href="#" className="text-blue-800 underline">medical emergencies</a> and <a href="#" className="text-blue-800 underline">nonprofits</a>. Whenever you need help, you can ask here.
                </p>
                <p className="text-white">
                    Still have <a href="#" className="text-blue-800 underline">questions</a>? Learn more about <a href="#" className="text-blue-800 underline">how CrowdChain works</a>.
                </p>
            </div>
        </div>
    );
};

export default FundraisingInfoSection;
