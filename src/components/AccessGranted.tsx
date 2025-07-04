import React, { useEffect, useState } from 'react';
const AccessGranted: React.FC = () => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setTimeout(() => setOpen(true), 300);
    }, []);
    return (
        <div className="access-granted-bg">
            <div className={`door-animation ${open ? 'open' : ''}`}>
                <div className="door left-door" />
                <div className="door right-door" />
            </div>
            <h1 className="access-text">Merci d'entrer</h1>
            <style>{`
        .access-granted-bg {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #5e2fc0 100%, #f6f4ff 0%);
        }
        .door-animation {
          position: relative;
          width: 320px;
          height: 320px;
          margin-bottom: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .door {
          position: absolute;
          width: 140px;
          height: 320px;
          background: #ff5500;
          border-radius: 12px 0 0 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          transition: transform 1.2s cubic-bezier(.77,0,.18,1);
        }
        .right-door {
          left: 160px;
          border-radius: 0 12px 12px 0;
        }
        .left-door {
          left: 20px;
        }
        .door-animation.open .left-door {
          transform: translateX(-180px) rotateY(40deg);
        }
        .door-animation.open .right-door {
          transform: translateX(180px) rotateY(-40deg);
        }
        .access-text {
          font-size: 2.5rem;
          color: #ff5500;
          font-weight: bold;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(255,85,0,0.08);
        }
      `}</style>
        </div>
    );
};
export default AccessGranted;