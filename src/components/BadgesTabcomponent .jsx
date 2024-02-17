// import { useState } from "react";
// import  BadgeComponent from "./BadgeComponent";
// import ModalComponent from "./ModalComponent";


// const BadgesTabcomponent = ({ badges }) => { 
//     const [isModalVisible, setIsModalVisible] = useState(true); 
//     const handleBadgeClick = () => {
//         setIsModalVisible(true);
//     };

//     const handleModalClose = () => {
//         setIsModalVisible(false);
//     };

//     return (
//         <div className="badgesContainer">
//             {badges && badges.map((badge) => (
//                 <BadgeComponent
//                     key={badge.badgeId} 
//                     image={badge.imageUrl} 
//                     name={badge.name} 
//                     onClick={() => handleBadgeClick(badge)} 
//                 />
//             ))}
          
// {isModalVisible && <ModalComponent setModalVisible={setIsModalVisible} 
// badge={badges[badges.length - 1]}
//  modalVisible={isModalVisible}/>}
        
//         </div>
//     );
// };

// export default BadgesTabcomponent ; 




import { useState } from "react";
import BadgeComponent from "./BadgeComponent";
import ModalComponent from "./ModalComponent";

const BadgesTabcomponent = ({ badges }) => { 
    const [isModalVisible, setIsModalVisible] = useState(false); // Initialize modal visibility to false

    const handleBadgeClick = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="badgesContainer">
            {badges && badges.map((badge) => (
                <BadgeComponent
                    key={badge.badgeId} 
                    image={badge.imageUrl} 
                    name={badge.name} 
                    onClick={() => handleBadgeClick(badge)} 
                />
            ))}
          
            {isModalVisible && 
                <ModalComponent 
                    setModalVisible={setIsModalVisible} 
                    badge={badges[badges.length - 1]}
                    modalVisible={isModalVisible}
                    onClose={handleModalClose} // Pass the handleModalClose function to the ModalComponent
                />
            }
        </div>
    );
};

export default BadgesTabcomponent;


