-- CreateTable
CREATE TABLE `product` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `slug` VARCHAR(100) NOT NULL,
    `title` VARCHAR(100) NULL DEFAULT '',
    `sub_title` VARCHAR(100) NOT NULL DEFAULT '',
    `description` VARCHAR(255) NULL DEFAULT '',
    `code` VARCHAR(63) NOT NULL,
    `flag` INTEGER NOT NULL,
    `brand_id` INTEGER NOT NULL DEFAULT 0,
    `category_id` INTEGER NOT NULL DEFAULT 0,
    `custom_id` INTEGER NOT NULL,
    `summary` VARCHAR(255) NOT NULL DEFAULT '',
    `content` TEXT NOT NULL,
    `is_on_sale` TINYINT NOT NULL DEFAULT 1,
    `sort_order` SMALLINT NOT NULL DEFAULT 100,
    `image` VARCHAR(255) NOT NULL,
    `pic_url` VARCHAR(255) NOT NULL DEFAULT '',
    `share_url` VARCHAR(255) NOT NULL DEFAULT '',
    `is_new` TINYINT NOT NULL DEFAULT 0,
    `is_hot` TINYINT NOT NULL DEFAULT 0,
    `unit` VARCHAR(31) NOT NULL DEFAULT '件',
    `counter_price` DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,
    `retail_price` DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,
    `price` DECIMAL(10, 4) NOT NULL,
    `sku` VARCHAR(100) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `published_at` TIMESTAMP(6) NOT NULL,
    `biz_type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_history` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_snapshot` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_category` (
    `id` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(63) NOT NULL,
    `keywords` VARCHAR(1023) NOT NULL DEFAULT '',
    `description` VARCHAR(255) NOT NULL DEFAULT '',
    `pid` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `icons` VARCHAR(255) NOT NULL DEFAULT '',
    `picture` VARCHAR(255) NOT NULL DEFAULT '',
    `level` VARCHAR(255) NOT NULL DEFAULT '',
    `sort_order` INTEGER NOT NULL DEFAULT 50,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collect` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `user_id` INTEGER NOT NULL DEFAULT 0,
    `value_id` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_image` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_attr_key` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_attr_value` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `attr_key_id` INTEGER NOT NULL DEFAULT 0,
    `product_id` INTEGER NOT NULL DEFAULT 0,
    `symbol` INTEGER NOT NULL,
    `value` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_sku` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `attr_symbol_path` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pay_info` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL DEFAULT 0,
    `pay_id` VARCHAR(63) NOT NULL,
    `pay_status` INTEGER NOT NULL DEFAULT 0,
    `pay_at` TIMESTAMP(6) NOT NULL,
    `pay_platform` INTEGER NOT NULL DEFAULT 0,
    `pay_type` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `user_id` INTEGER NOT NULL DEFAULT 0,
    `order_sn` VARCHAR(63) NOT NULL,
    `order_status` INTEGER NOT NULL DEFAULT 0,
    `aftersale_status` SMALLINT NOT NULL DEFAULT 0,
    `address_id` INTEGER NOT NULL DEFAULT 0,
    `message` VARCHAR(512) NOT NULL DEFAULT '',
    `product_price` DECIMAL(10, 4) NOT NULL,
    `freight_price` DECIMAL(10, 4) NOT NULL,
    `coupon_price` DECIMAL(10, 4) NOT NULL,
    `integral_price` DECIMAL(10, 4) NOT NULL,
    `groupon_price` DECIMAL(10, 4) NOT NULL,
    `order_price` DECIMAL(10, 4) NOT NULL,
    `actual_price` DECIMAL(10, 4) NOT NULL,
    `payment_at` TIMESTAMP(6) NOT NULL,
    `send_at` TIMESTAMP(6) NOT NULL,
    `ship_sn` VARCHAR(63) NOT NULL,
    `ship_channel` VARCHAR(63) NOT NULL,
    `ship_at` TIMESTAMP(6) NOT NULL,
    `refund_amount` DECIMAL(10, 4) NOT NULL,
    `refund_type` VARCHAR(63) NOT NULL,
    `refund_content` VARCHAR(255) NOT NULL,
    `refund_at` TIMESTAMP(6) NOT NULL,
    `confirm_at` TIMESTAMP(6) NOT NULL,
    `comments` SMALLINT NOT NULL DEFAULT 0,
    `end_at` TIMESTAMP(6) NOT NULL,
    `closed_at` TIMESTAMP(6) NOT NULL,
    `customerId` VARCHAR(191) NULL,
    `discount` DOUBLE NULL,
    `totalPrice` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `addressId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_detail` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `pay_id` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productSkuId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(255) NOT NULL,
    `productPic` VARCHAR(255) NOT NULL,
    `unitPrice` DECIMAL(10, 4) NOT NULL,
    `quantity` INTEGER NULL DEFAULT 0,
    `totalPrice` DECIMAL(10, 4) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taobao_order_raw` (
    `id` VARCHAR(63) NOT NULL,
    `buyerName` VARCHAR(63) NOT NULL DEFAULT '',
    `buyerNick` VARCHAR(63) NOT NULL DEFAULT '',
    `payId` VARCHAR(63) NOT NULL DEFAULT '',
    `payDetail` VARCHAR(255) NOT NULL DEFAULT '',
    `tradePayable` DECIMAL(10, 2) NOT NULL,
    `postage` DECIMAL(10, 2) NOT NULL,
    `integration` INTEGER NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `rebateIntegration` INTEGER NOT NULL,
    `realTotal` DECIMAL(10, 2) NOT NULL,
    `realIntegration` INTEGER NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT '',
    `message` VARCHAR(255) NOT NULL DEFAULT '',
    `receiver` VARCHAR(255) NOT NULL DEFAULT '',
    `address` VARCHAR(255) NOT NULL DEFAULT '',
    `deliveryMode` VARCHAR(255) NOT NULL DEFAULT '',
    `telephone` VARCHAR(255) NOT NULL DEFAULT '',
    `cellphone` VARCHAR(255) NOT NULL DEFAULT '',
    `virtualNumberExpirationAt` DATETIME(3) NOT NULL,
    `orderCreatedAt` DATETIME(3) NOT NULL,
    `payAt` DATETIME(3) NOT NULL,
    `goodsTitle` VARCHAR(255) NOT NULL DEFAULT '',
    `goodsType` INTEGER NOT NULL,
    `deliveryOrder` VARCHAR(255) NOT NULL DEFAULT '',
    `deliveryCompany` VARCHAR(255) NOT NULL DEFAULT '',
    `orderNote` VARCHAR(255) NOT NULL DEFAULT '',
    `goodsCount` INTEGER NOT NULL DEFAULT 0,
    `shopId` VARCHAR(255) NOT NULL DEFAULT '',
    `shopName` VARCHAR(255) NOT NULL DEFAULT '',
    `closedReason` VARCHAR(255) NOT NULL DEFAULT '',
    `sellerSerivce` INTEGER NOT NULL DEFAULT 0,
    `buyerService` INTEGER NOT NULL DEFAULT 0,
    `invoiceTitle` VARCHAR(255) NOT NULL DEFAULT '',
    `isCellphoneOrder` VARCHAR(255) NOT NULL DEFAULT '',
    `stagingOrderInfo` VARCHAR(255) NOT NULL DEFAULT '',
    `privilegeDownPaymentOderId` INTEGER NOT NULL DEFAULT 0,
    `isUploadContractPicture` INTEGER NOT NULL DEFAULT 0,
    `isUploadInvoicePicture` INTEGER NOT NULL DEFAULT 0,
    `isPayForAnother` INTEGER NOT NULL DEFAULT 0,
    `downPaymentRank` INTEGER NOT NULL DEFAULT 0,
    `modifiedSku` VARCHAR(191) NOT NULL DEFAULT '',
    `modifiedAddress` VARCHAR(191) NOT NULL DEFAULT '',
    `exceptionMessage` VARCHAR(191) NOT NULL DEFAULT '',
    `tmallCouponDeduction` INTEGER NOT NULL DEFAULT 0,
    `integrationDeduction` INTEGER NOT NULL DEFAULT 0,
    `isO2OOrder` INTEGER NOT NULL DEFAULT 0,
    `newRetailTradeType` VARCHAR(255) NOT NULL DEFAULT '',
    `newRetailGuideShopName` VARCHAR(255) NOT NULL DEFAULT '',
    `newRetailGuideShopId` VARCHAR(255) NOT NULL DEFAULT '',
    `newRetailDeliverShopName` VARCHAR(255) NOT NULL DEFAULT '',
    `newRetailDeliverShopId` VARCHAR(255) NOT NULL DEFAULT '',
    `refundAmount` DECIMAL(10, 2) NOT NULL,
    `appointmentShop` VARCHAR(255) NOT NULL DEFAULT '',
    `confirmReceiptAt` DATETIME(3) NOT NULL,
    `remitNum` DECIMAL(10, 2) NOT NULL,
    `personalRedEnvelope` VARCHAR(255) NOT NULL DEFAULT '',
    `isCreditBuy` INTEGER NOT NULL DEFAULT 0,
    `experienceEndAt` DATETIME(3) NOT NULL,
    `topNGift` VARCHAR(255) NOT NULL DEFAULT '',
    `deliveryType` VARCHAR(255) NOT NULL DEFAULT '',
    `liveCashbackStatus` VARCHAR(255) NOT NULL DEFAULT '',
    `cashbackAmount` INTEGER NOT NULL DEFAULT 0,
    `slowDeliveryCompensate` INTEGER NOT NULL DEFAULT 0,
    `newRetailDealShopName` VARCHAR(191) NOT NULL DEFAULT '',
    `newRetailDealShopId` VARCHAR(191) NOT NULL DEFAULT '',
    `newRetailDealDealerId` VARCHAR(191) NOT NULL DEFAULT '',
    `isPresell` INTEGER NOT NULL DEFAULT 0,
    `deliveryAt` DATETIME(3) NOT NULL,
    `comment` VARCHAR(255) NOT NULL DEFAULT '',
    `masterOrderId` VARCHAR(255) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brand` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `title` VARCHAR(255) NOT NULL DEFAULT '',
    `description` VARCHAR(255) NOT NULL DEFAULT '',
    `pictures` VARCHAR(255) NOT NULL DEFAULT '',
    `sort_order` INTEGER NOT NULL DEFAULT 50,
    `floor_price` DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `name` VARCHAR(63) NOT NULL DEFAULT '',
    `user_id` VARCHAR(191) NOT NULL,
    `conuntry` VARCHAR(63) NOT NULL,
    `province` VARCHAR(63) NOT NULL,
    `city` VARCHAR(63) NOT NULL,
    `county` VARCHAR(63) NOT NULL,
    `street` VARCHAR(63) NOT NULL,
    `detail` VARCHAR(127) NOT NULL,
    `address_1` VARCHAR(191) NULL,
    `address_2` VARCHAR(191) NULL,
    `area_code` VARCHAR(6) NOT NULL,
    `postcode` VARCHAR(6) NOT NULL,
    `zip` INTEGER NULL,
    `mobile` VARCHAR(20) NOT NULL,
    `is_default` TINYINT NOT NULL DEFAULT 0,
    `customer_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `product_sn` VARCHAR(63) NOT NULL,
    `product_name` VARCHAR(127) NOT NULL,
    `price` DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,
    `number` SMALLINT NOT NULL DEFAULT 0,
    `specifications` VARCHAR(1023) NOT NULL,
    `checked` TINYINT NOT NULL DEFAULT 1,
    `pictures` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aftersale` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `aftersal_sn` VARCHAR(63) NOT NULL DEFAULT '',
    `order_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `type` SMALLINT NOT NULL DEFAULT 0,
    `reason` VARCHAR(31) NOT NULL DEFAULT '',
    `amount` DECIMAL(10, 4) NOT NULL,
    `pictures` VARCHAR(255) NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 0,
    `handle_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ad` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `title` VARCHAR(63) NOT NULL DEFAULT '',
    `link` VARCHAR(255) NOT NULL DEFAULT '',
    `position` VARCHAR(100) NOT NULL DEFAULT '1',
    `content` VARCHAR(255) NOT NULL DEFAULT '',
    `start_at` TIMESTAMP(6) NOT NULL,
    `end_at` TIMESTAMP(6) NOT NULL,
    `enabled` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(63) NOT NULL DEFAULT '',

    UNIQUE INDEX `page_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` VARCHAR(191) NOT NULL,
    `post_author` INTEGER NOT NULL DEFAULT 0,
    `post_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `post_date_gmt` DATETIME(0) NOT NULL,
    `post_content` TEXT NULL,
    `post_title` TEXT NOT NULL,
    `post_excerpt` VARCHAR(255) NULL DEFAULT '',
    `post_status` VARCHAR(255) NOT NULL DEFAULT '',
    `comment_status` VARCHAR(255) NOT NULL DEFAULT '',
    `ping_status` VARCHAR(255) NOT NULL DEFAULT '',
    `post_password` VARCHAR(255) NOT NULL DEFAULT '',
    `post_name` VARCHAR(200) NOT NULL DEFAULT '',
    `to_ping` VARCHAR(255) NOT NULL DEFAULT '',
    `pinged` VARCHAR(255) NOT NULL DEFAULT '',
    `post_modified` DATETIME(0) NOT NULL,
    `post_modified_gmt` DATETIME(0) NOT NULL,
    `post_content_filtered` INTEGER NOT NULL,
    `post_parent` INTEGER NOT NULL,
    `guid` VARCHAR(255) NOT NULL DEFAULT '',
    `menu_order` INTEGER NOT NULL,
    `post_type` VARCHAR(255) NOT NULL DEFAULT '',
    `post_mime_type` VARCHAR(255) NOT NULL DEFAULT '',
    `comment_count` INTEGER NOT NULL,
    `view_count` INTEGER NOT NULL DEFAULT 0,
    `likes_count` INTEGER NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,
    `deleted_at` TIMESTAMP(6) NULL,

    UNIQUE INDEX `post_post_name_key`(`post_name`),
    INDEX `post_post_type_post_status_post_date_id_idx`(`post_type`, `post_status`, `post_date`, `id`),
    INDEX `post_post_parent_idx`(`post_parent`),
    INDEX `post_post_author_idx`(`post_author`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_author` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_category` (
    `id` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` VARCHAR(191) NOT NULL,
    `comment_post_id` VARCHAR(191) NOT NULL,
    `comment_author` VARCHAR(255) NOT NULL,
    `comment_author_email` VARCHAR(255) NOT NULL,
    `comment_author_url` VARCHAR(255) NOT NULL,
    `comment_author_ip` VARCHAR(255) NOT NULL,
    `comment_date` TIMESTAMP(6) NOT NULL,
    `comment_date_gmt` TIMESTAMP(6) NOT NULL,
    `comment_content` TEXT NOT NULL,
    `comment_karma` INTEGER NOT NULL,
    `comment_approved` INTEGER NOT NULL,
    `comment_agent` VARCHAR(255) NOT NULL,
    `comment_type` VARCHAR(255) NOT NULL,
    `comment_parent` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `value_id` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL DEFAULT 0,
    `replay` VARCHAR(511) NOT NULL DEFAULT '',
    `has_picture` INTEGER NOT NULL DEFAULT 0,
    `picUrls` VARCHAR(1023) NOT NULL DEFAULT '',
    `star` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `topic` (
    `id` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `use_count` INTEGER NOT NULL DEFAULT 0,
    `user_id` VARCHAR(191) NOT NULL DEFAULT '',
    `is_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `topic_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photo` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `access` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `module_name` VARCHAR(50) NULL,
    `type` TINYINT NULL,
    `action_name` VARCHAR(100) NULL,
    `api_name` VARCHAR(100) NULL,
    `icon` VARCHAR(100) NULL,
    `url` VARCHAR(100) NULL,
    `method` VARCHAR(10) NULL,
    `parent_id` VARCHAR(191) NOT NULL,
    `sort` INTEGER NOT NULL DEFAULT 1,
    `status` TINYINT NULL DEFAULT 1,
    `description` VARCHAR(100) NULL,

    UNIQUE INDEX `action_name_delete_at`(`action_name`, `deleted_at`),
    UNIQUE INDEX `module_name_delete_at`(`module_name`, `deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL DEFAULT '',
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(63) NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,

    UNIQUE INDEX `account_user_id_key`(`user_id`),
    UNIQUE INDEX `account_provider_account_id_key`(`provider_account_id`),
    UNIQUE INDEX `account_provider_provider_account_id_key`(`provider`, `provider_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_last_login` (
    `id` VARCHAR(191) NOT NULL,
    `account_id` VARCHAR(191) NOT NULL,
    `last_login_ip` VARCHAR(63) NULL DEFAULT '',
    `last_login_address` VARCHAR(100) NULL DEFAULT '',
    `last_login_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_role` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `account_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `account_role_deleted`(`account_id`, `role_id`, `deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `title` VARCHAR(255) NOT NULL DEFAULT '',
    `type` TINYINT NOT NULL DEFAULT 0,
    `description` VARCHAR(255) NOT NULL DEFAULT '',
    `slug` VARCHAR(255) NOT NULL,
    `keywords` VARCHAR(1023) NOT NULL DEFAULT '',
    `pid` INTEGER NOT NULL DEFAULT 0,
    `icon_url` VARCHAR(255) NOT NULL DEFAULT '',
    `pic_url` VARCHAR(255) NOT NULL DEFAULT '',
    `level` VARCHAR(255) NOT NULL DEFAULT 'L1',
    `sort_order` TINYINT NOT NULL DEFAULT 50,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL DEFAULT '',
    `en_name` VARCHAR(255) NOT NULL DEFAULT '',
    `former_name` VARCHAR(255) NOT NULL DEFAULT '',
    `type` INTEGER NOT NULL DEFAULT 0,
    `registry_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `registry_address` VARCHAR(255) NOT NULL DEFAULT '',
    `identifier` VARCHAR(255) NOT NULL DEFAULT '',
    `legal_entity` VARCHAR(255) NOT NULL DEFAULT '',
    `property` INTEGER NOT NULL DEFAULT 0,
    `chairman` INTEGER NOT NULL DEFAULT 0,
    `location` VARCHAR(255) NOT NULL DEFAULT '',
    `address` VARCHAR(255) NOT NULL DEFAULT '',
    `has_branch` TINYINT NOT NULL DEFAULT 0,
    `staff_size` INTEGER NOT NULL DEFAULT 1,
    `registered_capital` INTEGER NOT NULL DEFAULT 0,
    `website` VARCHAR(255) NOT NULL DEFAULT '',
    `email` VARCHAR(255) NOT NULL DEFAULT '',
    `classification_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `company_website_key`(`website`),
    UNIQUE INDEX `company_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `industrial_classification` (
    `id` VARCHAR(191) NOT NULL,
    `industry_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `parent_id` VARCHAR(191) NULL,
    `level_type` INTEGER NOT NULL,
    `pinyin` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organization` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(255) NOT NULL DEFAULT '',
    `node_id` VARCHAR(255) NOT NULL DEFAULT '',
    `url` VARCHAR(255) NOT NULL DEFAULT '',
    `repos_url` VARCHAR(255) NOT NULL DEFAULT '',
    `events_url` VARCHAR(255) NOT NULL DEFAULT '',
    `hooks_url` VARCHAR(255) NOT NULL DEFAULT '',
    `issues_url` VARCHAR(255) NOT NULL DEFAULT '',
    `members_url` VARCHAR(255) NOT NULL DEFAULT '',
    `public_members_url` VARCHAR(255) NOT NULL DEFAULT '',
    `avatar_url` VARCHAR(255) NOT NULL DEFAULT '',
    `description` VARCHAR(255) NOT NULL DEFAULT '',
    `name` VARCHAR(255) NOT NULL DEFAULT '',
    `company` VARCHAR(255) NOT NULL DEFAULT '',
    `blog` VARCHAR(255) NOT NULL DEFAULT '',
    `location` VARCHAR(255) NOT NULL DEFAULT '',
    `email` VARCHAR(255) NOT NULL DEFAULT '',
    `twitter_username` VARCHAR(255) NOT NULL DEFAULT '',
    `is_verified` TINYINT NOT NULL,
    `has_organization_projects` TINYINT NOT NULL,
    `has_repository_projects` TINYINT NOT NULL,
    `public_repos` INTEGER NOT NULL,
    `public_gists` INTEGER NOT NULL,
    `followers` INTEGER NOT NULL,
    `following` INTEGER NOT NULL,
    `html_url` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `organization_blog_key`(`blog`),
    UNIQUE INDEX `organization_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,
    `deleted_at` TIMESTAMP(6) NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(100) NULL,
    `status` TINYINT NULL DEFAULT 1,
    `is_default` TINYINT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_access` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `role_id` VARCHAR(191) NOT NULL,
    `access_id` VARCHAR(191) NOT NULL,
    `type` TINYINT NOT NULL,

    UNIQUE INDEX `role_access_type_deleted`(`role_id`, `access_id`, `type`, `deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `user_email` VARCHAR(50) NULL,
    `email_verified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `user_login` VARCHAR(60) NOT NULL,
    `user_pass` VARCHAR(100) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `user_nicename` VARCHAR(50) NOT NULL DEFAULT '',
    `user_url` VARCHAR(100) NOT NULL DEFAULT '',
    `user_registered` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_activation_key` VARCHAR(255) NOT NULL,
    `user_status` INTEGER NOT NULL DEFAULT 0,
    `display_ame` VARCHAR(250) NOT NULL DEFAULT '',
    `user_reset_key` VARCHAR(255) NULL,
    `user_phone` VARCHAR(11) NULL DEFAULT '',
    `spam` TINYINT NOT NULL DEFAULT 0,
    `first_name` VARCHAR(255) NULL DEFAULT '',
    `last_name` VARCHAR(255) NULL DEFAULT '',
    `age` INTEGER NULL,
    `platform` TINYINT NULL DEFAULT 0,
    `is_super` TINYINT NOT NULL DEFAULT 0,
    `avatar` VARCHAR(255) NOT NULL DEFAULT '',
    `roles` JSON NOT NULL,
    `deleted_at` TINYINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `users_user_email_key`(`user_email`),
    UNIQUE INDEX `users_user_login_key`(`user_login`),
    UNIQUE INDEX `users_user_pass_key`(`user_pass`),
    INDEX `users_user_login_user_phone_user_email_idx`(`user_login`, `user_phone`, `user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_to_resume` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `resumeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL DEFAULT '',
    `taobao` VARCHAR(255) NOT NULL DEFAULT '',
    `alipay` VARCHAR(255) NOT NULL DEFAULT '',
    `contact` VARCHAR(255) NOT NULL DEFAULT '',
    `phone` VARCHAR(255) NOT NULL DEFAULT '',
    `last_order` DATETIME(0) NULL,

    UNIQUE INDEX `client_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `session_token` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `session_session_token_key`(`session_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_token` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_token_token_key`(`token`),
    UNIQUE INDEX `verification_token_identifier_token_key`(`identifier`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `options` (
    `id` VARCHAR(191) NOT NULL,
    `option_name` VARCHAR(191) NOT NULL,
    `option_value` LONGTEXT NOT NULL,
    `user_login` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupon` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `title` VARCHAR(255) NOT NULL DEFAULT '',
    `description` VARCHAR(255) NOT NULL DEFAULT '',
    `code` VARCHAR(255) NOT NULL DEFAULT '',
    `discount` DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,
    `type` SMALLINT NOT NULL,
    `limit` SMALLINT NOT NULL DEFAULT 1,
    `min` DECIMAL(10, 4) NOT NULL,
    `condition` INTEGER NOT NULL,
    `goods_type` SMALLINT NOT NULL DEFAULT 0,
    `goods_value` VARCHAR(1023) NOT NULL DEFAULT '',
    `total` INTEGER NOT NULL DEFAULT 0,
    `used_count` INTEGER NOT NULL,
    `time_type` SMALLINT NOT NULL DEFAULT 0,
    `status` SMALLINT NOT NULL DEFAULT 0,
    `expiration` DATETIME(0) NOT NULL,
    `days` SMALLINT NOT NULL DEFAULT 0,
    `start_at` DATETIME(0) NOT NULL,
    `end_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupon_used` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `coupon_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `used_at` DATETIME(0) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 0,
    `start_at` DATETIME(0) NOT NULL,
    `end_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groupon` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `order_id` INTEGER NOT NULL,
    `groupon_id` INTEGER NOT NULL DEFAULT 0,
    `rules_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `share_url` VARCHAR(255) NOT NULL DEFAULT '',
    `creator_user_id` INTEGER NOT NULL,
    `creator_user_at` DATETIME NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groupon_rules` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `product_title` VARCHAR(127) NOT NULL,
    `pic_url` VARCHAR(255) NOT NULL,
    `discount` DECIMAL(63, 0) NOT NULL,
    `discount_member` INTEGER NOT NULL,
    `expire_at` DATETIME(0) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `user_id` INTEGER NOT NULL DEFAULT 0,
    `username` VARCHAR(63) NOT NULL DEFAULT '',
    `feed_type` VARCHAR(63) NOT NULL DEFAULT '',
    `mobile` VARCHAR(20) NOT NULL DEFAULT '',
    `content` VARCHAR(1023) NOT NULL DEFAULT '',
    `status` INTEGER NOT NULL DEFAULT 0,
    `has_picture` TINYINT NOT NULL DEFAULT 0,
    `pic_utls` VARCHAR(1023) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issue` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `title` VARCHAR(255) NOT NULL,
    `answer` VARCHAR(1023) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `footprint` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `user_id` INTEGER NOT NULL DEFAULT 0,
    `product_id` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_keyword` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `keyword` VARCHAR(255) NOT NULL DEFAULT '',
    `url` VARCHAR(255) NOT NULL DEFAULT '',
    `is_hot` INTEGER NOT NULL DEFAULT 0,
    `is_default` INTEGER NOT NULL DEFAULT 0,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `admin` VARCHAR(45) NOT NULL,
    `ip` VARCHAR(45) NOT NULL,
    `type` INTEGER NOT NULL,
    `action` VARCHAR(45) NOT NULL,
    `status` TINYINT NOT NULL,
    `result` VARCHAR(127) NOT NULL,
    `comment` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notice` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NULL,
    `title` VARCHAR(63) NOT NULL,
    `content` VARCHAR(511) NOT NULL,
    `admin_id` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notice_admin` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `deleted_at` TIMESTAMP(6) NOT NULL,
    `notice_id` INTEGER NOT NULL,
    `notice_title` VARCHAR(63) NOT NULL,
    `admin_id` INTEGER NOT NULL DEFAULT 0,
    `read_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `self_heating_bo` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `inner_code` VARCHAR(255) NOT NULL,
    `type` INTEGER NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `out_box_type` INTEGER NOT NULL,
    `inner_box_type` INTEGER NOT NULL,
    `material_type` INTEGER NOT NULL,
    `color` INTEGER NOT NULL,
    `out_box_capacity` INTEGER NOT NULL,
    `inner_box_capacity` INTEGER NOT NULL,
    `inner_box_capacity_line` INTEGER NOT NULL,
    `inner_box_capacity2` INTEGER NOT NULL,
    `inner_box_capacity3` INTEGER NOT NULL,
    `inner_box_capacity4` INTEGER NOT NULL,
    `out_box_size` INTEGER NOT NULL,
    `inner_box_size` INTEGER NOT NULL,
    `out_box_size_x` INTEGER NOT NULL,
    `inner_box_size_x` INTEGER NOT NULL,
    `out_box_size_y` INTEGER NOT NULL,
    `inner_box_size_y` INTEGER NOT NULL,
    `out_box_size_z` INTEGER NOT NULL,
    `inner_box_size_z` INTEGER NOT NULL,
    `lid_weights` INTEGER NOT NULL,
    `bottom_weight` INTEGER NOT NULL,
    `inner_weight` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,

    UNIQUE INDEX `self_heating_bo_inner_code_key`(`inner_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `heating_bag` (
    `id` VARCHAR(191) NOT NULL,
    `weight` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `company` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `links` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribes_webhook` (
    `id` VARCHAR(191) NOT NULL,
    `webhook` VARCHAR(255) NOT NULL,
    `secret` VARCHAR(255) NOT NULL,
    `webhook_type` VARCHAR(255) NOT NULL,
    `remind_source` ENUM('yuanjisong', 'oschina', 'codemart', 'a5', 'taskcity', 'shixian', 'mayigeek', 'rrkf') NOT NULL,
    `remind_type` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `subscribes_webhook_webhook_remind_source_key`(`webhook`, `remind_source`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribes_webhook_2_user` (
    `id` VARCHAR(191) NOT NULL,
    `webhook_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `freelancer_task` (
    `id` VARCHAR(191) NOT NULL,
    `source` ENUM('yuanjisong', 'oschina', 'codemart', 'a5', 'taskcity', 'shixian', 'mayigeek', 'rrkf') NOT NULL,
    `source_id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `desc` TEXT NOT NULL,
    `minPrice` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `maxPrice` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `fixed_price` VARCHAR(255) NOT NULL,
    `bargain` BOOLEAN NOT NULL DEFAULT false,
    `cycle` INTEGER NOT NULL DEFAULT 0,
    `cycle_name` VARCHAR(255) NOT NULL DEFAULT '天',
    `date` TIMESTAMP(6) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `apply_count` INTEGER NOT NULL DEFAULT 0,
    `visit_count` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(255) NOT NULL DEFAULT '',
    `audit_status` INTEGER NOT NULL DEFAULT 0,
    `audit_reason` VARCHAR(255) NOT NULL DEFAULT '',
    `audit_at` TIMESTAMP(6) NOT NULL,
    `handleStatus` INTEGER NOT NULL DEFAULT 0,
    `handle_at` TIMESTAMP(6) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(255) NOT NULL DEFAULT '',
    `user_url` VARCHAR(255) NOT NULL DEFAULT '',
    `type` INTEGER NOT NULL DEFAULT 0,
    `application` INTEGER NOT NULL DEFAULT 0,
    `tags` VARCHAR(255) NOT NULL DEFAULT '',
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `freelancer_task_source_title_key`(`source`, `title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `free_project` (
    `id` VARCHAR(191) NOT NULL,
    `webhook` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `price` VARCHAR(255) NOT NULL,
    `duration` INTEGER NOT NULL,
    `time` TIMESTAMP(6) NOT NULL,
    `origin` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `origin_id` VARCHAR(255) NULL,
    `status` VARCHAR(191) NULL,
    `apply_count` INTEGER NULL DEFAULT 0,
    `visit_count` INTEGER NULL DEFAULT 0,
    `developer_type` INTEGER NULL,
    `specific_role` INTEGER NULL,
    `type` VARCHAR(255) NULL,
    `bargain` BOOLEAN NULL,

    UNIQUE INDEX `free_project_origin_origin_id_key`(`origin`, `origin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opensource_project_categroy` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opensource_project_field` (
    `id` VARCHAR(191) NOT NULL,
    `cid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opensource_license` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opensource_project` (
    `id` VARCHAR(191) NOT NULL,
    `cid` VARCHAR(191) NOT NULL,
    `fid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `githubUrl` VARCHAR(191) NOT NULL,
    `githubStars` INTEGER NOT NULL,
    `opensourceLicense` INTEGER NOT NULL,
    `websiteUrl` VARCHAR(191) NOT NULL,
    `lastUpdate` TIMESTAMP(6) NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `opensourceLicenseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_sku` ADD CONSTRAINT `product_sku_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_detail` ADD CONSTRAINT `order_detail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_detail` ADD CONSTRAINT `order_detail_productSkuId_fkey` FOREIGN KEY (`productSkuId`) REFERENCES `product_sku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
