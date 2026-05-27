import React, { useState, useMemo } from 'react'
import { Layout } from '@/components/common'
import { Checkbox } from '@/components/ui/checkbox'
import {
    AiOutlineDown,
    AiOutlineFilter,
    AiOutlineAppstore,
} from 'react-icons/ai'
import {
    RadioGroup,
    RadioGroupItem,
} from '@tongdelove/ui/components/radio-group'
import { ProductCard } from '@/containers/product'
import { Seo } from '@/components/common/Seo'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { db, products, eq, desc } from '@tongdelove/db/sqlite'

interface Product {
    id: string
    name: string
    slug: string
    title: string | null
    subTitle: string
    price: number
    image: string
    categoryId: string
    material: string
    sustainability: string
    minimumOrderQuantity: number
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'newest'
type MOQOption = '0' | '500' | '1000' | '10000'

export const getServerSideProps: GetServerSideProps<{
    products: Product[]
}> = async () => {
    try {
        const allProducts = await db
            .select()
            .from(products)
            .where(eq(products.isDeleted, false))
            .orderBy(desc(products.sort))

        return {
            props: {
                products: allProducts.map((p) => ({
                    id: p.id,
                    name: p.name,
                    slug: p.slug,
                    title: p.title,
                    subTitle: p.subTitle,
                    price: p.price,
                    image: p.image,
                    categoryId: p.categoryId,
                    material: p.material || '',
                    sustainability: p.sustainability || '',
                    minimumOrderQuantity: p.minimumOrderQuantity || 1,
                })),
            },
        }
    } catch (error) {
        console.error('Failed to fetch products:', error)
        return {
            props: {
                products: [],
            },
        }
    }
}

const ProductPage = ({
    products: initialProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [minimumQuantity, setMinimumQuantity] = useState<MOQOption>('0')
    const [category, setCategory] = useState<string>('0')
    const [sortBy, setSortBy] = useState<SortOption>('default')
    const [selectedMaterials, setSelectedMaterials] = useState<Set<string>>(
        new Set()
    )
    const [selectedSustainability, setSelectedSustainability] = useState<
        Set<string>
    >(new Set())
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const sortOptions: { name: string; value: SortOption }[] = [
        { name: '默认排序', value: 'default' },
        { name: '价格：低到高', value: 'price-asc' },
        { name: '价格：高到低', value: 'price-desc' },
        { name: '最新上架', value: 'newest' },
    ]

    const moqOptions: { label: string; value: MOQOption }[] = [
        { label: '任意数量', value: '0' },
        { label: '500单位或更少', value: '500' },
        { label: '1,000单位或更少', value: '1000' },
        { label: '10,000单位或更少', value: '10000' },
    ]

    const materialsOptions = [
        { label: 'Bleached White Liner', value: 'bleached-white-liner' },
        { label: 'Chipboard', value: 'chipboard' },
        { label: 'Corrugated Board', value: 'corrugated-board' },
        { label: 'Kemi White Liner', value: 'kemi-white-liner' },
        { label: 'Mottled White Liner', value: 'mottled-white-liner' },
        { label: 'Natural Kraft Liner', value: 'natural-kraft-liner' },
        { label: 'Paperboard', value: 'paperboard' },
        { label: 'Clay-Coated News Back', value: 'clay-coated-news-back' },
        { label: 'Solid Bleachied Sulphate', value: 'solid-bleachied-sulphate' },
        { label: 'Solid Unbleached Sulphate', value: 'solid-unbleached-sulphate' },
        { label: 'Uncoated Unbleached Kraf', value: 'uncoated-unbleached-kraf' },
        { label: 'Films', value: 'films' },
        { label: 'PET Film', value: 'pet-film' },
        { label: 'PP Film', value: 'pp-film' },
        { label: 'PVC Film', value: 'pvc-film' },
    ]

    const sustainabilityOptions = [
        { label: '可降解 (Biodegradable)', value: 'biodegradable' },
        { label: '路边回收 (Curbside recyclable)', value: 'curbside-recyclable' },
        { label: '可堆肥 (Drop-off compostable)', value: 'drop-off-compostable' },
        { label: '可回收 (Drop-off recyclable)', value: 'drop-off-recyclable' },
        { label: '家庭堆肥 (Home compostable)', value: 'home-compostable' },
        { label: '本地生产 (Local production)', value: 'local-production' },
        { label: '无塑料 (Plastic-free)', value: 'plastic-free' },
        { label: '回收内容 (Recycled content)', value: 'recycled-content' },
        { label: '可再生材料 (Renewable materials)', value: 'renewable-materials' },
        {
            label: '负责任林业 (Responsible forestry)',
            value: 'responsible-forestry',
        },
        { label: '可退回 (Returnable)', value: 'returnable' },
        { label: '可重复使用 (Reusable)', value: 'reusable' },
        { label: '可持续油墨 (Sustainable inks)', value: 'sustainable-inks' },
    ]

    const categoryOptions = [
        { label: '全部', value: '0' },
        { label: '纸箱 (Boxes)', value: 'carton' },
        { label: '折叠纸盒 (Folding Carton)', value: 'folding-carton' },
        { label: '瓦楞纸箱 (Corrugated Box)', value: 'corrugatedbox' },
        { label: '手提袋 (Retail Bags)', value: 'bags' },
        { label: '配件 (Accessories)', value: 'accessories' },
        { label: '标准产品 (Standard)', value: 'standard' },
        { label: '吸塑卡 (Blister Cards)', value: 'blister-cards' },
    ]

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...initialProducts]

        if (category !== '0') {
            result = result.filter((p) => p.categoryId === category)
        }

        if (minimumQuantity !== '0') {
            const moq = parseInt(minimumQuantity)
            result = result.filter((p) => p.minimumOrderQuantity <= moq)
        }

        if (selectedMaterials.size > 0) {
            result = result.filter((p) => {
                const productMaterials = p.material
                    .split(',')
                    .map((m) => m.trim())
                    .filter(Boolean)
                return productMaterials.some((m) => selectedMaterials.has(m))
            })
        }

        if (selectedSustainability.size > 0) {
            result = result.filter((p) => {
                const productSustainability = p.sustainability
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                return productSustainability.some((s) => selectedSustainability.has(s))
            })
        }

        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                result.sort((a, b) => b.price - a.price)
                break
            case 'newest':
                result.sort((a, b) => a.id.localeCompare(b.id))
                break
            default:
                break
        }

        return result
    }, [
        initialProducts,
        category,
        minimumQuantity,
        sortBy,
        selectedMaterials,
        selectedSustainability,
    ])

    const handleSortChange = (value: SortOption) => {
        setSortBy(value)
    }

    const handleMaterialChange = (value: string, checked: boolean) => {
        setSelectedMaterials((prev) => {
            const next = new Set(prev)
            if (checked) {
                next.add(value)
            } else {
                next.delete(value)
            }
            return next
        })
    }

    const handleSustainabilityChange = (value: string, checked: boolean) => {
        setSelectedSustainability((prev) => {
            const next = new Set(prev)
            if (checked) {
                next.add(value)
            } else {
                next.delete(value)
            }
            return next
        })
    }

    const currentSortName =
        sortOptions.find((o) => o.value === sortBy)?.name || '排序'

    const hasActiveFilters =
        category !== '0' ||
        minimumQuantity !== '0' ||
        selectedMaterials.size > 0 ||
        selectedSustainability.size > 0

    const clearAllFilters = () => {
        setCategory('0')
        setMinimumQuantity('0')
        setSelectedMaterials(new Set())
        setSelectedSustainability(new Set())
    }

    return (
        <>
            <Seo
                title="产品中心"
                description="半祥包装提供各类高品质包装产品，包括纸箱、彩盒、手提袋、标签等。支持定制化服务，满足不同行业的包装需求。"
                url="/products"
                type="website"
            />
            <Drawer open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <div className="flex items-center justify-between">
                            <DrawerTitle>筛选条件</DrawerTitle>
                            {hasActiveFilters && (
                                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                    清除全部
                                </Button>
                            )}
                        </div>
                    </DrawerHeader>
                    <div className="p-4">
                        <Accordion
                            type="multiple"
                            defaultValue={['1', '2', '3']}
                            className="w-full"
                        >
                            <AccordionItem value="1">
                                <AccordionTrigger>分类</AccordionTrigger>
                                <AccordionContent>
                                    <RadioGroup
                                        value={category}
                                        onValueChange={setCategory}
                                        className="space-y-2"
                                    >
                                        {categoryOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={option.value}
                                                    id={`m-cat-${option.value}`}
                                                />
                                                <label
                                                    htmlFor={`m-cat-${option.value}`}
                                                    className="cursor-pointer text-sm"
                                                >
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="2">
                                <AccordionTrigger>最小起订量</AccordionTrigger>
                                <AccordionContent>
                                    <RadioGroup
                                        value={minimumQuantity}
                                        onValueChange={(value) =>
                                            setMinimumQuantity(value as MOQOption)
                                        }
                                        className="space-y-2"
                                    >
                                        {moqOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={option.value}
                                                    id={`m-moq-${option.value}`}
                                                />
                                                <label
                                                    htmlFor={`m-moq-${option.value}`}
                                                    className="cursor-pointer text-sm"
                                                >
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="3">
                                <AccordionTrigger>排序</AccordionTrigger>
                                <AccordionContent>
                                    <RadioGroup
                                        value={sortBy}
                                        onValueChange={(value) =>
                                            handleSortChange(value as SortOption)
                                        }
                                        className="space-y-2"
                                    >
                                        {sortOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={option.value}
                                                    id={`m-sort-${option.value}`}
                                                />
                                                <label
                                                    htmlFor={`m-sort-${option.value}`}
                                                    className="cursor-pointer text-sm"
                                                >
                                                    {option.name}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </DrawerContent>
            </Drawer>

            <div className="flex min-h-screen flex-col lg:flex-row">
                <div className="hidden w-64 flex-shrink-0 lg:block xl:w-72">
                    <div className="sticky top-20 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                筛选条件
                            </h3>
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAllFilters}
                                    className="h-8 px-2 text-xs"
                                >
                                    清除全部
                                </Button>
                            )}
                        </div>
                        <Accordion
                            type="multiple"
                            defaultValue={['1', '2', '3', '4', '5']}
                            className="w-full"
                        >
                            <AccordionItem value="1">
                                <AccordionTrigger className="text-sm font-medium">
                                    分类
                                </AccordionTrigger>
                                <AccordionContent>
                                    <RadioGroup
                                        value={category}
                                        onValueChange={setCategory}
                                        className="space-y-2"
                                    >
                                        {categoryOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={option.value}
                                                    id={`cat-${option.value}`}
                                                />
                                                <label
                                                    htmlFor={`cat-${option.value}`}
                                                    className="cursor-pointer text-sm text-gray-700"
                                                >
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="2">
                                <AccordionTrigger className="text-sm font-medium">
                                    最小起订量
                                </AccordionTrigger>
                                <AccordionContent>
                                    <RadioGroup
                                        value={minimumQuantity}
                                        onValueChange={(value) =>
                                            setMinimumQuantity(value as MOQOption)
                                        }
                                        className="space-y-2"
                                    >
                                        {moqOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={option.value}
                                                    id={`moq-${option.value}`}
                                                />
                                                <label
                                                    htmlFor={`moq-${option.value}`}
                                                    className="cursor-pointer text-sm text-gray-700"
                                                >
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="3">
                                <AccordionTrigger className="text-sm font-medium">
                                    排序方式
                                </AccordionTrigger>
                                <AccordionContent>
                                    <RadioGroup
                                        value={sortBy}
                                        onValueChange={(value) =>
                                            handleSortChange(value as SortOption)
                                        }
                                        className="space-y-2"
                                    >
                                        {sortOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={option.value}
                                                    id={`sort-${option.value}`}
                                                />
                                                <label
                                                    htmlFor={`sort-${option.value}`}
                                                    className="cursor-pointer text-sm text-gray-700"
                                                >
                                                    {option.name}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="4">
                                <AccordionTrigger className="text-sm font-medium">
                                    材质
                                </AccordionTrigger>
                                <AccordionContent>
                                    <fieldset className="space-y-2">
                                        <div className="space-y-2">
                                            {materialsOptions.map((item) => (
                                                <label
                                                    key={item.value}
                                                    className="flex cursor-pointer items-center gap-2"
                                                >
                                                    <Checkbox
                                                        id={`material-${item.value}`}
                                                        checked={selectedMaterials.has(item.value)}
                                                        onCheckedChange={(checked) =>
                                                            handleMaterialChange(item.value, checked as boolean)
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`material-${item.value}`}
                                                        className="cursor-pointer text-sm text-gray-600"
                                                    >
                                                        {item.label}
                                                    </label>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="5">
                                <AccordionTrigger className="text-sm font-medium">
                                    环保标准
                                </AccordionTrigger>
                                <AccordionContent>
                                    <fieldset className="space-y-2">
                                        <div className="space-y-2">
                                            {sustainabilityOptions.map((item) => (
                                                <label
                                                    key={item.value}
                                                    className="flex cursor-pointer items-center gap-2"
                                                >
                                                    <Checkbox
                                                        id={`sustain-${item.value}`}
                                                        checked={selectedSustainability.has(item.value)}
                                                        onCheckedChange={(checked) =>
                                                            handleSustainabilityChange(item.value, checked as boolean)
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`sustain-${item.value}`}
                                                        className="cursor-pointer text-sm text-gray-600"
                                                    >
                                                        {item.label}
                                                    </label>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="flex-1 px-4 lg:px-6 xl:px-8">
                    <div className="flex flex-col items-start justify-between border-b border-gray-200 py-4 sm:flex-row sm:items-center">
                        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                            <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                                包装产品分类
                            </h1>
                            <span className="text-sm text-gray-500">
                                共 {filteredAndSortedProducts.length} 件商品
                            </span>
                            {hasActiveFilters && (
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                    已筛选
                                </span>
                            )}
                        </div>
                        <div className="mt-3 flex items-center gap-2 sm:mt-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-1"
                                    >
                                        <span>{currentSortName}</span>
                                        <AiOutlineDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {sortOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option.value}
                                            onClick={() => handleSortChange(option.value)}
                                            className={sortBy === option.value ? 'bg-gray-100' : ''}
                                        >
                                            {option.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <button
                                type="button"
                                className="hidden p-2 text-gray-400 hover:text-gray-500 sm:block"
                            >
                                <span className="sr-only">View grid</span>
                                <AiOutlineAppstore className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <AiOutlineFilter className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div className="py-6">
                        {filteredAndSortedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
                                {filteredAndSortedProducts.map((product) => (
                                    <div key={product.id} className="flex">
                                        <ProductCard
                                            product={{
                                                id: product.id,
                                                name: product.name,
                                                slug: product.slug,
                                                title: product.title,
                                                subTitle: product.subTitle,
                                                price: product.price,
                                                image: product.image,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-16 text-center">
                                <div className="mb-4 text-6xl text-gray-400">📦</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-700">
                                    暂无匹配的产品
                                </h3>
                                <p className="mb-4 text-gray-500">请尝试调整筛选条件</p>
                                {hasActiveFilters && (
                                    <Button variant="default" onClick={clearAllFilters}>
                                        清除筛选条件
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-8">
                        <h2 className="mb-6 text-xl font-semibold text-gray-900">
                            行业解决方案
                        </h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="rounded-lg bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100">
                                <div className="mb-2 text-3xl">🍔</div>
                                <div className="text-sm font-medium">食品餐饮</div>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100">
                                <div className="mb-2 text-3xl">💄</div>
                                <div className="text-sm font-medium">美妆日化</div>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100">
                                <div className="mb-2 text-3xl">👔</div>
                                <div className="text-sm font-medium">服装鞋帽</div>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100">
                                <div className="mb-2 text-3xl">📱</div>
                                <div className="text-sm font-medium">电子数码</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ProductPage.Layout = Layout

export default ProductPage
