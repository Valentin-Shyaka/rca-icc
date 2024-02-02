import Table from '@/components/constants/Table';
import { useApp } from '@/contexts/AppProvider';
import GamingLayout from '@/layouts/GamingLayout';
const FootTableIndex = () => {
  const { teams } = useApp();
  return (
    <GamingLayout title="Football - Table" isGeneral>
      <div className="p-3 gap-y-3">
        <h3 className=" text-center">Fantasy Standings</h3>
        <div className="float-left font-bold text-lg px-3">
          <h3>Standings</h3>
        </div>
        <Table teams={teams?.football!} />
      </div>
    </GamingLayout>
  );
};

export default FootTableIndex;
