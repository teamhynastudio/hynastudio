import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './InternalPageCurve.css';

const InternalPageCurve = () => {
  const curveRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(curveRef.current,
        { y: '-100vh', x: '-50%' },
        { y: '32vh', x: '-50%', duration: 1.4, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="internal-page-curve-wrapper">
      <div className="internal-page-curve" ref={curveRef}></div>
    </div>
  );
};

export default InternalPageCurve;
