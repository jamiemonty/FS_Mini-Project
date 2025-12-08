import Link from 'next/link';
import classes from '../styles/Home.module.css';

function HomePage() {

    return (
        <div className={classes.hero}>
            <div className={classes.heroContent}>
                <h1 className={classes.heroTitle}>
                    <span className={classes.icon} style={{filter: 'grayscale(100%) brightness(1.2)'}}>🏔️</span>
                    Welcome to Trekking Adventures
                </h1>
                <p className={classes.heroText}>
                    Discover breathtaking mountain trails and plan your next adventure
                </p>
                
                <div className={classes.features}>
                    <Link href='/trails'>
                        <a className={classes.featureCard}>
                            <div className={classes.featureIcon}>🏔️</div>
                            <h3>Mountain Trails</h3>
                            <p>Explore stunning peaks and valleys</p>
                        </a>
                    </Link>
                    <Link href='/maps'>
                        <a className={classes.featureCard}>
                            <div className={classes.featureIcon}>🗺️</div>
                            <h3>Trail Maps</h3>
                            <p>Detailed routes and difficulty levels</p>
                        </a>
                    </Link>
                    <Link href='/camping'>
                        <a className={classes.featureCard}>
                            <div className={classes.featureIcon}>⛺</div>
                            <h3>Camping Sites</h3>
                            <p>Find perfect spots to rest</p>
                        </a>
                    </Link>
                    <Link href='/gear'>
                        <a className={classes.featureCard}>
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
                    <Link href='/trek-microservice'><a className={classes.btnPrimary}>🔍 Explore Mountains</a></Link>
                    <Link href='/login'><a className={classes.btnLogin}>🔐 Login</a></Link>
                    <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className={classes.btnLogout}>🚪 Logout</button>
                </div>
            </div>
        </div>
    );
}
export default HomePage;