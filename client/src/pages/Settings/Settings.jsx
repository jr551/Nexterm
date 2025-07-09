import "./styles.sass";
import Icon from "@mdi/react";
import { mdiAccountCircleOutline, mdiAccountGroup, mdiClockStarFourPointsOutline, mdiShieldAccountOutline, mdiDomain, mdiCreationOutline, mdiKeyVariant, mdiConsole } from "@mdi/js";
import SettingsNavigation from "./components/SettingsNavigation";
import { Navigate, useLocation } from "react-router-dom";
import Account from "@/pages/Settings/pages/Account";
import Sessions from "@/pages/Settings/pages/Sessions";
import Users from "@/pages/Settings/pages/Users";
import Authentication from "@/pages/Settings/pages/Authentication";
import Organizations from "@/pages/Settings/pages/Organizations";
import AI from "@/pages/Settings/pages/AI";
import Identities from "@/pages/Settings/pages/Identities";
import Terminal from "@/pages/Settings/pages/Terminal";

export const Settings = () => {
    const location = useLocation();

    const userPages = [
        { title: "Account", icon: mdiAccountCircleOutline, content: <Account /> },
        { title: "Terminal", icon: mdiConsole, content: <Terminal /> },
        { title: "Identities", icon: mdiKeyVariant, content: <Identities /> },
        { title: "Sessions", icon: mdiClockStarFourPointsOutline, content: <Sessions /> },
        { title: "Organizations", icon: mdiDomain, content: <Organizations /> }
    ];

    const adminPages = [
        { title: "Users", icon: mdiAccountGroup, content: <Users /> },
        { title: "Authentication", icon: mdiShieldAccountOutline, content: <Authentication /> },
        { title: "AI", icon: mdiCreationOutline, content: <AI /> }
    ];

    const currentPage = [...userPages, ...adminPages].find(page => location.pathname.endsWith(page.title.toLowerCase()));

    if (!currentPage) return <Navigate to="/settings/account" />;
    
    return (
        <div className="settings-page">
            <SettingsNavigation userPages={userPages} adminPages={adminPages} />
            <div className="settings-content">
                <div className="settings-header">
                    <Icon path={currentPage.icon} />
                    <h1>{currentPage.title}</h1>
                </div>
                <hr/>

                <div className="settings-content-inner">
                    {currentPage.content}
                </div>
            </div>
        </div>
    )
}