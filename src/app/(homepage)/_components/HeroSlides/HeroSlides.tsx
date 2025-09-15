const HeroSlides = ({
  currentIndex,
  index,
  img,
  children,
}: {
  currentIndex: number;
  index: number;
  img: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        currentIndex === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
      }`}
    >
      {/* Zoom Effect */}
      <div
        className={`absolute inset-0 h-full w-full ${
          currentIndex === index ? 'animate-zoom' : 'animate-zoom-paused'
        }`}
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="absolute inset-0 text-white">{children}</div>
    </div>
  );
};

export default HeroSlides;
