import { DefaultLayout } from '@/components/layouts';
import type { NextPageWithLayout } from '@/types/app';
import { useRouter } from 'next/router';

interface Props {
}

const TasksPage: NextPageWithLayout<Props> = (props) => {
    const router = useRouter();

    router.replace('/freelancer/tasks/1');

    return null;
};

TasksPage.getLayout = (page: JSX.Element) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default TasksPage;
