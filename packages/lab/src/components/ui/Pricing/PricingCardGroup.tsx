import { PricingCard } from './PricingCard';

export const PricingCardGroup = (props) => {
    return (
        <div className="relative z-10 mx-auto -mt-8 w-full px-4 sm:px-6 lg:px-8 ">
            <div className="mx-auto max-w-md grid lg:max-w-6xl lg:grid-cols-3 gap-24 lg:gap-5">
                <div>
                    <PricingCard></PricingCard>
                </div>
                <div className="bg-brand-1100 dark:bg-brand-900 border px-0.5 -mt-8 rounded-[6px]">
                    <p className="text-xs text-center py-2 text-white">Most Popular</p>
                    <PricingCard></PricingCard>
                </div>
                <div>
                    <PricingCard></PricingCard>
                </div>
            </div>
        </div>
    );
}
