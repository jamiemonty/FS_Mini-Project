import classes from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.footerSection}>
          <h3>🏔️ Trekking Adventures</h3>
          <p>Your gateway to mountain exploration</p>
        </div>
        <div className={classes.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href='/trails'>Mountain Trails</Link></li>
            <li><Link href='/maps'>Trail Maps</Link></li>
            <li><Link href='/camping'>Camping Sites</Link></li>
            <li><Link href='/gear'>Gear Guide</Link></li>
          </ul>
        </div>
        <div className={classes.footerSection}>
          <h4>Contact</h4>
          <p>📧 info@trekkingadventures.com</p>
          <p>📞 +1 (555) 123-4567</p>
        </div>
      </div>
      <div className={classes.footerBottom}>
        <p>© 2024 Trekking Microservice Application. All rights reserved.</p>
      </div>
    </footer>
  );
}
