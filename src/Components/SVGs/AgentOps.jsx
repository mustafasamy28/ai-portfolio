import AgentOps from '../../assets/AgentOps.png';

const CIcon = () => {
  return (
    <div className="relative top-0  w-8  p-0 ">
      <div className={`absolute -top-0 transition-opacity duration-300 `}>
        <img src={AgentOps} alt="CrewAI Default" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default CIcon;