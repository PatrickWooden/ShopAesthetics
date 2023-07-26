/* Created By: Pranav Mahindru*/
/* Updated by Joel Kuruvilla for Assignment 3 | 2023-07-25 */
import React, {useState, useEffect} from 'react';
import './notificationSettings.css';
import Switch from 'react-switch';
import { userNotificationSettingsRead, userNotificationSettingsUpdate } from '../../api.js';

function NotificationSettings() {
    const userData = JSON.parse(localStorage.getItem("user_info"));
    const userID = userData._id;

    const [allNotifcationsEnabled, setAllNotifcationsEnabled] = useState(false);
    const [inboxNotifcationsEnabled, setInboxNotifcationsEnabled] = useState(false);
    const [orderMessagsNotifcationsEnabled, setOrderMessagsNotifcationsEnabled] = useState(false);
    const [orderUpdatesNotifcationsEnabled, setOrderUpdatesNotifcationsEnabled] = useState(false);
    const [ratingReviewsNotifcationsEnabled, setRatingReviewsNotifcationsEnabled] = useState(false);
    const [notificationSoundsEnabled, setNotificationSoundsEnabled] = useState(false);
    const [emailNotifcationsEnabled, setEmailNotifcationsEnabled] = useState(false);
    const [phoneNotifcationsEnabled, setPhoneNotifcationsEnabled] = useState(false);

    useEffect(() => {
        const readNotificationsConfigurations = async () => {
            try {
                const notificationSettingsReading  = await userNotificationSettingsRead(userID);
                
                /* Special Case: When All Notification Settings option is activate, all settings activated */
                if (notificationSettingsReading.notify_all === true) {
                    setAllNotifcationsEnabled(true);
                    setInboxNotifcationsEnabled(true);
                    setOrderMessagsNotifcationsEnabled(true);
                    setOrderUpdatesNotifcationsEnabled(true);
                    setRatingReviewsNotifcationsEnabled(true);
                    setNotificationSoundsEnabled(true);
                    setEmailNotifcationsEnabled(true);
                    setPhoneNotifcationsEnabled(true);
                    return;
                }

                setAllNotifcationsEnabled(false);
                setInboxNotifcationsEnabled(notificationSettingsReading.notify_inbox_messages);
                setOrderMessagsNotifcationsEnabled(notificationSettingsReading.notify_order_messages);
                setOrderUpdatesNotifcationsEnabled(notificationSettingsReading.notify_order_updates);
                setRatingReviewsNotifcationsEnabled(notificationSettingsReading.notify_ratings_reviews);
                setNotificationSoundsEnabled(notificationSettingsReading.notify_sounds);
                setEmailNotifcationsEnabled(notificationSettingsReading.notify_email);
                setPhoneNotifcationsEnabled(notificationSettingsReading.notify_phone);
            } 
            catch (error) {
                return error;
            }
        };
        readNotificationsConfigurations();
    }, [userID]);

    const handleToggleAllSwitch = (e) => {
        setAllNotifcationsEnabled(e);
        setInboxNotifcationsEnabled(e);
        setOrderMessagsNotifcationsEnabled(e);
        setOrderUpdatesNotifcationsEnabled(e);
        setRatingReviewsNotifcationsEnabled(e);
        setNotificationSoundsEnabled(e);
        setEmailNotifcationsEnabled(e);
        setPhoneNotifcationsEnabled(e);
    }

    const handleToggleInboxSwitch = (e) => {
        setInboxNotifcationsEnabled(e);
    }
    const handleToggleOrderMessagesSwitch = (e) => {
        setOrderMessagsNotifcationsEnabled(e);
    }

    const handleOrderUpdatesToggleSwitch = (e) => {
        setOrderUpdatesNotifcationsEnabled(e);
    }
    const handleRatingReviewsToggleSwitch = (e) => {
        setRatingReviewsNotifcationsEnabled(e);
    }
    const handleNotificationSoundsToggleSwitch = (e) => {
        setNotificationSoundsEnabled(e);
    }

    const handleEmailNotificationToggleSwitch = (e) => {
        setEmailNotifcationsEnabled(e);
    }

    const handlPhoneNotificationToggleSwitch = (e) => {
        setPhoneNotifcationsEnabled(e);
    }

    const saveNotificationChanges = async (e) => {
        const settingStatus = {"notify_all": allNotifcationsEnabled, "notify_inbox_messages": inboxNotifcationsEnabled, 
        "notify_order_messages": orderMessagsNotifcationsEnabled, "notify_order_updates": orderUpdatesNotifcationsEnabled,
        "notify_ratings_reviews": ratingReviewsNotifcationsEnabled, "notify_sounds": notificationSoundsEnabled, 
        "notify_email": emailNotifcationsEnabled, "notify_phone": phoneNotifcationsEnabled};

        await userNotificationSettingsUpdate(userID, settingStatus);

        alert("Settings applied successfully");
        window.location.reload();
    }

    return (
        <div className='notificationSettings'>
            <h2> Notification Settings </h2>
            <form className='notificationSettings-form'>
                <li> All Notifications: <Switch className="notificationSettings-toggle" id="notification-toggle-all"
                 onChange={handleToggleAllSwitch} checked={allNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Inbox Messages: <Switch className="notificationSettings-toggle" onChange={handleToggleInboxSwitch}
                 checked={inboxNotifcationsEnabled} borderRadius={12}/>  </li>
                <hr/>
                <li> Order Mesages: <Switch className="notificationSettings-toggle" onChange={handleToggleOrderMessagesSwitch}
                 checked={orderMessagsNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Order Updates <Switch className="notificationSettings-toggle" onChange={handleOrderUpdatesToggleSwitch}
                 checked={orderUpdatesNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Rating/Review Notifications: <Switch className="notificationSettings-toggle" onChange={handleRatingReviewsToggleSwitch}
                 checked={ratingReviewsNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Notification Sounds: <Switch className="notificationSettings-toggle" onChange={handleNotificationSoundsToggleSwitch}
                 checked={notificationSoundsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Email Notification: <Switch className="notificationSettings-toggle" onChange={handleEmailNotificationToggleSwitch}
                 checked={emailNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Phone Notification: <Switch className="notificationSettings-toggle" onChange={handlPhoneNotificationToggleSwitch}
                 checked={phoneNotifcationsEnabled} borderRadius={12} /> </li>
             </form>
             <div className='postAd-button'>
                    <button type='button' onClick={saveNotificationChanges}> Save Notifications </button>
                </div>
        </div>
    );
};

export default NotificationSettings;
