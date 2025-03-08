import {
  Button,
  Input,
  Group,
  Portal,
  InputAddon,
  IconButton,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons'
import clsx from 'clsx'

export const ShopBrowserPage = () => {
  // Define a type for opened webpages
  type OpenedPage = {
    id: string
    name: string
    url: string
    partition: string
  }

  // Reference to the webview element
  const webviewRef = useRef<Electron.WebviewTag | null>(null)

  // State to track opened webpages and the currently selected one
  const [openedPages, setOpenedPages] = useState<OpenedPage[]>([])
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState('')

  // Handle page selection
  const handleSelectPage = (pageId: string) => {
    setSelectedPageId(pageId)
  }

  // Handle closing a page
  const handleClosePage = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the tab selection
    const updatedPages = openedPages.filter(page => page.id !== pageId)
    setOpenedPages(updatedPages)

    // If we're closing the currently selected page
    if (selectedPageId === pageId) {
      // Select the first remaining page, or null if none left
      setSelectedPageId(updatedPages.length > 0 ? updatedPages[0].id : null)
    }
  }

  // Handle adding a new webpage with unique partition
  const handleAddWebsite = (url: string = 'https://www.baidu.com') => {
    // Format URL if it doesn't have http/https prefix
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`

    const pageId = uuidv4()
    const newPage = {
      id: pageId,
      name:
        url === 'https://www.baidu.com'
          ? `百度 ${openedPages.length + 1}`
          : new URL(formattedUrl).hostname,
      url: formattedUrl,
      partition: `persist:webview-${pageId}`,
    }

    setOpenedPages([...openedPages, newPage])
    setSelectedPageId(pageId)
    setUrlInput('')
  }

  // Handle URL input submission
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      handleAddWebsite(urlInput.trim())
    }
  }

  // Handle webview navigation
  const handleGoBack = () => {
    if (webviewRef.current && webviewRef.current.canGoBack()) {
      webviewRef.current.goBack()
    }
  }

  const handleGoForward = () => {
    if (webviewRef.current && webviewRef.current.canGoForward()) {
      webviewRef.current.goForward()
    }
  }

  const handleAddNewTab = () => {
    setSelectedPageId(null)
  }

  // Select the first page when pages are available but none is selected
  useEffect(() => {
    if (openedPages.length > 0 && selectedPageId === null) {
      setSelectedPageId(openedPages[0].id)
    }
  }, [openedPages, selectedPageId])

  return (
    <div className="flex w-full h-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="w-1/4 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {openedPages.map(page => (
            <div
              key={page.id}
              className={clsx(
                `px-4 py-3 text-left rounded-md transition-all flex justify-between items-center`,
                'hover:bg-gray-100 hover:cursor-pointer group shadow-sm',
                `${selectedPageId === page.id ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500 pl-3' : 'hover:bg-gray-100 border-l-4 border-transparent'}`
              )}
            >
              <div
                onClick={() => handleSelectPage(page.id)}
                className="flex-grow truncate font-medium"
              >
                {page.name}
              </div>
              <MenuRoot positioning={{ placement: 'right-start' }}>
                <MenuTrigger asChild>
                  <IconButton
                    variant="ghost"
                    size="xs"
                    aria-label="Tab options"
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                  >
                    <ChevronDownIcon />
                  </IconButton>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem
                    onClick={e => handleClosePage(page.id, e)}
                    className="text-red-500"
                    value="close"
                  >
                    <CloseIcon className="mr-2" />
                    关闭
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            </div>
          ))}
          <Button
            key="add"
            onClick={() => handleAddWebsite()}
            width="full"
          >
            打开百度
          </Button>
          <Button
            key="add-tab"
            onClick={() => handleAddNewTab()}
            width="full"
          >
            打开新页面
          </Button>
        </div>
      </div>

      <div className="flex flex-col bg-white w-full">
        {selectedPageId ? (
          <div className="w-full h-full flex flex-col">
            <div className="flex items-center p-3 border-b border-gray-200 bg-gray-50">
              <div className="flex space-x-2 mr-3">
                <IconButton
                  aria-label="Go back"
                  onClick={handleGoBack}
                  size="sm"
                  colorScheme="gray"
                  variant="outline"
                  borderRadius="md"
                >
                  <ArrowBackIcon />
                </IconButton>
                <IconButton
                  aria-label="Go forward"
                  onClick={handleGoForward}
                  size="sm"
                  colorScheme="gray"
                  variant="outline"
                  borderRadius="md"
                >
                  <ArrowForwardIcon />
                </IconButton>
              </div>

              {openedPages
                .filter(page => page.id === selectedPageId)
                .map(page => (
                  <div key={`url-${page.id}`} className="flex-grow">
                    <Group attached>
                      <Input
                        value={page.url}
                        readOnly
                        bg="white"
                        borderRadius="md"
                        fontSize="sm"
                        boxShadow="sm"
                      />
                    </Group>
                  </div>
                ))}
            </div>

            {openedPages
              .filter(page => page.id === selectedPageId)
              .map(page => (
                <webview
                  key={page.id}
                  ref={webviewRef as any}
                  src={page.url}
                  className="w-full flex-grow"
                  allowpopups={'true' as any}
                  partition={page.partition}
                  nodeintegration={'true' as any}
                  plugins={'true' as any}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'inline-flex',
                  }}
                />
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8 bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
                打开新网页
              </h3>
              <form onSubmit={handleUrlSubmit} className="w-full mb-4">
                <Group attached className="mb-4">
                  <Input
                    placeholder="输入网址 (例如: google.com)"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    size="md"
                    bg="white"
                    borderRadius="md"
                    boxShadow="sm"
                    _focus={{ boxShadow: 'md', borderColor: 'blue.300' }}
                  />
                  <InputAddon width="4.5rem" bg="blue.500">
                    <Button
                      h="2rem"
                      size="sm"
                      colorScheme="blue"
                      type="submit"
                      variant="solid"
                      width="full"
                    >
                      GO
                    </Button>
                  </InputAddon>
                </Group>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
