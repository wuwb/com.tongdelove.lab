import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository } from 'typeorm'
import { Organization } from './organization.entity'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Octokit } from 'octokit'

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name)

  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {}

  public async create(createGithubOrganizationData: CreateOrganizationDto) {
    const githubOrganization = new Organization()

    githubOrganization.login = createGithubOrganizationData.login
    githubOrganization.id = createGithubOrganizationData.id
    githubOrganization.node_id = createGithubOrganizationData.node_id
    githubOrganization.url = createGithubOrganizationData.url
    githubOrganization.repos_url = createGithubOrganizationData.repos_url
    githubOrganization.events_url = createGithubOrganizationData.events_url
    githubOrganization.hooks_url = createGithubOrganizationData.hooks_url
    githubOrganization.issues_url = createGithubOrganizationData.issues_url
    githubOrganization.members_url = createGithubOrganizationData.members_url
    githubOrganization.public_members_url =
      createGithubOrganizationData.public_members_url
    githubOrganization.avatar_url = createGithubOrganizationData.avatar_url
    githubOrganization.description = createGithubOrganizationData.description
    githubOrganization.name = createGithubOrganizationData.name
    // githubOrganization.company = createGithubOrganizationData.company;
    githubOrganization.blog = createGithubOrganizationData.blog
    githubOrganization.location = createGithubOrganizationData.location
    // githubOrganization.email = createGithubOrganizationData.email;
    // githubOrganization.twitter_username = createGithubOrganizationData.twitter_username;
    githubOrganization.is_verified = createGithubOrganizationData.is_verified
    githubOrganization.has_organization_projects =
      createGithubOrganizationData.has_organization_projects
    githubOrganization.has_repository_projects =
      createGithubOrganizationData.has_repository_projects
    githubOrganization.public_repos = createGithubOrganizationData.public_repos
    githubOrganization.public_gists = createGithubOrganizationData.public_gists
    githubOrganization.followers = createGithubOrganizationData.followers
    githubOrganization.following = createGithubOrganizationData.following
    githubOrganization.html_url = createGithubOrganizationData.html_url
    githubOrganization.createdAt = createGithubOrganizationData.created_at
    githubOrganization.updatedAt = createGithubOrganizationData.updated_at
    githubOrganization.type = createGithubOrganizationData.type

    return this.organizationRepository.save(githubOrganization)
  }

  // @Cron('45 * * * * *')
  async handleGetGithubOrganization() {
    this.logger.debug('Called when the current second is 45')
    // const octokit = new Octokit({
    //     auth: `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`
    // });
    // const data = await octokit.request(`GET /orgs/tencent`);
    // console.log('data: ', data);
    // this.create(data.data);
  }
}
