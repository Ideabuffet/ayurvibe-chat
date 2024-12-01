const ParticlesBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="leaf-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`leaf leaf-${i + 1}`} />
        ))}
      </div>
      <style jsx global>{`
        .leaf-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }

        .leaf {
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #8B9D83, #4A5D4F);
          opacity: 0.1;
          border-radius: 0 100% 0 100%;
          animation: fall 20s linear infinite;
        }

        .leaf::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70%;
          height: 70%;
          background: inherit;
          border-radius: inherit;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        @keyframes fall {
          0% {
            transform: translate(100%, -100%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translate(-100%, 100%) rotate(360deg);
            opacity: 0;
          }
        }

        ${[...Array(15)].map((_, i) => `
          .leaf-${i + 1} {
            left: ${Math.random() * 100}%;
            animation-delay: -${Math.random() * 20}s;
            animation-duration: ${15 + Math.random() * 10}s;
            transform: scale(${0.5 + Math.random()});
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default ParticlesBackground;