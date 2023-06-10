import { DefaultLayout } from '@/components/layouts/components/DefaultLayout';
import { About } from '@/content/about/About/About';

About.getLayout = (page: JSX.Element) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default About;
