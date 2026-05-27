import { db } from './index';

export async function seedDatabase() {
  try {
    // 创建默认的系统配置
    await db.systemConfig.createMany({
      data: [
        {
          key: 'crm_settings',
          value: {
            autoSync: true,
            syncInterval: 3600, // 每小时
            maxContactsPerSync: 100,
            learningMode: true,
            requireApproval: true,
          },
          description: 'CRM系统默认设置',
        },
        {
          key: 'email_templates',
          value: {
            followUp: {
              subject: 'Following up on our conversation',
              body: 'Hi {{name}},\n\nI wanted to follow up on our recent conversation about {{topic}}.\n\nBest regards,\n{{sender}}',
            },
            introduction: {
              subject: 'Introduction - {{name}} & {{sender}}',
              body: 'Hi {{name}},\n\nI\'d like to introduce you to {{sender}} who I think you\'d benefit from knowing.\n\nBest regards,\nYour mutual connection',
            },
          },
          description: '默认邮件模板',
        },
      ],
      skipDuplicates: true,
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Database seeding failed:', error);
    throw error;
  }
}