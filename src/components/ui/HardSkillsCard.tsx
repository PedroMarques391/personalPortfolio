import React, { ReactNode } from 'react';

interface IHardSkillsCard {
    technology: string
    icon: ReactNode
}

const HardSkillsCard = ({ icon, technology }: IHardSkillsCard): React.JSX.Element => {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-dark rounded-full shadow-md hover:bg-gray-700 transition">
            <div >{icon}</div>
            <span className="text-sm font-medium">{technology}</span>
        </div>
    );
};

export default HardSkillsCard;