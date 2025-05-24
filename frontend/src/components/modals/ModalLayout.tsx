export default function RestaurantModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white w-[340px] max-w-md ml-6 mb-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
      <div className="bg-[#FFAFCC] h-16 w-full rounded-t-xl"></div>
      <div className="flex flex-col gap-4 p-6">{children}</div>
    </div>
  );
}
