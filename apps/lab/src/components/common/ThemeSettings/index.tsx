import { FC, useContext, useEffect, useRef, MouseEvent, useState } from 'react'
import {
  Box,
  Stack,
  Button,
  Popover,
  Text,
  Divider,
  MenuItem,
  Menu,
  Tooltip,
  ActionIcon,
} from '@mantine/core'

import { TbChecks, TbCubeUnfolded } from 'react-icons/tb'
import { useTranslation } from '@/i18n'
import { Link } from '@tongdelove/ui/Link'

export const ThemeSettings = () => {
  const { t } = useTranslation()

  const ref = useRef<any>(null)
  const [isOpen, setOpen] = useState<boolean>(false)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'PureLightTheme'
    setTheme(curThemeName)
  }, [])

  const [theme, setTheme] = useState('PureLightTheme')

  const changeTheme = (theme): void => {
    setTheme(theme)
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box>
        <Tooltip arrow title={t('Theme Settings')}>
          <ActionIcon
            ref={ref}
            onClick={handleOpen}
            color="primary"
            aria-label="add"
          >
            {t('Customize')}
          </ActionIcon>
        </Tooltip>
        <Popover
          disableScrollLock
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Box p={2}>
            <Text
              sx={{
                mb: 2,
                textAlign: 'center',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
              variant="body1"
            >
              Layout Blueprints
            </Text>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              endIcon={<TbCubeUnfolded />}
              color="primary"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={openMenu}
            >
              Choose layout
            </Button>
            <Menu
              disableScrollLock
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
            >
              <MenuItem
                sx={{ fontWeight: 'bold' }}
                component={Link}
                href="/dashboards/reports"
              >
                Extended Sidebar
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: 'bold' }}
                component={Link}
                href="/blueprints/accent-header/dashboards/reports"
              >
                Accent Header
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: 'bold' }}
                component={Link}
                href="/blueprints/accent-sidebar/dashboards/reports"
              >
                Accent Sidebar
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: 'bold' }}
                component={Link}
                href="/blueprints/boxed-sidebar/dashboards/reports"
              >
                Boxed Sidebar
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: 'bold' }}
                component={Link}
                href="/blueprints/collapsed-sidebar/dashboards/reports"
              >
                Collapsed Sidebar
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: 'bold' }}
                component={Link}
                href="/blueprints/bottom-navigation/dashboards/reports"
              >
                Bottom Navigation
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: 'bold' }}
                component={Link}
                href="/blueprints/top-navigation/dashboards/reports"
              >
                Top Navigation
              </MenuItem>
            </Menu>
          </Box>
          <Divider />
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box>
              <Text
                sx={{
                  mt: 1,
                  mb: 3,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
                variant="body1"
              >
                Light color schemes
              </Text>
              <Stack alignItems="center" spacing={2}>
                {/* TODO: Add Theme */}
                <Tooltip placement="left" title="Test Theme" arrow>
                  <Box
                    className={theme === 'TestTheme' ? 'active' : ''}
                    onClick={() => {
                      changeTheme('TestTheme')
                    }}
                  >
                    {theme === 'TestTheme' && (
                      <div>
                        <TbChecks />
                      </div>
                    )}
                    <Box className="colorSchemeWrapper pureLight">
                      <Box className="primary" />
                      <Box className="secondary" />
                    </Box>
                  </Box>
                </Tooltip>
                {/* // Add Theme */}
                <Tooltip placement="left" title="Pure Light" arrow>
                  <Box
                    className={theme === 'PureLightTheme' ? 'active' : ''}
                    onClick={() => {
                      changeTheme('PureLightTheme')
                    }}
                  >
                    {theme === 'PureLightTheme' && (
                      <Box>
                        <TbChecks />
                      </Box>
                    )}
                    <Box className="colorSchemeWrapper pureLight">
                      <Box className="primary" />
                      <Box className="secondary" />
                    </Box>
                  </Box>
                </Tooltip>
                <Tooltip placement="left" title="Grey Goose" arrow>
                  <Box
                    className={theme === 'GreyGooseTheme' ? 'active' : ''}
                    onClick={() => {
                      changeTheme('GreyGooseTheme')
                    }}
                  >
                    {theme === 'GreyGooseTheme' && (
                      <Box>
                        <TbChecks />
                      </Box>
                    )}
                    <Box className="colorSchemeWrapper greyGoose">
                      <Box className="primary" />
                      <Box className="secondary" />
                    </Box>
                  </Box>
                </Tooltip>
                <Tooltip placement="left" title="Purple Flow" arrow>
                  <Box
                    className={theme === 'PurpleFlowTheme' ? 'active' : ''}
                    onClick={() => {
                      changeTheme('PurpleFlowTheme')
                    }}
                  >
                    {theme === 'PurpleFlowTheme' && (
                      <Box>
                        <TbChecks />
                      </Box>
                    )}
                    <Box className="colorSchemeWrapper purpleFlow">
                      <Box className="primary" />
                      <Box className="secondary" />
                    </Box>
                  </Box>
                </Tooltip>
              </Stack>
            </Box>
            <Box>
              <Text
                sx={{
                  mt: 1,
                  mb: 3,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
                variant="body1"
              >
                Dark color schemes
              </Text>
              <Stack alignItems="center" spacing={2}>
                <Tooltip placement="left" title="Nebula Fighter" arrow>
                  <Box
                    className={theme === 'NebulaFighterTheme' ? 'active' : ''}
                    onClick={() => {
                      changeTheme('NebulaFighterTheme')
                    }}
                  >
                    {theme === 'NebulaFighterTheme' && (
                      <Box>
                        <TbChecks />
                      </Box>
                    )}
                    <Box className="colorSchemeWrapper nebulaFighter">
                      <Box className="primary" />
                      <Box className="secondary" />
                    </Box>
                  </Box>
                </Tooltip>
                <Tooltip placement="left" title="Green Fields" arrow>
                  <Box
                    className={theme === 'GreenFieldsTheme' ? 'active' : ''}
                    onClick={() => {
                      changeTheme('GreenFieldsTheme')
                    }}
                  >
                    {theme === 'GreenFieldsTheme' && (
                      <Box>
                        <TbChecks />
                      </Box>
                    )}
                    <Box className="colorSchemeWrapper greenFields">
                      <Box className="primary" />
                      <Box className="secondary" />
                    </Box>
                  </Box>
                </Tooltip>
                <Tooltip placement="left" title="Dark Spaces" arrow>
                  <Box
                    className={theme === 'DarkSpacesTheme' ? 'active' : ''}
                    onClick={() => {
                      changeTheme('DarkSpacesTheme')
                    }}
                  >
                    {theme === 'DarkSpacesTheme' && (
                      <Box>
                        <TbChecks />
                      </Box>
                    )}
                    <Box className="colorSchemeWrapper darkSpaces">
                      <Box className="primary" />
                      <Box className="secondary" />
                    </Box>
                  </Box>
                </Tooltip>
              </Stack>
            </Box>
          </Stack>
        </Popover>
      </Box>
    </>
  )
}
