import React from "react";
import styles from '../../Styles/Profile.module.css'

function Profile(props){
    return <div className={styles.profileContainer}>
        <div className={styles.profileTitle}>Profile</div>
            <div className={styles.profileListContainer}>
                <div className={styles.profilePicture}>picture test</div>
                <div className={styles.profileClock}>clock in or out buttons</div>
                <div className={styles.profileChat}>chat</div>
                <div className={styles.profileAccepted}>Accepted Tasks</div>
                    <div className={styles.profileList}>
                        {props.infoAccepted.map((item)=>{
                            return <div className={styles.profileListItem}>
                                <div className={styles.profileItemId}>{item.id}</div>
                                <div className={styles.profileItemSubject}>{item.subject}</div>
                                <div className={styles.profileItemWhen}>{item.when}</div>
                            </div>;
                        })}
                </div>
            </div>
        </div>
}
export default Profile;