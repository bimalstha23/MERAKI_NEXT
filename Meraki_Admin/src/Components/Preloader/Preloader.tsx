import React from 'react';
import styles from './pyramid.module.css'; // Import the CSS module
const Preloader = () => {

    return (
        <div className={styles['pyramid-container']}>
            <div className={styles.glow}></div>
            <div>
                <span style={{ '--i': '0' } as React.CSSProperties}></span>
                <span style={{ '--i': '1' } as React.CSSProperties}></span>
                <span style={{ '--i': '2' } as React.CSSProperties}></span>
                <span style={{ '--i': '3' } as React.CSSProperties}></span>
            </div>
        </div>
    );
};

export default Preloader;
