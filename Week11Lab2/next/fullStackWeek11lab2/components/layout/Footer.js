import classes from './Footer.module.css';

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
            <li>Mountain Trails</li>
            <li>Trail Maps</li>
            <li>Camping Sites</li>
            <li>Gear Guide</li>
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
