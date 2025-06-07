import { NavLink, Outlet } from 'react-router-dom'
import { Avatar, Stack, Box, Separator } from '@chakra-ui/react'
import { Tooltip } from '../components/ui/tooltip'
import { IconButton } from '@chakra-ui/react'
import {
  RiAncientGateLine,
  RiShoppingBag4Line,
  RiSeedlingLine,
} from 'react-icons/ri'

export const Layout = () => {
  return (
    <div className="flex h-screen">
      <Box
        p={2.5}
        className="flex flex-col items-center w-[50px] h-100vh border border-white p-2.5 gap-2.5 border-r border-solid"
      >
        <Avatar.Root size="xs">
          <Avatar.Fallback name="Admin" />
          <Avatar.Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
        </Avatar.Root>
        <Stack className="flex flex-col overflow-hidden">
          <Tooltip content="总" positioning={{ placement: 'right-end' }}>
            <IconButton
              aria-label="shop"
              rounded="full"
              size="xs"
              variant="ghost"
            >
              <NavLink to="/">
                <RiAncientGateLine />
              </NavLink>
            </IconButton>
          </Tooltip>
          {/* 字 */}
          {/* 段 */}
          {/* 文 */}
          {/* 图 */}
          {/* 三维 */}
          {/* 动图 */}
          {/* 视频 */}
          {/* 私域 */}
          {/* 自建 */}
          {/* 电商 */}
          <Tooltip content="电商" positioning={{ placement: 'right-end' }}>
            <IconButton
              aria-label="shop"
              rounded="full"
              size="xs"
              variant="ghost"
            >
              <NavLink to="/shop">
                <RiShoppingBag4Line />
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip content="关于" positioning={{ placement: 'right-end' }}>
            <IconButton
              aria-label="about"
              rounded="full"
              size="xs"
              variant="ghost"
            >
              <NavLink to="/about">
                <RiSeedlingLine />
              </NavLink>
            </IconButton>
          </Tooltip>

          <Tooltip content="测试" positioning={{ placement: 'right-end' }}>
            <IconButton
              aria-label="test"
              rounded="full"
              size="xs"
              variant="ghost"
            >
              <NavLink to="/test">
                <RiSeedlingLine />
              </NavLink>
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <Separator orientation="vertical" height="100%" />
      <section className="flex grow">
        <Outlet />
      </section>
    </div>
  )
}
