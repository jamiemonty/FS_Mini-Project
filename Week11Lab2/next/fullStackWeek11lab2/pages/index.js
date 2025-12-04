import Link from 'next/link';
import classes from '../styles/Home.module.css';
import { useState } from 'react';

function HomePage() {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        { icon: '🏔️', title: 'Mountain Trails', desc: 'Explore stunning peaks and valleys' },
        { icon: '🗺️', title: 'Trail Maps', desc: 'Detailed routes and difficulty levels' },
        { icon: '⛺', title: 'Camping Sites', desc: 'Find perfect spots to rest' },
        { icon: '🥾', title: 'Gear Guide', desc: 'Essential equipment recommendations' }
    ];

    return (
        <div className={classes.hero}>
            <div className={classes.heroContent}>
                <h1 className={classes.heroTitle}>
                    <span className={classes.icon}>🏔️</span>
                    Welcome to Trekking Adventures
                </h1>
                <p className={classes.heroText}>
                    Discover breathtaking mountain trails and plan your next adventure
                </p>
                
                <div className={classes.features}>
                    <Link href='/trails'>
                        <a className={`${classes.featureCard} ${activeFeature === 0 ? classes.active : ''}`}
                           onMouseEnter={() => setActiveFeature(0)}>
                            <div className={classes.featureIcon}>🏔️</div>
                            <h3>Mountain Trails</h3>
                            <p>Explore stunning peaks and valleys</p>
                        </a>
                    </Link>
                    <Link href='/maps'>
                        <a className={`${classes.featureCard} ${activeFeature === 1 ? classes.active : ''}`}
                           onMouseEnter={() => setActiveFeature(1)}>
                            <div className={classes.featureIcon}>🗺️</div>
                            <h3>Trail Maps</h3>
                            <p>Detailed routes and difficulty levels</p>
                        </a>
                    </Link>
                    <Link href='/camping'>
                        <a className={`${classes.featureCard} ${activeFeature === 2 ? classes.active : ''}`}
                           onMouseEnter={() => setActiveFeature(2)}>
                            <div className={classes.featureIcon}>⛺</div>
                            <h3>Camping Sites</h3>
                            <p>Find perfect spots to rest</p>
                        </a>
                    </Link>
                    <Link href='/gear'>
                        <a className={`${classes.featureCard} ${activeFeature === 3 ? classes.active : ''}`}
                           onMouseEnter={() => setActiveFeature(3)}>
                            <div className={classes.featureIcon}>🥾</div>
                            <h3>Gear Guide</h3>
                            <p>Essential equipment recommendations</p>
                        </a>
                    </Link>
                </div>

                <div className={classes.stats}>
                    <div className={classes.statItem}>
                        <div className={classes.statNumber}>500+</div>
                        <div className={classes.statLabel}>Mountain Trails</div>
                    </div>
                    <div className={classes.statItem}>
                        <div className={classes.statNumber}>1000+</div>
                        <div className={classes.statLabel}>Happy Trekkers</div>
                    </div>
                    <div className={classes.statItem}>
                        <div className={classes.statNumber}>50+</div>
                        <div className={classes.statLabel}>Countries</div>
                    </div>
                </div>

                <div className={classes.heroButtons}>
                    <Link href='/trek-microservice'>
                        <a className={classes.btnPrimary}>🔍 Explore Mountains</a>
                    </Link>
                    <Link href='/login'>
                        <a className={classes.btnSecondary}>🔐 Login</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default HomePage;