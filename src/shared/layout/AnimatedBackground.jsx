import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white pointer-events-none select-none">
      <ul className="absolute inset-0 overflow-hidden opacity-30 m-0 p-0 list-none">
        <li className="absolute inset-0 -left-1/2 -right-1/2 opacity-50 bg-[linear-gradient(-20deg,#C2282A_50%,transparent_50%)] animate-bg-anim-1"></li>
        <li className="absolute inset-0 -left-1/2 -right-1/2 opacity-50 bg-[linear-gradient(-20deg,#E25B5D_50%,transparent_50%)] animate-bg-anim-2"></li>
        <li className="absolute inset-0 -left-1/2 -right-1/2 opacity-50 bg-[linear-gradient(-20deg,#F4A261_50%,transparent_50%)] animate-bg-anim-3"></li>
      </ul>
    </div>
  );
};

export default AnimatedBackground;
