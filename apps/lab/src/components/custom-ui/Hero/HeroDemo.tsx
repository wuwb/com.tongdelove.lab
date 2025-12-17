import { Button } from "@tongdelove/ui/components/button";
import Image from 'next/image'

export function SplitScreen() {
  return (
    <div>
      <div p={8} align="center" justify="center">
        <div w="full">
          <div>
            <div
              _after={{
                content: "''",
                width: 'full',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              Freelance
            </div>
            <br /> <div c="blue.400">Design Projects</div>{' '}
          </div>
          <div c="gray.500">
            The project board is an exclusive resource for contract work.
            It&apos;s perfect for freelancers, agencies, and moonlighters.
          </div>
          <div>
            <Button bg="blue.400" color="white">
              Create Project
            </Button>
            <Button>How It Works</Button>
          </div>
        </div>
      </div>
      <div>
        <Image
          alt="Login Image"
          src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
      </div>
    </div>
  )
}
