import BlogCard from "@/content/dashboard/BlogCard";
import DailyActivity from "@/content/dashboard/DailyActivity";
import ProductPerfomance from "@/content/dashboard/ProductPerfomance";
import { FullLayout } from "@/components/layouts";

function DashboardIndex() {
    return (
        <div className="p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div><DailyActivity /></div>
                <div className="col-span-2"><ProductPerfomance /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                    <BlogCard />
                </div>
            </div>
        </div>
    );
}

DashboardIndex.getLayout = (page) => (
    // <Authenticated>
    <FullLayout>{page}</FullLayout>
    // </Authenticated>
);

export default DashboardIndex;
