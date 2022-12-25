import { useTranslation } from 'next-i18next';
import Image from 'next/legacy/image';
import { Container, Footer } from '@/components/common';
import { DefaultLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/types/app';
import Box from '@mui/material/Box';
import { ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from './index.module.scss';
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import('@/content/Tool/Avatar/index'), {
    ssr: false,
});

type IndexProps = {
};

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
const KILO_BYTES_PER_BYTE = 1000;
const COUNT = 1;
const FORMATS = ['jpg', 'png'];

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const ToolAvatarPage: NextPageWithLayout<IndexProps> = (props) => {

    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});
    const multiple = true;
    const drop = useRef(null);
    const drag = useRef(null);
    const avatarRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [message, setMessage] = useState({ show: false, text: null, type: null });

    const [value, setValue] = useState('1'); // tab index
    const [item, setItem] = useState(null);

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        // useRef 的 drop.current 取代了 ref 的 this.drop
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);
        drop.current.addEventListener('dragenter', handleDragEnter);
        drop.current.addEventListener('dragleave', handleDragLeave);
        return () => {
            drop.current.removeEventListener('dragover', handleDragOver);
            drop.current.removeEventListener('drop', handleDrop);
            drop.current.removeEventListener('dragenter', handleDragEnter);
            drop.current.removeEventListener('dragleave', handleDragLeave);
        }
    });

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
                if (!multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
        }
        return { ...files };
    };

    const convertNestedObjectToArray = (nestedObj) => {
        return Object.keys(nestedObj).map((key) => nestedObj[key]);
    }

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        // updateFilesCb(filesAsArray);
        console.log('filesAsArray: ', filesAsArray);
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({ ...files });
        callUpdateFilesCb({ ...files });
    };

    const downloadFile = (fileName) => {
        console.log('fileName: ', fileName);
        console.log('file: ', files[fileName]);
        let blobUrl = window.URL.createObjectURL(files[fileName]);
        const filename = 'avatar' + '.jpg';
        const aElement = document.createElement('a');
        document.body.appendChild(aElement);
        aElement.style.display = 'none';
        aElement.href = blobUrl;
        aElement.download = filename;
        aElement.click();
        document.body.removeChild(aElement);
    }

    const downloadFile2 = () => {
        avatarRef.current.downloadImg();
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target !== drag.current && setDragging(true)
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target === drag.current && setDragging(false)
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false)
        const count = COUNT;
        const formats = FORMATS;
        const files = [...e.dataTransfer.files];
        if (count && count < files.length) {
            showMessage(`抱歉，每次最多只能上传${count} 文件。`, 'error', 2000);
            return;
        }
        if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
            showMessage(`只允许上传 ${formats.join(', ')}格式的文件`, 'error', 2000);
            return;
        }
        if (files && files.length) {
            showMessage('成功上传！', 'success', 1000);
            console.log(files)
            setFiles(files);
            callUpdateFilesCb(files);
        }
    };

    const showMessage = (text, type, timeout) => {
        setMessage({ show: true, text, type, })
        setTimeout(() =>
            setMessage({ show: false, text: null, type: null, },), timeout);
    };

    const handleAddItem = () => {
        setItem('http://localhost:3000/images/avatars/1.jpg')
    }

    const handleTabPanelAddItem = (e) => {
        console.log('e:', e)
        const imageUrl = e.target['data-loaded-src']
        console.log('imageUrl', imageUrl)
        setItem(imageUrl)
    }

    return (
        <Container>

            <Breadcrumbs aria-label="breadcrumb" className="mt-5">
                <Link underline="hover" color="inherit" href="/">
                    工具
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    图像类
                </Link>
                <Typography color="text.primary">节日头像制作</Typography>
            </Breadcrumbs>

            <Typography className="mt-5" variant="h5" sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                节日头像制作
            </Typography>

            {/* 选择器 */}
            <div className="flex items-center justify-center gap-2 my-10">
                <div ref={drop} className="rounded relative border-2 border-dashed bg-gray-50">
                    <div className="w-80 h-80 flex flex-col gap-1 justify-center items-center" data-v-bb94a89a="">
                        <div className="text-gray-600" data-v-bb94a89a="">粘贴、拖拽图片到这</div>
                        <div className="text-gray-600" data-v-bb94a89a="">或者
                            <a className="text-[#D02C25] no-underline rounded inline-block border border-[#D02C25] px-1 mx-0.5"
                                onClick={handleUploadBtnClick}
                                style={{
                                    position: 'relative',
                                    zIndex: 1,
                                }}>选择图片</a>
                        </div>
                    </div>
                </div>
                {/* 选择器2 */}
                <div className="h-60 w-60 bg-red-200">
                    {message.show && (
                        <div>
                            {message.text}
                            <span
                                role='img'
                                aria-label='emoji'
                            >
                                {message.type === 'error' ? <>&#128546;</> : <>&#128536;</>}
                            </span>
                        </div>
                    )}
                    {dragging && (
                        <div
                            ref={drag}
                        >
                            请放手
                            <span
                                role='img'
                                aria-label='emoji'
                            >
                                &#128541;
                            </span>
                        </div>
                    )}
                    <input
                        className={styles.input}
                        type="file"
                        ref={fileInputField}
                        onChange={handleNewFileUpload}
                        title=""
                        value=""
                    />
                </div>
            </div>

            <Typography className="mt-5" variant="h5" sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                文件预览
            </Typography>

            <div className="flex space-x-5">
                {Object.keys(files).map((fileName, index) => {
                    let file = files[fileName];
                    let isImageFile = file.type.split("/")[0] === "image";
                    return (
                        <div key={fileName} className={styles.previewContent}>
                            {isImageFile && (
                                <>
                                    {/* <Image
                                        src={URL.createObjectURL(file)}
                                        alt={`file preview ${index}`}
                                        width="200"
                                        height="200"
                                    /> */}
                                    <NoSSRComponent cRef={avatarRef}
                                        url={URL.createObjectURL(file)}
                                        item={item} />
                                </>
                            )}
                            <div>
                                <span>{file.name}</span>
                                <span>{convertBytesToKB(file.size)} kb</span>
                            </div>
                            <div>
                                <div
                                    onClick={() => removeFile(fileName)}
                                >删除</div>
                                <div
                                    onClick={() => downloadFile(fileName)}
                                >下载</div>
                                <div
                                    onClick={() => downloadFile2()}
                                >下载</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Item One" value="1" />
                    <Tab label="Item Two" value="2" />
                    <Tab label="Item Three" value="3" />
                </TabList>
                <TabPanel value="1" onClick={handleTabPanelAddItem}>
                    <div className="space-x-2">
                        <Image className="w-10" width="96" height="96" src="http://127.0.0.1:3000/images/avatars/1.jpg" />
                        <Image className="w-10" width="96" height="96" src="http://127.0.0.1:3000/images/avatars/2.jpg" />
                        <Image className="w-10" width="96" height="96" src="http://127.0.0.1:3000/images/avatars/3.jpg" />
                        <Image className="w-10" width="96" height="96" src="http://127.0.0.1:3000/images/avatars/4.jpg" />
                        <Image className="w-10" width="96" height="96" src="http://127.0.0.1:3000/images/avatars/5.jpg" />
                        <Image className="w-10" width="96" height="96" src="http://127.0.0.1:3000/images/avatars/6.jpg" />
                        <Image className="w-10" width="96" height="96" src="http://127.0.0.1:3000/images/avatars/7.jpg" />
                        <Image className="w-10" width="96" height="96" src="http://127.0.0.1:3000/images/avatars/8.jpg" />
                    </div>
                    <button onClick={handleAddItem}>添加元素</button>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>

        </Container>
    );
};

ToolAvatarPage.getLayout = function getLayout(page: JSX.Element) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default ToolAvatarPage;
