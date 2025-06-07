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
import { Tooltip } from '../components/ui/tooltip'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CloseIcon,
  AddIcon,
} from '@chakra-ui/icons'
import clsx from 'clsx'
import { RootState } from '../store'
import {
  addTab,
  closeTab,
  selectTab,
  setUrlInput,
  updateTabUrl,
} from '../store/browser'

export const ShopBrowserPage = () => {
  // Reference to the webview element
  const webviewRef = useRef<Electron.WebviewTag | null>(null)
  const dispatch = useDispatch()

  // Get browser state from Redux store
  const { tabs, selectedTabId, urlInput } = useSelector(
    (state: RootState) => state.browser
  )

  // Handle page selection
  const handleSelectPage = (tabId: string) => {
    dispatch(selectTab({ tabId }))
  }

  // Handle closing a page
  const handleClosePage = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the tab selection
    dispatch(closeTab({ tabId }))
  }

  // Handle adding a new webpage
  const handleAddWebsite = (url?: string) => {
    dispatch(addTab({ url }))
  }

  // Handle URL input submission
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      handleAddWebsite(urlInput.trim())
    }
  }

  // Handle URL input change
  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrlInput(e.target.value))
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
    handleAddWebsite()
  }

  return (
    <div className="flex flex-col w-full h-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Chrome-like tab bar at the top */}
      <div className="flex items-center bg-gray-100 px-2 py-1 border-b border-gray-200">
        <div className="flex-1 flex items-center overflow-x-auto">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={clsx(
                'flex items-center px-3 py-2 mr-1 rounded-t-md border-b-2 transition-all',
                'hover:bg-gray-200 cursor-pointer',
                selectedTabId === tab.id
                  ? 'bg-white border-blue-500 text-blue-700'
                  : 'bg-gray-100 border-transparent text-gray-600'
              )}
              onClick={() => handleSelectPage(tab.id)}
            >
              <div className="max-w-[120px] truncate font-medium text-sm">
                {tab.name}
              </div>
              <IconButton
                variant="ghost"
                size="xs"
                aria-label="Close tab"
                className="ml-2 opacity-50 hover:opacity-100"
                onClick={e => handleClosePage(tab.id, e)}
              >
                <CloseIcon fontSize="10px" />
              </IconButton>
            </div>
          ))}
          <Tooltip content="新标签页" positioning={{ placement: 'bottom-end' }}>
            <IconButton
              aria-label="New tab"
              size="sm"
              variant="ghost"
              className="ml-1"
              onClick={handleAddNewTab}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col bg-white w-full h-full">
        {selectedTabId ? (
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

              {tabs
                .filter(tab => tab.id === selectedTabId)
                .map(tab => (
                  <div key={`url-${tab.id}`} className="flex-grow">
                    <Group attached>
                      <Input
                        value={tab.url}
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

            {tabs
              .filter(tab => tab.id === selectedTabId)
              .map(tab => (
                <webview
                  key={tab.id}
                  ref={webviewRef as any}
                  src={tab.url}
                  className="w-full flex-grow"
                  allowpopups={'true' as any}
                  partition={tab.partition}
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
