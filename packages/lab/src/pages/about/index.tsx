import { DefaultLayout } from '@/components/layouts/components/DefaultLayout';
import { About } from './_components/About/About';

About.getLayout = (page: JSX.Element) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default About;
