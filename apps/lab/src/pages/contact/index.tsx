import {
  Stack,
  Title,
  Box,
  Flex,
  Button,
  Text,
  Container,
  Input,
  Textarea,
} from '@mantine/core';
import {
  IconHome, IconMail, IconCurrentLocation, IconBrandFacebookFilled,
  IconMailOpened, IconBrandGithubFilled, IconBrandDiscordFilled, IconUser
} from '@tabler/icons-react';

export default function Contact() {
  return (
    <Container bg="#9DC4FB" mt={0}>
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <div>
              <div>
                <Box>
                  <Title>联系</Title>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <div>
                      <Button
                        size="md"
                        w="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        leftSection={<IconHome color="#1970F1" size="20px" />}>
                        +91-988888888
                      </Button>
                      <Button
                        size="md"
                        w="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        leftSection={<IconMail color="#1970F1" size="20px" />}>
                        hello@abc.com
                      </Button>
                      <Button
                        size="md"
                        w="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        leftSection={<IconCurrentLocation color="#1970F1" size="20px" />}>
                        Karnavati, India
                      </Button>
                    </div>
                  </Box>
                  <Stack
                    mt={{ lg: 10, md: 10 }}
                    px={5}>
                    <div
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<IconBrandFacebookFilled size="28px" />}
                    />
                    <div
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<IconBrandGithubFilled size="28px" />}
                    />
                    <div
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<IconBrandDiscordFilled size="28px" />}
                    />
                  </Stack>
                </Box>
              </div>
              <div>
                <Box bg="white">
                  <Box m={8} color="#0B0E3F">
                    <div>
                      <div id="name">
                        <div>Your Name</div>
                        <div borderColor="#E0E1E7">
                          <div pointerEvents="none">
                            <IconUser color="gray.800" />
                          </div>
                          <Input type="text" size="md" />
                        </div>
                      </div>
                      <div id="name">
                        <div>Mail</div>
                        <div borderColor="#E0E1E7">
                          <div pointerEvents="none">
                            <IconMailOpened color="gray.800" />
                          </div>
                          <Input type="text" size="md" />
                        </div>
                      </div>
                      <div id="name">
                        <div>Message</div>
                        <Textarea
                          placeholder="message"
                        />
                      </div>
                      <div id="name" float="right">
                        <Button variant="solid" bg="#0D74FF" color="white">
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </Box>
                </Box>
              </div>

            </div>
            <div>
              商务

              电子邮件：bin2302@gmail.com

              客服服务
              QQ：541330190

              服务时间：

              工作时间：周一 ~ 周五   08：00 - 17：00

              公司地址：深圳市南山区桃源街道长源社区学苑大道1001号南山智园C2栋1713
            </div>
            <div>地图</div>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}

