/* Created By: Pranav Mahindru*/
/* Updated by Joel Kuruvilla for Assignment 3 | 2023-07-25 */
import React, {useState, useEffect} from 'react'
import './profileSettings.css';
import { userProfileSettingsRead, userProfileSettingsUpdate } from '../../api.js';
import Switch from 'react-switch';

function ProfileSettings() {
    const userData = JSON.parse(localStorage.getItem("user_info"));
    const userID = userData._id;

    const [email2FAEnabled, setEmail2FAEnabled] = useState(false);
    const [phone2FAEnabled, setPhone2FAEnabled] = useState(false);
    const [authenticationApp2FAEnabled, setAuthenticationApp2FAEnabled] = useState(false);
    const [currentLocationEnabled, setCurrentLocationEnabled] = useState(false);
    const [disableAccountEnabled, setDisableAccountEnabled] = useState(false);

    useEffect(() => {
        const readProfileConfigurations = async () => {
            try {
                const profileSettingsReading  = await userProfileSettingsRead(userID);
                
                setEmail2FAEnabled(profileSettingsReading.email_auth);
                setPhone2FAEnabled(profileSettingsReading.phone_auth);
                setAuthenticationApp2FAEnabled(profileSettingsReading.auth_app);
                setCurrentLocationEnabled(profileSettingsReading.set_location);
                setDisableAccountEnabled(profileSettingsReading.disable_account);
            } 
            catch (error) {
                return error;
            }
        };
        readProfileConfigurations();
    }, [userID]);

    const handleEmailToggleSwitch = (e) => { 
        setEmail2FAEnabled(e);
    }
    const handlePhoneToggleSwitch = (e) => {  
        setPhone2FAEnabled(e); 
    }
    const handleAuthenticationAppToggleSwitch = (e) => {  
        setAuthenticationApp2FAEnabled(e);
    }
    const handleCurrentLocationToggleSwitch = (e) => { 
        setCurrentLocationEnabled(e);
    }
    const handleDisableAccountToggleSwitch = (e) => { 
        setDisableAccountEnabled(e);
    }

    const updateProfileConfigurations = async () => {
        const settingsStatus = ({"email_auth": email2FAEnabled, "phone_auth":phone2FAEnabled,
         "auth_app": authenticationApp2FAEnabled, "set_location": currentLocationEnabled, 
         "disable_account": disableAccountEnabled });
        await userProfileSettingsUpdate(userID, settingsStatus);
        alert("Settings applied successfully");
        window.location.reload();
    }

    return (
        <div className='profileSettings'>
            <div className='save-profile-settings-button'>
                <h2> Profile Settings </h2>
                <button type='button' onClick={updateProfileConfigurations}> Save Notifications </button>
            </div>
            <div className='profileSettings-general'>
                <h3> General </h3>
                <form className='profileSettings-general-form'>
                    <li> Full Name: <input placeholder={userData.firstName + " " + userData.lastName} disabled/> </li>
                    <li> Email: <input placeholder={userData.email} disabled/> </li>
                    <li> Address: <input placeholder={userData.location || "No address inputted"} disabled/> </li>
                    <li> Phone Number: <input placeholder={userData.phone || "No Phone Number inputted"} disabled/> </li>
                    <li> Online Status:  
                        <select> 
                            <option disabled> active </option>
                       </select>
                    </li>
                        <button id="updateButtons" onClick={() => alert("General Settings have been updated.")}> UPDATE </button>
                </form>
            </div>
            <div className='profileSettings-setPassword'>
                <h3> Set Password </h3>
                <form className='profileSettings-setPassword-form'>
                    <li> New Password <input/> </li>
                    <li> Confirm Password: <input/> </li>
                    <button id="updateButtons" onClick={() => alert("Your Password has been updated.")}> UPDATE </button>
                </form>
            </div>
            <div className='profileSettings-twoFactorAuthentication'>
                <h3> Two Factor Authentication </h3>
                <form className='profileSettings-twoFactorAuthentication-form'>
                    <li> Email: <Switch className="profileSettings-toggle" onChange={handleEmailToggleSwitch}
                     checked={email2FAEnabled} borderRadius={12} /></li>
                    <li> Phone: <Switch className="profileSettings-toggle" onChange={handlePhoneToggleSwitch}
                     checked={phone2FAEnabled} borderRadius={12} /> </li>
                    <li> Authentication App: <Switch className="profileSettings-toggle" onChange={handleAuthenticationAppToggleSwitch}
                     checked={authenticationApp2FAEnabled} borderRadius={12} /> </li>
                </form>
            </div>
            <div className='profileSettings-setLocation'>
                <h3> Set Current Loation </h3>
                <form className='profileSettings-setLocation-form'>
                    <li> Location: <Switch className="profileSettings-toggle" onChange={handleCurrentLocationToggleSwitch}
                     checked={currentLocationEnabled} borderRadius={2} /> </li>
                </form>
            </div>
            <div className='profileSettings-danger'>
                <h3> Danger </h3>
                <form className='profileSettings-danger-form'>
                    <li> Disable Account <Switch className="profileSettings-toggle" onChange={handleDisableAccountToggleSwitch}
                     checked={disableAccountEnabled} borderRadius={2} onColor='ff0000'/> </li>
                </form>
            </div>
            <div className='profileSettings-delete'>
                <form className='profileSettings-delete-form'>
                    <button><b> DELETE ACCOUNT </b></button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;
