import Skeleton from "react-loading-skeleton";

export function ReportSkeleton() {
  return (
    <div className=" flex flex-col px-24 w-full items-center scroll-auto">
      <div className="w-full px-2 m-2">
        <Skeleton className="p-2 rounded-lg w-full" height={60} />
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex-1 mx-2">
          <Skeleton height={50} className="w-full" />
          <Skeleton containerClassName="w-full h-full" height={400} />
        </div>
        <div className="flex-1 mx-2">
          <Skeleton height={50} className="w-full" />
          <Skeleton containerClassName="w-full h-full" height={400} />
        </div>

        <div className="flex-1 mx-2">
          <Skeleton height={50} className="w-full" />
          <Skeleton containerClassName="w-full h-full" height={400} />
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="w-full m-2">
          <Skeleton height={50} className="w-full" />
          <Skeleton containerClassName="w-full h-full" height={600} />
        </div>

        <div className="w-full m-2">
          <Skeleton height={50} className="w-full" />
          <Skeleton containerClassName="w-full h-full" height={600} />
        </div>
      </div>
    </div>
  );
}
