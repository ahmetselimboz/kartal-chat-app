"use client"

import { MdMeetingRoom } from "react-icons/md"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { FaUsers } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { activeMenu } from "@/app/redux/menuSlice";


interface FriendCategoryProps {

    classNameProp?: string

}



const FriendCategory = ({classNameProp}:FriendCategoryProps) => {

    const selectedMenu = useAppSelector(state => state.menu.activeMenu)

    const dispatch = useAppDispatch();

    const iconMap = {
        AiOutlineUsergroupAdd,
        FaUsers,
        MdMeetingRoom,
    }

    const userExistCategories = [
        {
            menuTitle: "Arkadaşlar",
            iconName: "AiOutlineUsergroupAdd",
            placeholder: "Kullanıcı Adı",
            btnTitle: "Ekle"
        },
        {
            menuTitle: "Gruplar",
            iconName: "FaUsers",
            placeholder: "Grup Adı",
            btnTitle: "Katıl"
        },
        {
            menuTitle: "Odalar",
            iconName: "MdMeetingRoom",
            placeholder: "Oda Adı",
            btnTitle: "Katıl"
        },
    ]
    


    return (
        <div className={`flex flex-row items-center justify-center lg:h-full  gap-3 py-3 ${classNameProp}`}>
            {userExistCategories.map((ct, i) => {
        
                const key = i; // Use the index as key for simplicity
                const menuTitle = ct.menuTitle;
                const IconComponent = iconMap[ct.iconName as keyof typeof iconMap];
                return (
                    <div
                        key={key}
                        onClick={() => { dispatch(activeMenu(ct))}}
                        className={`border-2 lg:w-3/12 w-4/12 h-full rounded-md ${selectedMenu.menuTitle === menuTitle ? "border-lightOrange text-lightOrange" : "border-user-menu text-user-menu"
                            } lg:px-0 lg:py-0 px-1 py-3 flex flex-col items-center transition-all justify-center cursor-pointer hover:border-lightOrange hover:text-lightOrange`}
                    >
                        <IconComponent className="text-xl" />
                        <div className="text-sm">{menuTitle}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default FriendCategory