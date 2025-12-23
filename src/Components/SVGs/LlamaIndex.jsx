import LlamaIndex from '../../assets/LlamaIndex.png';

// eslint-disable-next-line react/prop-types
const CIcon = () => {
  return (
    <div className="relative top-0 w-8 p-0">
      <div className={`absolute -top-3.5 transition-opacity duration-300 `}>
        <img src={LlamaIndex} alt="CrewAI Default" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default CIcon;
