import { type ReactNode } from 'react'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>
}

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <div className="inline-flex">
      <div>{label}</div>
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <div>
      <div className="py-10">
        <div className="gap-8">
          <div>
            <ListHeader>Company</ListHeader>
            <div>About Us</div>
            <div>Blog</div>
            <div>Careers</div>
            <div>Contact Us</div>
          </div>

          <div>
            <ListHeader>Support</ListHeader>
            <div>Help Center</div>
            <div>Safety Center</div>
            <div>Community Guidelines</div>
          </div>

          <div>
            <ListHeader>Legal</ListHeader>
            <div>Cookies Policy</div>
            <div>Privacy Policy</div>
            <div>Terms of Service</div>
            <div>Law Enforcement</div>
          </div>

          <div>
            <ListHeader>关注我</ListHeader>
            {/* <AppStoreBadge /> */}
            {/* <PlayStoreBadge /> */}
          </div>
        </div>
      </div>

      <div>
        <div className="py-4">
          <div>© 2022 Tongde Tech. All rights reserved</div>
          <div>
            <SocialButton label="Twitter" href="#">
              {/* <IconBrandTwitterFilled /> */}Twitter
            </SocialButton>
            <SocialButton label="YouTube" href="#">
              {/* <IconBrandYoutubeFilled /> */}YouTube
            </SocialButton>
            <SocialButton label="Instagram" href="#">
              {/* <IconBrandInstagram /> */}Instagram
            </SocialButton>
          </div>
        </div>
      </div>
    </div>
  )
}
