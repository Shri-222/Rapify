
export const StatCard = ({ title, subtitle, icon }) => (
    <div className="flex items-start gap-4 bg-[#0f1916] border border-zinc-800/60 rounded-2xl p-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#062014] ring-1 ring-green-700/30">
        {icon}
      </div>
      <div>
        <div className="text-sm text-zinc-300">{title}</div>
        <div className="text-green-300 font-medium">{subtitle}</div>
      </div>
    </div>
  );

export default StatCard;