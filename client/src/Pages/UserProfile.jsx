import React from "react";
import styles from "../Styles/ProfileList.module.css";

const UserProfile = props => {

    return <div className={styles.userProfileContainer}>
        <div className={styles.userProfilePic}>pic</div>
        <div className={styles.userProfileName}>{props.item.userName}</div>
        <div className={styles.userProfileExistance}>existance</div>                
        <div className={styles.userProfileClockHour}>hour</div>
        <div className={styles.userProfileChange}>change</div>
    </div>;
}

export default UserProfile;