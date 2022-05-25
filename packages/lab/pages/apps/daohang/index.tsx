import AccentHeaderLayout from '@/components/layouts/AccentHeaderLayout';
import Daohang from '@/content/Applications/Daohang/index';

function DaohangPage() {
    return (
        <div>
            <Daohang />
        </div>
    )
}

DaohangPage.getLayout = function getLayout(page) {
    return <AccentHeaderLayout>{page}</AccentHeaderLayout>;
}

export default DaohangPage;
