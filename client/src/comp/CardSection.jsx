import React from 'react';

const CardSection = () => {
    const cards = [
        {
            id: 1,
            label: 'Back to school',
            image: 'https://www.gofundme.com/c/wp-content/uploads/2024/06/students1-aspect-ratio-796-505.png',
            title: 'Fundraising for students',
            link: '#',
            linkText: 'Donate now',
        },
        {
            id: 2,
            label: 'Urgent cause',
            image: 'https://images.gofundme.com/_SyTr61AELbCgOcX8aAqTD3L43E=/720x405/https://d2g8igdw686xgo.cloudfront.net/75841787_1696793881804445_r.png',
            title: 'Fundraising FAQs: Israel/Gaza',
            link: '#',   
            linkText: 'Donate now',
        },
        {
            id: 3,
            label: 'Urgent cause',
            image: 'https://pbs.twimg.com/media/GVTGzsHXsAAhZeJ.jpg:large',
            title: 'How to Help: Hurricane Debby Relief',
            link: '#',
            linkText: 'Donate now',
        },
    ];

    return (
        <div className="flex flex-col md:flex-row items-start justify-between md:px-16 px-4 py-12 gap-6">
            {cards.map((card) => (
                <div key={card.id} className="bg-white rounded-lg shadow-md w-full md:w-1/3">
                    <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-2 py-1 rounded-full m-2 inline-block">
                        {card.label}
                    </span>
                    {/* Increased the height of the images */}
                    <img src={card.image} alt={card.title} className="w-full h-60 object-cover" />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                        <a href={card.link} className="mt-4 inline-block text-blue-600 font-bold hover:underline">
                            {card.linkText}
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardSection;
